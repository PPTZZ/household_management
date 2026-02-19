'use client'
import React, {useActionState} from 'react'
import {signup} from "@/lib/services/actions";

const SignUpForm = () => {
    const [state, action, pending] = useActionState(signup, undefined)
    return (
        <form action={action} className={'border size-64 bg-white flex flex-col'}>
            <div className={'flex flex-col'}>
                <label htmlFor="first_name">First Name</label>
                <input className={'border'} id="first_name" name="first_name"/>
            </div>
            {state?.errors?.first_name && <p>{state.errors.first_name}</p>}
            <div className={'flex flex-col'}>
                <label htmlFor="last_name">Last Name</label>
                <input className={'border'} id="last_name" name="last_name"/>
                {state?.errors?.last_name && <p>{state.errors.last_name}</p>}
            </div>
            <div className={'flex flex-col'}>
                <label htmlFor="email">Email</label>
                <input className={'border'} id="email" name="email" type="email"/>
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div className={'flex flex-col'}>
                <label htmlFor="password">Password</label>
                <input className={'border'} id="password" name="password" type="password"/>
            </div>
            {state?.errors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button type="submit">Sign Up</button>
        </form>
    )
}
export default SignUpForm
