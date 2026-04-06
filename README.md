# SustainaGrowth India

A data-driven analysis of India's renewable energy installations and their impact on economic growth using machine learning.

## Project Overview

This dashboard provides an interactive ML-powered analysis of India's renewable energy landscape and economic growth from 2006-2024. It features:

- **Pulse Dashboard**: Real-time visualization of renewable energy capacity and GSDP trends
- **Matrix**: Predictive engine using Polynomial Regression for GSDP forecasting
- **Atlas**: K-Means clustering analysis of states by renewable adoption
- **Results**: Research-backed insights and conclusions

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Recharts
- Framer Motion
- Random Forest & Polynomial Regression ML models

## Getting Started

### Prerequisites

- Node.js & npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd sustainagrowth-insights-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Data Sources

State-wise annual data covering:
- Solar, Wind, Hydro, Bio-Mass, Waste-to-Energy capacity
- Population
- GSDP (Gross State Domestic Product)

Data period: 2006-2024

## Model Architecture

- **Polynomial Regression**: Degree 2 polynomial features with R² = 0.87
- **Random Forest Regressor**: Identifies Total RE Capacity, Solar Power, and Population as top GSDP predictors

## License

This project is for research and educational purposes.
