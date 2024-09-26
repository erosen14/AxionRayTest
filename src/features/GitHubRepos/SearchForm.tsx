import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Collapse, SelectChangeEvent } from '@mui/material';
import { RepoTypeOptions } from './types';

interface Props {
    onSubmit: (search: string, type: RepoTypeOptions, perPage: number) => void;
}

const SearchForm: React.FC<Props> = ({ onSubmit }) => {
    const [input, setInput] = useState('');
    const [repoType, setRepoType] = useState<RepoTypeOptions>('all');
    const [perPage, setPerPage] = useState<number>(10);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleRepoTypeChange = (event: SelectChangeEvent<RepoTypeOptions>) => {
        setRepoType(event.target.value as RepoTypeOptions);
    };

    const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPerPage(parseInt(event.target.value));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(input, repoType, perPage);
    };

    const toggleAdvancedOptions = () => {
        setShowAdvanced(!showAdvanced);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="github-user"
                label="GitHub Username or Organization"
                name="githubUser"
                autoComplete="username"
                autoFocus
                value={input}
                onChange={handleChange}
                inputProps={{ "data-testid": "github-username-input" }}
            />
            <Button onClick={toggleAdvancedOptions} color="primary">
                Advanced Options
            </Button>
            <Collapse in={showAdvanced}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="repo-type-label">Repository Type</InputLabel>
                    <Select
                        labelId="repo-type-label"
                        id="repo-type-select"
                        value={repoType}
                        label="Repository Type"
                        onChange={handleRepoTypeChange}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                        <MenuItem value="private">Private</MenuItem>
                        <MenuItem value="forks">Forks</MenuItem>
                        <MenuItem value="sources">Sources</MenuItem>
                        <MenuItem value="member">Member</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    fullWidth
                    id="per-page"
                    label="Results per Page"
                    name="perPage"
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={perPage}
                    onChange={handlePerPageChange}
                    sx={{ mt: 2 }}
                />
            </Collapse>
            <Button data-testid='search-button' type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Search
            </Button>
        </Box>
    );
};

export default SearchForm;
