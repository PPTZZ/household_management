import {Document} from "mongoose";
import * as z from "zod";
import {ReactNode} from "react";


/////////////////////////////////
/// Register/Login Types + Schemas
////////////////////////////////
export const SignupSchema = z.object({
    first_name: z
        .string()
        .min(2, {error: 'First name must be at least 2 characters long.'})
        .trim(),
    last_name: z
        .string()
        .min(2, {error: 'Last name must be at least 2 characters long.'})
        .trim(),
    email: z.email({error: 'Please enter a valid email.'}).trim(),
    password: z
        .string()
        .min(8, {error: 'Be at least 8 characters long'})
        .regex(/[a-zA-Z]/, {error: 'Contain at least one letter.'})
        .regex(/[0-9]/, {error: 'Contain at least one number.'})
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
})


export type TSignupFormState =
    | {
    errors?: {
        first_name?: string[] | string
        last_name?: string[] | string
        email?: string[] | string
        password?: string[] | string
    }
}
    | undefined


export type TErrors = {
    password?: string;
    email?: string;
    text?: string;
    cookie?: string;
    fetchError?: unknown;
}


export type TLoginFormState = | {
    errors?: TErrors;

} | undefined

/////////////////////////////////
/// DB Schema Types
////////////////////////////////
export const CreateHouseholdSchema = z.object({
    name: z
        .string()
        .min(2, {error: 'Household name must be at least 2 characters long.'})
        .trim(),
})
export type TCreateHouseholdState =
    | {
    message?: string,
    success?: boolean,
    errors?: {
        _form?: string[] | string,
        name?: string[] | undefined
    }
}
    | undefined

export type TUser = Document & {
    _id?: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    nickname: string;
};
export type THousehold = Document & {
    _id?: string;
    name: string;
    owner: string;
    members: string[];
    expenses: string[];
    background: string;
};
export type TExpenses = Document & {
    _id?: string;
    month: Date;
    rent: number;
    electricity: number;
    gas: number;
    cold_water: number;
    hot_water: number;
    internet: number;
};
export type TThemes = Document & {
    _id?: string;
    name: string;
    value: string;
}
/////////////////////////////////
/// Session Types
////////////////////////////////
export type TSessionPayload = {
    userId?: string;
    expiresAt?: Date;
    role?: string | undefined;
}
/////////////////////////////////
/// UI
////////////////////////////////
export type TButtonProps = {
    children: ReactNode;
    asyncAction?: () => void | Promise<void>;
    syncAction?: () => void;
}
export type THouseholdCardProps = {
    owner: string;
    members: string[];
    title: string;
}

export type  TPageProps = {
    params: Promise<{ householdId: string }>
}