# Course Schedulizer Client

The Course Schedulizer is a single-page application that allows users to view and interact with course schedules. The client is built with a focus on user experience and accessibility. See the [Calvin Knights root](../README.md) for general information on this project.

[![node js](https://img.shields.io/badge/node_js-000?logo=node.js)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-000?logo=pnpm)](https://pnpm.io/)
[![react js](https://img.shields.io/badge/react_js-000?logo=react)](https://react.dev/)
[![create react app](https://img.shields.io/badge/create_react_app-000?logo=createreactapp)](https://create-react-app.dev/)
[![typescript](https://img.shields.io/badge/typescript-000?logo=typescript)](https://www.typescriptlang.org/)
[![github](https://img.shields.io/badge/github-121013?logo=github&logoColor=white)](https://github.com/)
[![github pages](https://img.shields.io/badge/github_pages-121013?logo=github&logoColor=white)](https://pages.github.com/)
[![netlify](https://img.shields.io/badge/netlify-000?logo=netlify)](https://www.netlify.com/)
[![vscode](https://img.shields.io/badge/vscode-000?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE+SURBVHgBjVJNToNAFP5moInpiiPIDdqauDY9gh6g1BO4s9EFYceqqRcQepEat02UjXvaE8hGtBHmOdMiZQAjb8FLePP9vB+GLuG+Adn3BJS5YKaHHM/whxvWEeiA8kAvsIDv801k/QluBaogh+PuxUU/j2UOGiT30aQdeAgOkW9lthQT+lmE2+i0Agxr7xPN+P47WzvgvFCgDQhLMOYeHVIMRlcgPpeIi9+/x4FpBFpEEMYlTnpb7L5WVTAvn/jnIUgsNRhJF6kxVmtpIS1sN9dBZQ3SsjDH7cpN4DsE8woCxWGDZyt8pIO6Mj9cTgFUgxHGCP6ZByGuKwZt9PirVB3oYMpsObdY9hvi0xyV/akZCDGtiVnNntVxLIYJ2mK2nsotPLZUqNtt79I6QSIn8vQ/WCeYS8EHpOZCOf0BmnSexRUGtfwAAAAASUVORK5CYII=)](https://code.visualstudio.com/)

## Workflows

**To run the Schedulizer locally:**

1. `git checkout` the branch you want to work on (e.g., your dedicated feature branch).
1. `cd client-course-schedulizer` to move into the monorepo&rsquo;s client application sub-directory.
1. `pnpm install` to install the required NodeJS packages as specified in `package.json`.
1. `pnpm start` to run the website on [localhost:3000](http://localhost:3000).

Edits you make to the code will automatically update the website in your browser.

**To deploy the Schedulizer to the development server:**

1. Create a pull request to merge your fully-implemented-and-tested feature branch into the `develop` branch.

When the PR is approved, the development server, configured on Netlify, will auto-deploy the new version of the `develop` branch. See the:

- Development server dashboard at [https://app.netlify.com/sites/sharp-babbage-a45ee2](https://app.netlify.com/sites/sharp-babbage-a45ee2)
- Running application at: [https://sharp-babbage-a45ee2.netlify.app](https://sharp-babbage-a45ee2.netlify.app)

**To deploy a new production version of the Schedulizer to the production server:**

Follow the same workflow as for the development server, but merge your feature branch into the `production` branch. The production server, configured on GitHub Pages, will auto-deploy the new version of the `production` branch. See the:

- Running application at [https://senior-knights.github.io/course-schedulizer](https://senior-knights.github.io/course-schedulizer).

MUST DOCUMENT THE CI AND DEPLOY STUFF.

NOT SURE WHERE TO PUT THIS YET.

- .github/workflows: the github auto-test and auto-deploy scripts
  - ci.yml: automatically test the latest update
    - Trigger: push to all branches, PR to `develop` and `production`
    - Work environment: ./client-course-schedulizer
    - Steps:
      - Set up actions for pnpm and node
      - Update pnpm version
      - Install pnpm dependencies
      - Run pnpm test on the latest push or PR
  - deploy.yml: auto-deploy
    - This script is not updated to use pnpm yet, must be updated before pushing to `production` or error will occur

### Available Scripts

In the project directory, you can run:

NEEDS TO BE FIXED...

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!** Would not recommend using this. Use [craco](https://github.com/gsoft-inc/craco) instead of ejecting.

### `npm run deploy`

Used by GitHub actions to deploy the build. Will trigger `predeploy` command.

[Husky](https://typicode.github.io/husky/#/) is used with [Lint Staged](https://github.com/okonet/lint-staged) to format all code to the ESLint rules when they are committed. This insures that changes pushed are not confused by changing syntax or code style.

## Directories

- `csv/` contains sample course schedules in `.csv` and `.xlsx` formats. The files include new and old formats, which are not compatible.

- `public/` contains files to import when deploying the application.

- `src/` contains all source files that build the client application.

  - `src/assets` contains images utilized by the application
  - `src/components` contains the basic components used in the UI. Note that `pages/HarmonyPage` has been removed from the UI.
  - `src/data` contains constraints on times within which classes may start. These constraints are run in R. Ask Prof. Pruim for more information about how this is done.
  - `src/styles` establishes colors and fonts used in the application.
  - `src/types` establishes objects used in the application (it's best not to alter this).
  - `src/utilities` provides various functions and objects to help the application function (to be discussed in further detail later).
  - Other files handle server operations.

- `utilities/` contains various utilities.

  - `utilities/contexts` establishes the global state of the app.
  - `utilities/helpers` provides various helpful functions for development use.
  - `utilities/hooks` provides hooks for interacting with the schedule.
  - `utilities/interfaces` defines the app interfaces and data interfaces.
  - `utilities/reducers` provides functions to perform multiple setState updates at once that depend on each other.
  - `utilities/services` provides services, e.g., for detecting conflict, calculating faculty load, etc.

- `.eslintrc.js` is a specific ESLint config. `.env` allows for overriding the Create React App ESLint config.

- `.tsconfig` has been modified to allow for barreling and absolute imports.

## Development Philosophy

React&rsquo;s functional programming is great for dealing with complex, stateful user interfaces. With React, all data is either primitives or an object (which includes functions) since the library focuses on immutability. Each React component defines how every view will behave for a given state. Generally, each view is rendered whenever the data is updated.

### Barrelling

Every folder contains `index.ts` that exports all from every file in the folder which allows for barrelling and absolute imports.

### Structure

`assets/` contains every image or other "artful" content used in the client app.

`components/` contains all React components in the project. Every component resides within a folder, that is its exported name written in `PascalCase`. When a folder is used for additional storage, such as `pages/` (for the apps views) and `reuseables/` (for components used in many other components), they are written in `camelCase`. Each component folder contains `index.ts`, `ComponentName.tsx`, `ComponentName.test.tsx`, and `ComponentName.scss`. Sometimes they will contain a `componentNameService.ts` or additional folders for children components.

`styles/` contains global styles. Uses Sass in SCSS form.

`types/` contains module type declares for NPM packages that do not ship with types.

`utilities/` contains helper functions, logic, interfaces, constants, services, and all other code-related things that are not React Components.

`index.tsx` is the entry point into the React application.

### Packages

We typically use packages rather than rolling our own features. This saves times and catches more edge cases, typically.
