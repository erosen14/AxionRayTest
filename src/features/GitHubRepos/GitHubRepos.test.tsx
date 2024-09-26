import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GitHubRepos from './GitHubRepos';
import mockAxios from 'jest-mock-axios';
import {mockDataPage1} from "../../__mocks__/GitHubRepos/mockDataPage1";
import {mockDataPage2} from "../../__mocks__/GitHubRepos/mockDataPage2";

afterEach(() => {
    mockAxios.reset();
});


describe('GitHubRepos Component', () => {
    test('renders search form and submits search', async () => {
        render(<GitHubRepos />);

        const input = screen.getByTestId('github-username-input');
        const searchButton = screen.getByTestId('search-button');

        // Setup mock response
        mockAxios.get.mockResolvedValueOnce(mockDataPage1);


        // Simulate user typing a username and submitting the form
        await userEvent.type(input, 'test-org');
        await userEvent.click(searchButton);

        await waitFor(() => {
            expect(mockAxios.get).toHaveBeenCalledWith(
                expect.stringContaining('https://api.github.com/users/test-org/repos'), // checks URL
                expect.objectContaining({  // checks query parameters
                    params: {
                        direction: "desc",
                        page: 1,
                        per_page: 10,
                        sort: "created",
                        type: "all"
                    }
                })
            );
            //Make sure result is shown on the page
            expect(screen.getByText('repo1')).toBeInTheDocument();
        });
    });

    test('handles API errors gracefully', async () => {
        render(<GitHubRepos />);

        const input = screen.getByLabelText(/GitHub Username or Organization/i);
        const searchButton = screen.getByRole('button', { name: /search/i });

        // Setup mock error response before any interaction
        mockAxios.get.mockRejectedValue(new Error('API Error'));

        // Simulate user typing a username and submitting the form
        await userEvent.type(input, 'test-org');
        await userEvent.click(searchButton);

        // Assert error handling
        await waitFor(() => {
            expect(screen.queryByText('repo1')).not.toBeInTheDocument();
        });
    });

    test('navigates to next page of results', async () => {
        mockAxios.get.mockResolvedValueOnce(mockDataPage1);

        render(<GitHubRepos />);
        const input = screen.getByTestId('github-username-input');
        const searchButton = screen.getByTestId('search-button');

        // Simulate user entering username and clicking search
        await userEvent.type(input, 'test-org');
        await userEvent.click(searchButton);

        // Confirm initial data is loaded
        await screen.findByText('repo1');

        // Set up next page response
        mockAxios.get.mockResolvedValueOnce(mockDataPage2);

        // Simulate clicking the 'Next' button
        const nextButton = screen.getByText('Next');
        await userEvent.click(nextButton);

        // Check if the new data is displayed
        await waitFor(() => expect(screen.getByText('repo3')).toBeInTheDocument());

        // Check the API call for the next page
        expect(mockAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('https://api.github.com/users/test-org/repos'),
            expect.objectContaining({
                params: expect.objectContaining({ page: 2 })
            })
        );
    });

    test('handles no more pages gracefully', async () => {
        mockAxios.get.mockResolvedValueOnce(mockDataPage1);

        render(<GitHubRepos />);
        const input = screen.getByTestId('github-username-input');
        const searchButton = screen.getByTestId('search-button');

        // Simulate user entering username and clicking search
        await userEvent.type(input, 'test-org');
        await userEvent.click(searchButton);

        // Confirm initial data is loaded
        await screen.findByText('repo1');

        // No more pages, simulate empty response
        mockAxios.get.mockResolvedValueOnce({ data: [] });

        // Simulate clicking the 'Next' button
        const nextButton = screen.getByText('Next');
        await userEvent.click(nextButton);

        // Check if the 'Next' button is disabled
        await waitFor(() => expect(nextButton).toBeDisabled());

        // Ensure no new data (from non-existent page) is rendered
        expect(screen.queryByText('repo3')).not.toBeInTheDocument();
    });

    test('navigates back to the previous page of results', async () => {
        // Initially, resolve with the first page data and simulate a user clicking to the second page
        mockAxios.get.mockResolvedValueOnce(mockDataPage1);
        render(<GitHubRepos />);
        const input = screen.getByTestId('github-username-input');
        const searchButton = screen.getByTestId('search-button');

        // Simulate user interaction
        await userEvent.type(input, 'octocat');
        await userEvent.click(searchButton);
        await screen.findByText('repo1');

        // Setup the second page response
        mockAxios.get.mockResolvedValueOnce(mockDataPage2);
        const nextButton = screen.getByText('Next');
        await userEvent.click(nextButton);
        await screen.findByText('repo3');

        // Setup return to the first page
        mockAxios.get.mockResolvedValueOnce(mockDataPage1);
        const prevButton = screen.getByText('Previous');
        await userEvent.click(prevButton);

        // Check if the first page data is displayed again
        await waitFor(() => expect(screen.getByText('repo1')).toBeInTheDocument());

        // Check the API call for the previous page
        expect(mockAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('https://api.github.com/users/octocat/repos'),
            expect.objectContaining({
                params: expect.objectContaining({ page: 1 })
            })
        );
    });

    test('initial load does not fetch data without user input', async () => {
        render(<GitHubRepos />);

        // Assert that no API call is made until there is user interaction
        expect(mockAxios.get).not.toHaveBeenCalled();

        // Ensure the UI does not show any repository data
        expect(screen.queryByText('repo1')).not.toBeInTheDocument();
        expect(screen.queryByText('repo2')).not.toBeInTheDocument();

    });

});
