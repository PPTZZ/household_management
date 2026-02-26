'use server'
import dbConnect from "@/lib/db/connection";
import {SignupSchema, TErrors, TLoginFormState, TSignupFormState} from '@/lib/definitions'
import User from "@/lib/db/schemas/user";
import {createSession, deleteSession} from "@/lib/services/session";
import {redirect} from "next/navigation";
import bcrypt from 'bcrypt'
import * as z from 'zod'


//////////////////////////
/// Register
//////////////////////////
export const signup = async (state: TSignupFormState, formData: FormData) => {
    const validateForm = SignupSchema.safeParse({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validateForm.success) {
        console.log(z.treeifyError(validateForm.error))
        return {
            errors: validateForm.error.flatten().fieldErrors
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
export const login = async (prevState: TLoginFormState, formData: FormData): Promise<TLoginFormState> => {
    const errors: TErrors = {}
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) errors.email = 'Email is required'
    if (!password) errors.password = 'Password is required'

    if (Object.keys(errors).length > 0) {
        return {errors};
    }

    try {
        await dbConnect();
        const user = await User.findOne({email: email});
        if (!user) errors.email = `${email} is not a valid user`;
        if (Object.keys(errors).length > 0) {
            return {errors};
        }
        const match = bcrypt.compareSync(password, user.password);
        if (match) {
            // TO DO - ADD REDIRECT AFTER SUCCESSFUL LOGIN LOGIC
            return;
        } else {
            errors.password = 'Password is incorrect';
            return {errors}
        }


    } catch (error) {
        return {
            errors: {
                fetchError: error
            }
        };
    }
}

//////////////////////////
/// Logout
//////////////////////////
export const logout = async () => {
    await deleteSession()
    redirect('/login')
}