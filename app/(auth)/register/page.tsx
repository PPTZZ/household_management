import React from 'react'
import SignUpForm from "@/lib/ui/sign-up-form";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Register'
};

const Register = () => {
    return (
        <div className={'flex justify-center items-center h-screen'}>
            <SignUpForm/>
        </div>
    )
}
export default Register
