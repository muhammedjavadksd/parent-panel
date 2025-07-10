export interface Child {
    id: number;
    name: string;
    dd: string;
    mm: string;
    yy: string;
    grade: string;
    age: number;
}

export interface GetChildrenResponse {
    success: boolean;
    message: string;
    children: Child[];
    timezone: string;
}

export interface ChildrenState {
    children: Child[];
    selectedChild: Child | null;
    isLoading: boolean;
    error: string | null;
} 