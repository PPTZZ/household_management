'use client'
import React from 'react'
import {TButtonProps} from "@/lib/definitions";

const Button = ({children, asyncAction, syncAction}: TButtonProps) => {
    const [isPending, setIsPending] = React.useState(false);

    const handleClick = async () => {
        if (asyncAction) {
            try {
                setIsPending(true);
                await asyncAction();
            } catch (error) {
                console.error('Action failed:', error);
            } finally {
                setIsPending(false);
            }
        } else if (syncAction) {
            syncAction();
        } else {
            return;
        }
    }
    return (
        <button className={'size-10 bg-gray-300'} type={"submit"} disabled={isPending} onClick={handleClick}>{children}</button>
    )
}
export default Button
