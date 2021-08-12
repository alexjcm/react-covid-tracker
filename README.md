# COVID-19 Global Cases Tracker

[![Deploy](https://github.com/alexjcm/react-covid-tracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/alexjcm/react-covid-tracker/actions) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## Features

- Interactive map
- Cases by country
- Vaccines rolled out by country
- Worldwide new cases

## Installation

`npm install`

## Starting server

In the project directory, you can run the app in the development mode:

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## More Scripts avaliables

`npm test`

Launches the test runner in the interactive watch mode.

`rpm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Installation with Docker

`npm run docker-build`

`npm run docker-run`

Or

`docker build --rm -t covid-tracker .`

`docker run --rm -p 3000:3000 --name covid-tracker-app covid-tracker`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

Pull requests are welcome.

## License

[MIT licensed](./LICENSE).
