import { BookingType } from "@/app/types/bookings.type";
import { OrderType } from "@/app/types/orders.type";


export interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: number,
    avatar: AvatarType,
    address: string,
    role: UserRole,
    isActive: boolean,
    orders: OrderType[],
    bookings: BookingType[],
    createdAt: string,
    updatedAt: string,
    __v: number
};

export type AvatarType = {
    url: string;
    alt: string;
    width: number;
    height: number;
}

export type RegisterForm = {
    name?: FormDataEntryValue | null,
    email?: FormDataEntryValue | null,
    address?: FormDataEntryValue | null,
    phoneNumber?: FormDataEntryValue | null,
    password?: FormDataEntryValue | null,
    password2?: FormDataEntryValue | null,
    avatarUrl?: FormDataEntryValue | null,
    avatarAlt?: FormDataEntryValue | null,
    avatarWidth?: FormDataEntryValue | null,
    avatarHeight?: FormDataEntryValue | null,
}

export type LoginForm = {
    email: string;
    password: string;
}

export type UserApiResponse = {
    token: Token;
    user: User;
}

export type Token = string;

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
}

export type RegisterFormState = {
    data?: RegisterForm,
    success?: boolean,
    message?: string,
    serverError?: string,
    errors?: {
        name?: string[],
        email?: string[],
        address?: string[],
        phoneNumber?: string[],
        password?: string[],
        password2?: string[],
        avatarUrl?: string[],
        avatarAlt?: string[],
        avatarWidth?: string[],
        avatarHeight?: string[]
    } | null,
    user?: User,
}