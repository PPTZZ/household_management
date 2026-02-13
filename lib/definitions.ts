import {Document} from "mongoose";

export type TUser = Document & {
    _id?: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
};
export type THousehold = Document & {
    _id?: string;
    members: string[];
    spending: string[];
};
export type TSpending = Document & {
    _id?: string;
    month: {
        month: string;
        day: number;
        year: number;
    };
    rent: number;
    electricity: number;
    gas: number;
    cold_water: number;
    hot_water: number;
    internet: number;
}