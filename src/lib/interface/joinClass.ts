export interface JoinClassResponse {
    success: boolean;
    message: string;
    join_url?: string;
}

export interface JoinClassServiceResponse {
    status: boolean;
    msg: string;
    data?: { join_url?: string };
} 