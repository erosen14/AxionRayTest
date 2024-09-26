import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import RepositoryTable from './RepositoryTable';
import {QueryParams, Repository, RepoTypeOptions} from './types';

const GitHubRepos: React.FC = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        username: '',
        page: 1,
        per_page: 10,
        sort: 'created',
        direction: 'desc',
        type: 'all'
    });
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const fetchRepositories = async () => {
            const { page, per_page, sort, direction, type } = queryParams;
            if (username) { // Ensures a fetch only occurs if a username is present
                try {
                    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
                        params: { page, per_page, sort, direction, type }
                    });
                    setRepositories(response.data);
                } catch (error) {
                    console.error('Failed to fetch repositories:', error);
                    setRepositories([]); // Optionally reset or handle errors differently
                }
            }
        };

        fetchRepositories();
    }, [queryParams, username]);


    const handleSearch = (username: string, type: RepoTypeOptions, perPage: number) => {
        setQueryParams({ ...queryParams, type, per_page: perPage, page: 1 });
        setUsername(username);
    };

    return (
        //add a div to wrap the SearchForm and RepositoryTable components with a margin
        <div style={{ margin: '1rem'}}>
            <SearchForm onSubmit={handleSearch} />
            <RepositoryTable repositories={repositories} queryParams={queryParams} setQueryParams={setQueryParams} />
        </div>
    );
};

export default GitHubRepos;
