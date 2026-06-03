import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { Toaster } from "sonner";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Meeti Next",
        template: `%s | ${process.env.APP_NAME}`
    },
    description: "Meeti next julio con DrizzelORM",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster
                        position="top-right"
                        richColors
                        closeButton
                        toastOptions={{
                            classNames: {
                                toast: 'font-sans',
                                success: '!border-success/10 !bg-success/10 !text-success',
                                warning: '!border-warning/10 !bg-warning/10 !text-warning',
                                error: '!border-destructive/10 !bg-destructive/10 !text-destructive',
                                info: '!border-info/10 !bg-info/10 !text-info',
                                actionButton: '!bg-primary !text-primary-foreground hover:!bg-primary/90',
                                cancelButton: '!bg-secondary !text-secondary-foreground hover:!bg-secondary/80',
                                closeButton: '!border-border !bg-background !text-muted-foreground hover:!bg-accent hover:!text-accent-foreground',
                            },
                        }}
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
