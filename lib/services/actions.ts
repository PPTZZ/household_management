'use server'
import dbConnect from "@/lib/db/connection";
import {FormState, SignupSchema} from '@/lib/definitions'
import User from "@/lib/db/schemas/user";
import {createSession, deleteSession} from "@/lib/services/session";
import {redirect} from "next/navigation";
import bcrypt from 'bcrypt'

//////////////////////////
/// Register
//////////////////////////
export const signup = async (state: FormState, formData: FormData) => {
    const validateForm = SignupSchema.safeParse({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validateForm.success) {
        return {
            errors: validateForm.error.flatten().fieldErrors,
        }
    }

    const {first_name, last_name, email, password} = validateForm.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnect();
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
        return {
            errors: {
                email: ["Email already exists"]
            }
        }
    }

    const setUser = await User.create({first_name, last_name, email, password: hashedPassword});
    if (setUser._id) {
        console.log(`[server]: User ${setUser._id.toString()} created successfully.`);
        await createSession(setUser._id.toString());
        redirect('/')
    }
}


//////////////////////////
/// Login
//////////////////////////


//////////////////////////
/// Logout
//////////////////////////
export async function logout() {
    await deleteSession()
    redirect('/login')
}