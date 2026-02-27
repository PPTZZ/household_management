import type {Metadata, Viewport} from "next";
import "@/app/globals.css";
import React from "react";
import Sidebar from "@/lib/ui/sidebar";
import {cookies} from "next/headers";
import {decrypt} from "@/lib/services/session";


export const metadata: Metadata = {
    title: {
        template: '%s | Home Manager',
        default: "Home Manager"
    },
    description: "Keep track of your household expenses",
};
export const viewport: Viewport = {
    width: 'device-width',
    height: 'device-width',
    initialScale: 1
}


export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={'bg-red-400ntialiased flex flex-col min-h-screen '}>
        <main className={'grow'}>
            {children}
        </main>
        </body>
        </html>
    );
}
