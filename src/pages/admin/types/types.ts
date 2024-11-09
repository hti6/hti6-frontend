export interface User {
    id: string;
    name: string;
    login: string;
    created_at: string;
}

export interface UsersResponse {
    result: User[];
    message: string;
    meta: {
        total: number;
        current_page: number;
        per_page: number;
    };
}
