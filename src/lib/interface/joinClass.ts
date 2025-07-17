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

export interface CheckClassStartedResponse {
    success: boolean;
    message: string;
}

export interface CheckClassStartedServiceResponse {
    status: boolean;
    msg: string;
} 