'use client'
import React, {useActionState} from 'react'
import {login} from "@/lib/services/actions";

const LoginForm = () => {
    const [state, action, pending] = useActionState(login, undefined);

    return (
        <div>
            <form action={action} className={'border size-64 bg-white flex flex-col'}>
                <div className={'flex flex-col'}>
                    <label htmlFor="email">Email</label>
                    <input className={'border'} id="email" name="email" type="email"/>
                </div>
                <div className={'flex flex-col'}>
                    <label htmlFor="password">Password</label>
                    <input className={'border'} id="password" name="password" type="password"/>
                </div>
                <button disabled={pending} type="submit">Login</button>
            </form>
            {state?.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}
            {state?.errors?.password && (
                <p className="text-red-500 text-sm">{state.errors.password}</p>
            )}
        </div>
    )
}
export default LoginForm
