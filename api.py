from fastapi import FastAPI
from pydantic import BaseModel, Field
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GSDP Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Load everything from one file
saved = joblib.load("gsdp_optimized.pkl")

model = saved['model']
scaler = saved['scaler']
poly = saved['poly']
feature_cols = saved['feature_cols']
state_base = saved['state_base']


# ✅ Input schema
class GrowthInput(BaseModel):
    state: str = Field(..., example="Gujarat")
    year: int = Field(..., example=2030)

    pop_growth_rate: float = Field(0.015, example=0.012)

    solar_growth: float = Field(1000, example=1500)
    wind_growth: float = Field(500, example=800)
    biomass_growth: float = Field(0, example=50)
    hydro_growth: float = Field(0, example=30)
    waste_growth: float = Field(0, example=10)


# ✅ Health check
@app.get("/")
def home():
    return {"message": "GSDP API running 🚀"}


# ✅ Prediction endpoint
@app.post("/predict-from-base")
def predict_from_base(data: GrowthInput):

    # 🔹 Get base row for state
    base_row = state_base[state_base['State'] == data.state]

    if base_row.empty:
        return {"error": f"State '{data.state}' not found"}

    base_row = base_row.copy()
    base_year = int(base_row['Year'].values[0])
    years_ahead = data.year - base_year

    if years_ahead < 0:
        return {"error": f"Year must be >= {base_year}"}

    # 🔹 Create future rowf
    future_row = base_row.copy()

    future_row['Year'] = data.year

    future_row['Population'] = base_row['Population'].values[0] * (
        (1 + data.pop_growth_rate) ** years_ahead
    )

    future_row['Installed - Solar Power'] = base_row['Installed - Solar Power'].values[0] + (
        data.solar_growth * years_ahead
    )

    future_row['Installed - Wind Power'] = base_row['Installed - Wind Power'].values[0] + (
        data.wind_growth * years_ahead
    )

    future_row['Installed - Bio-Mass Power'] = base_row['Installed - Bio-Mass Power'].values[0] + (
        data.biomass_growth * years_ahead
    )

    future_row['Installed - Small Hydro Power'] = base_row['Installed - Small Hydro Power'].values[0] + (
        data.hydro_growth * years_ahead
    )

    future_row['Installed - Waste to Energy'] = base_row['Installed - Waste to Energy'].values[0] + (
        data.waste_growth * years_ahead
    )

    # 🔹 Encode categorical
    df = pd.get_dummies(future_row, columns=['State', 'Zone'])
    df = df.reindex(columns=feature_cols, fill_value=0)

    # 🔹 Transform
    scaled = scaler.transform(df)
    poly_features = poly.transform(scaled)

    prediction = model.predict(poly_features)[0]

    return {
        "state": data.state,
        "base_year": base_year,
        "target_year": data.year,
        "years_ahead": years_ahead,
        "predicted_gsdp": float(prediction),
        "unit": "crore INR"
    }