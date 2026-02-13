import mongoose, {Schema} from "mongoose";
import {TExpenses} from "@/lib/definitions";

const expenseSchema: Schema<TExpenses> = new Schema({
    month: {
        type: Date,
        required: true
    },
    rent: {
        type: Number
    },
    electricity: {
        type: Number
    },
    gas: {
        type: Number
    },
    cold_water: {
        type: Number
    },
    hot_water: {
        type: Number
    },
    internet: {
        type: Number
    },
}, {
    timestamps: true
});

const Expense = mongoose.models.Expense || mongoose.model<TExpenses>('Expense', expenseSchema);
export default Expense;