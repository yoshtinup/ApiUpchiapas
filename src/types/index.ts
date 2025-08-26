export type User = {
    id: string;
    name: string;
    email: string;
};

export type Product = {
    id: string;
    name: string;
    price: number;
};

export type ApiResponse<T> = {
    data: T;
    message: string;
    status: number;
};

export type ErrorResponse = {
    message: string;
    status: number;
};