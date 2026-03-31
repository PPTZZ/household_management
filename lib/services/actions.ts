'use server'
import dbConnect from "@/lib/db/connection";
import {
    CreateHouseholdSchema,
    SignupSchema,
    TCreateHouseholdState,
    TErrors,
    THousehold,
    TLoginFormState,
    TSignupFormState,
    TUser
} from '@/lib/definitions'
import User from "@/lib/db/schemas/user";
import {createSession, decrypt, deleteSession} from "@/lib/services/session";
import {redirect} from "next/navigation";
import bcrypt from 'bcrypt'
import * as z from 'zod'
import {cookies} from "next/headers";
import Household from "@/lib/db/schemas/household";
import {revalidatePath} from "next/cache";
import mongoose from "mongoose";


//////////////////////////
/// AUTH
//////////////////////////
// Register //////////////
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


// Login /////////////////
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
            console.log(`[server]: User ${user._id.toString()} logged in successfully.`);
            await createSession(user._id.toString());

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
    return redirect('/');
}


// Logout ////////////////
export const logout = async () => {
    await deleteSession()
    redirect('/login')
}

//////////////////////////
/// Households
//////////////////////////
// Create ////////////////
export const createHouseHold = async (
    state: TCreateHouseholdState,
    formData: FormData
): Promise<TCreateHouseholdState> => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    const validateHouseholdName = CreateHouseholdSchema.safeParse({
        name: formData.get('household_name')
    });

    if (!validateHouseholdName.success) {
        return {
            errors: validateHouseholdName.error.flatten().fieldErrors
        };
    }

    try {
        await dbConnect();
        const createdHousehold: THousehold = await Household.create({
            name: formData.get('household_name'),
            owner: session?.userId,
            members: [session?.userId]
        });
        console.log(`[server]: Household ${createdHousehold._id.toString()} created successfully.`);

        revalidatePath('/dashboard');

        return {
            success: true,
            message: 'Household created successfully'
        };
    } catch (error) {
        console.error('Error creating household:', error);
        return {
            errors: {
                _form: ['Failed to create household. Please try again.']
            }
        };
    }
};

// Delete ////////////////
export const deleteHousehold = async (id: string) => {
    await dbConnect();
    await Household.findByIdAndDelete(id)
    revalidatePath('/dashboard')
}

// Get ///////////////////
export const getHouseholds = async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);
    try {
        await dbConnect()
        const households: THousehold[] = await Household.find({members: session?.userId});
        return households;
    } catch (error) {
        throw new Error("getHousehold error");
    }
}

export const getSingleHousehold = async (id: string) => {
    await dbConnect();
    const household = await Household.findById(id).select(['members', 'owner', 'name', 'expenses', 'background']).lean();
    // GET household members
    const validMemberIds = household.members.reduce((acc: mongoose.Types.ObjectId[], id: string) => {
        if (mongoose.Types.ObjectId.isValid(id)) {
            acc.push(new mongoose.Types.ObjectId(id));
        }
        return acc;
    }, []);
    const members = await User.find({
        _id: {$in: validMemberIds}
    })
        .select('-password')
        .lean<TUser[]>();


    return {
        members,
        expenses: household.expenses,
        owner: household.owner,
        name:household.name,
        background:household.background
    }
}
