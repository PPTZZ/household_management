import React from 'react'
import {Metadata} from "next";
import LoginForm from "@/lib/ui/login-form";

export const metadata: Metadata = {
    title: 'Login'
};

const Register = () => {
    return (
        <div className={'flex justify-center items-center h-screen'}>
            <LoginForm/>
        </div>
    )
}
export default Register
