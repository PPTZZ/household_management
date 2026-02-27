import mongoose, {Schema} from "mongoose";
import {THousehold} from "@/lib/definitions";

const householdSchema: Schema<THousehold> = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    members: [{
        default: '',
        type: String,
        ref: 'User'
    }],
    expenses: [{
        default: '',
        type: String,
        ref: 'Expense'
    }],
    background: {
        default: '',
        type: String,
    }
}, {
    timestamps: true
})

const Household = mongoose.models.Household || mongoose.model<THousehold>('Household', householdSchema);
export default Household;