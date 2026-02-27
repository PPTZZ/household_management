'use client'
import React from 'react'
import {TButtonProps} from "@/lib/definitions";

const Button = ({children, action}: TButtonProps) => {
    const [isPending, setIsPending] = React.useState(false);

    const handleClick = async () => {
        if (!action) return;

        try {
            setIsPending(true);
            await action();
        } catch (error) {
            console.error('Action failed:', error);
        } finally {
            setIsPending(false);
        }
    }
    return (
        <button type={"submit"} disabled={isPending} onClick={handleClick}>{children}</button>
    )
}
export default Button
