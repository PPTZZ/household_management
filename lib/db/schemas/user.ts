import mongoose, {Schema} from "mongoose";
import {TUser} from "@/lib/definitions";

const userSchema: Schema<TUser> = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
    }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
