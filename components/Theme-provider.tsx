"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
    }: React.ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return children without theme provider on server
        return <>{children}</>;
    }

    return (
        <NextThemesProvider 
            {...props}
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
}