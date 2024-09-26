import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Box, Button } from '@mui/material';
import {Repository, QueryParams, RepoSortOptions} from './types';

interface RepositoryTableProps {
    repositories: Repository[];
    queryParams: QueryParams;
    setQueryParams: (params: QueryParams) => void;
}

const RepositoryTable: React.FC<RepositoryTableProps> = ({ repositories, queryParams, setQueryParams }) => {
    const handleSortChange = (property: RepoSortOptions) => {
        const isAsc = queryParams.sort === property && queryParams.direction === 'asc';
        setQueryParams({ ...queryParams, sort: property, direction: isAsc ? 'desc' : 'asc', page: 1 });
    };

    const handlePageChange = (newPage: number) => {
        setQueryParams({ ...queryParams, page: newPage });
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={queryParams.sort === 'full_name'}
                                direction={queryParams.sort === 'full_name' ? queryParams.direction : 'asc'}
                                onClick={() => handleSortChange('full_name')}
                            >
                                Repository Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">Stars</TableCell>
                        <TableCell align="right">Forks</TableCell>
                        <TableCell align="right">Open Issues</TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={queryParams.sort === 'updated'}
                                direction={queryParams.sort === 'updated' ? queryParams.direction : 'asc'}
                                onClick={() => handleSortChange('updated')}
                            >
                                Updated At
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={queryParams.sort === 'pushed'}
                                direction={queryParams.sort === 'pushed' ? queryParams.direction : 'asc'}
                                onClick={() => handleSortChange('pushed')}
                            >
                                Last Push
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={queryParams.sort === 'created'}
                                direction={queryParams.sort === 'created' ? queryParams.direction : 'asc'}
                                onClick={() => handleSortChange('created')}
                            >
                                Created
                            </TableSortLabel>
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {repositories.map((repo) => (
                        <TableRow key={repo.id}>
                            <TableCell component="th" scope="row">
                                <a href={repo.svn_url} target="_blank">
                                {repo.name}
                                </a>
                            </TableCell>
                            <TableCell align="right">{repo.stargazers_count}</TableCell>
                            <TableCell align="right">{repo.forks_count}</TableCell>
                            <TableCell align="right">{repo.open_issues_count}</TableCell>
                            <TableCell align="right">{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
                            <TableCell align="right">{new Date(repo.pushed_at).toLocaleDateString()}</TableCell>
                            <TableCell align="right">{new Date(repo.created_at).toLocaleDateString()}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                <Button
                    onClick={() => handlePageChange(queryParams.page - 1)}
                    disabled={queryParams.page === 1}
                    sx={{ marginRight: 1 }}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => handlePageChange(queryParams.page + 1)}
                    disabled={repositories.length === 0}
                >
                    Next
                </Button>
            </Box>
        </TableContainer>
    );
};

export default RepositoryTable;