# Todo FullStack App

## About The Project

A todo app that helps you get things done. It has edit, delete and complete functionality.

## Motivation

The goal was to practice creating a fullstack app using PostgreSQL, Express, React and Node.js

## Getting Started

Below is how to set up the app.

1. Clone the repo

```
$ git@github.com:cynthiacodes/todo-react-app.git
```

2. Install project dependencies

```
$ yarn
```

### View the web app locally

In your terminal run :

```
yarn start
```

## Roadmap

- [x] Add input for todo and post to server
- [x] Fetch todos from database and render the list of todos
- [x] Complete a task and update the database
- [x] Edit a todo task and update the database
- [x] Add styling using Chakra UI
- [ ] Ensure that it is not possible to submit a blank todo task

## Backend server

[Git repo: express server using PostgreSQL database](https://github.com/cynthiacodes/todo-app-server)

## Template provided by Academy Tech:<br/>

This project was created using [Create React App](https://create-react-app.dev/)

Extra features added:

- Add CI with GitHub Actions
- Add custom eslint config
- Prettier
- TypeScript
- Removed unneccessary logo images
- Removed unnecessary web-vitals
- Added an example extra module and unit test (greet.ts)
- Added more scripts to package.json

```
    "test": "react-scripts test --watchAll=false",
    "test:watch": "react-scripts test",
    "format": "prettier --write src",
    "format:check": "prettier --check src",
    "lint": "eslint src",
    "type-check": "tsc --noEmit"
```

### License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

> This is part of Academy's technical curriculum for **The Mark**. All parts of that curriculum, including this project, are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>
