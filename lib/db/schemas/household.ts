import mongoose, {Schema} from "mongoose";
import {THousehold} from "@/lib/definitions";

const householdSchema: Schema<THousehold> = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: String,
        ref: 'User'
    }],
    expenses: [{
        type: String,
        ref: 'Expense'
    }]
}, {
    timestamps: true
})

const Household = mongoose.models.Household || mongoose.model<THousehold>('Household', householdSchema);
export default Household;