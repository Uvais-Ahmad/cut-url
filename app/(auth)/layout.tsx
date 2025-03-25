import { ThemeProvider } from "@/components/Theme-provider";
import React from "react";
import "../globals.css"
export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}