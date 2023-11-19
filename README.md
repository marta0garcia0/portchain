# Portchain challenge

The app is written in react + typescript and is launched with vite. For the tests we are using testing-library and jest.
The app is composed by one single layout that is responsive.
You can find 3 modules that the user can expand and contract by clicking the module to see the information contained in each module.
The expansion can be preset with a boolean value when setting the Card component. To facilitate the visualization only the 'Top 5 less port calls' and the 'Port call durations percentiles' are expanded in the loading.

## Installation

Installation

```bash
npm install
```

## Usage

To run the app in development mode url: http://localhost:5173/

```bash
npm run dev
```

To execute tests

```bash
npm run test
```

## Possible improvements

Cache the home data to avoid requesting every single port every time the user reach the home page and avoiding recalculating the statistical data.

Loading component to display while the data is being retrievedW

Use react router to create the port detail page so the user can click in the port and get into the information about that port

add more cases in the calculatePercentile test
