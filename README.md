# GitHub Repository Viewer

This project was written by Eli Rosenberg for Axion Ray and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
This application provides a user-friendly interface to search and view GitHub repositories based on usernames or organization names. It allows users to paginate through results, sort, and filter repositories using the options available in the GitHub REST API.

## Technical Choices
- React and TypeScript: The application is built with the latest versions of React and TypeScript, ensuring type safety and leveraging the latest features of React, such as hooks.
- Axios: Used for API requests to handle promises and improve code readability and error handling.
- Material-UI: Adopted for designing a responsive and attractive interface with less custom CSS and more consistency.
- Jest & React Testing Library: For robust unit and integration tests that mimic user interactions.
- GitHub REST API: Utilized to fetch repositories, providing real-time data and robust filtering, sorting, and pagination.


In the project directory, you can run:
### `npm install`

To download the required dependencies for the project.
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Ideas for Future Enhancements
- Advanced Search: Implement advanced search options to filter repositories based on stars, forks, and other criteria.
  - This currently isnt supported by the GitHub API, but could be implemented by fetching all repositories and filtering them in the client or in a backend service.
- OAuth Integration: Implement GitHub authentication to allow users to increase API limit and manage their repositories directly from the application.
- Mobile Optimization: Enhance responsiveness for mobile devices to improve accessibility and user experience.
- CI/CD Pipelines: Setup continuous integration and deployment pipelines to automate testing and deployment processes.
- Error Handling: Improve error handling and user feedback for failed API requests or invalid search queries.
- Accessibility / Dark Mode: Implement ui improvements for accessibility and dark mode for users who prefer it.
```