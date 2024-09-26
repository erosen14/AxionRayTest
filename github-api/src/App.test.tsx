// src/App.test.tsx

import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Helper function to interact with the router
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}): RenderResult => {
  window.history.pushState({}, 'Test page', route);
  return render(ui);
};

describe('App Routing', () => {
  it('renders GitHubRepos component on the root route', () => {
    renderWithRouter(<App/>);
    expect(screen.getByText(/Repository Name/i)).toBeInTheDocument();
  });

  it('renders About component on the /about route', () => {
    renderWithRouter(<App/>, {route: '/about'});
    // You must replace the below text with something actually rendered by the About component
    expect(screen.getByText(/About This Project/i)).toBeInTheDocument();
  });

  it('always renders NavBar', () => {
    renderWithRouter(<App/>);
    expect(screen.getByText(/GitHub Repository API/i)).toBeInTheDocument();
    renderWithRouter(<App/>, {route: '/about'});
    expect(screen.getByText(/GitHub Repository API/i)).toBeInTheDocument();
  });
});