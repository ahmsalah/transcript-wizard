# Transcript Wizard

[![Coverage Status](https://img.shields.io/badge/Code%20Coverage-Report-blue)](https://coveralls.io/github/ahmsalah/transcript-wizard?branch=main)

## Live Demo

Try out the app through [this link](https://transcript-wizard.vercel.app/).

## Description

Transcript Wizard is a platform that identifies uncertain words in audio transcriptions, highlights them, and provides an intuitive user interface for correction.

## Technologies Used

- TypeScript
- Next.js 13 with App router
- Emotion for styling
- MUI
- Jest for testing

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
