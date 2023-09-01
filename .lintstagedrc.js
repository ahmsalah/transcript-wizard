module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx)': (filenames) => [
    `yarn eslint ${filenames.join(' ')}`,

    `yarn prettier --write ${filenames.join(' ')}`,
  ],
  // Prettify only Markdown and JSON files
  '**/*.(md|json|js|jsx)': (filenames) => `yarn prettier --write ${filenames.join(' ')}`,
}
