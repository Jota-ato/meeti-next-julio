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
                                success: '!border-success/30 !bg-success !text-success-foreground',
                                warning: '!border-warning/30 !bg-warning !text-warning-foreground',
                                error: '!border-destructive/30 !bg-destructive !text-destructive-foreground',
                                info: '!border-info/30 !bg-info !text-info-foreground',
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
