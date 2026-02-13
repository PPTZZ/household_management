import {Document} from "mongoose";

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
    members: string[];
    expenses: string[];
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
}