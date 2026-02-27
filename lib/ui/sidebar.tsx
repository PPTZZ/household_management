'use client'
import React from 'react'
import Button from "@/lib/ui/button";
import {logout} from "@/lib/services/actions";

const Sidebar = () => {
    return (
        <div className={'bg-slate-200 lg:w-1/8 h-screen min-w-64'}>
            <div></div>
            <div></div>
            <form action={logout}>
                <Button>Log out</Button>
            </form>
        </div>
    )
}
export default Sidebar
