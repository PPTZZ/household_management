import mongoose, {Schema} from "mongoose";
import {TThemes} from "@/lib/definitions";

const themeSchema: Schema<TThemes> = new Schema({
    name: {
        type: String,
    },
    value: {
        type: String,
    }
})

const Theme = mongoose.models.Theme || mongoose.model<TThemes>('Theme', themeSchema);
export default Theme;