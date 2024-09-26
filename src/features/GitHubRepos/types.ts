export interface Repository {
    id: number;
    name: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    updated_at: string;
    pushed_at: string;
    created_at: string;
    svn_url: string;
}
export type RepoSortOptions = 'created' | 'updated' | 'pushed' | 'full_name' | undefined;

export type RepoTypeOptions = 'all' | 'public' | 'private' | 'forks' | 'sources' | 'member' | undefined;

export interface QueryParams {
    username: string;
    page: number;
    per_page: number;
    sort: RepoSortOptions;
    direction: 'asc' | 'desc';
    type: RepoTypeOptions;
}