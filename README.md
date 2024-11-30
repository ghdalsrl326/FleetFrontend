# FE interview take-home challenge 1

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Prerequisites

- Node.js >=16.0.0 <19.0.0

### Installation

1. Clone the repository
2. `npm install`
3. `npm start`

## Implementation

### Features

1. Location Management

   - Display a list of locations with pagination
   - Search locations by name or robot ID
   - Star/unstar locations
   - Filter locations by starred status

2. Mock API Integration

   - Uses MSW (Mock Service Worker) for API mocking
   - Simulated endpoints for:
     - Fetching locations with filtering and pagination
     - Managing starred location IDs
     - Error handling simulation

3. Technical Implementation

   - Custom hooks:
     - useLocations: Manages location data fetching and star functionality
     - useDebounce: Optimizes search input performance
   - Material-UI (MUI) for UI components and theming
