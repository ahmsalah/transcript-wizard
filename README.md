# Transcript Wizard

[![Coverage Status](https://img.shields.io/badge/Code%20Coverage-Report-blue)](https://coveralls.io/github/ahmsalah/transcript-wizard?branch=main)

## Live Demo

Try out the app through [this link](https://transcript-wizard.vercel.app/).

## Description

Transcript Wizard is a platform that identifies uncertain words in audio transcriptions, highlights them, and provides an intuitive user interface for correction.

## Features

- An effortless navigation experience facilitated by a wizard, guiding you through all the words that need corrections with the ability to play the audio for the highlighted word.
- The wizard is draggable, allowing you to move it around the interface according to your convenience.
- Seamless audio navigation between transcript utterances.
- The app is mobile-friendly and fully responsive, adapting seamlessly to various viewport widths.
- Unit Tests and Code Coverage: Comprehensive unit tests for utilities ensure code quality. You can review the code coverage reporting by visiting [this link](https://coveralls.io/github/ahmsalah/transcript-wizard?branch=main).
- Dark Mode: Theming, featuring a toggle between light and dark modes for a personalized and viewing experience and eye comfort.
- Accessibility: The entire app is designed for accessibility and keyboard usability, with a special focus on enhancing the usability of forms.
- Micro Animations that add subtle visual cues, enhancing user interactions and providing a polished user experience.
- The majority of the app's logic is developed in isolation, entirely separated from the UI, encapsulated within pure functions that offer ease of testing, maintenance and modularity.
- Unit Tests and Code Coverage: Thorough unit testing is applied to the aforementioned functions. You can explore the code coverage reporting by following this link.

## Technologies Used

- TypeScript
- Next.js 13 with App router
- MUI
- Emotion for styling
- Jest for testing

## Structure

<img width="2080" alt="Transcript Wizard Structure" src="https://github.com/ahmsalah/transcript-wizard/assets/50025978/767325bc-6f45-4c31-9bc9-fb327c5b837b">

## Installation

Make sure you have Node.js and Yarn installed, then run the following commands:

```bash
# Clone the repository
git clone https://github.com/yourusername/transcript-wizard.git

# Navigate into the project directory
cd transcript-wizard

# Install dependencies
yarn install
```

## Running Locally

```bash
# Start the development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

Run unit tests with Jest:

```bash
# Run tests in watch mode
yarn test

# Generate test coverage report
yarn test:coverage
```

## Available Scripts

- `yarn dev` - Starts development server at [http://localhost:3000](http://localhost:3000).
- `yarn build` - Builds application for production.
- `yarn test` - Runs Jest in watch mode.
- `yarn test:ci` - Runs tests in CI mode.
- `yarn test:coverage` - Generates code coverage report.
- `yarn coveralls` - Sends coverage report to Coveralls. Requires `COVERALLS_REPO_TOKEN`.
- `yarn start` - Starts production server. Requires prior `yarn build`.
- `yarn lint` - Executes ESLint.
- `yarn tsc` - Performs TypeScript type checking.
- `yarn format` - Formats code with Prettier.
- `yarn prepare` - Installs Husky Git hooks to set up pre-commit and pre-push hooks.
- `yarn analyze` - Analyzes bundle sizes.
