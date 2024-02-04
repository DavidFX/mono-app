import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.scss";
import { ThemeProvider } from "@/components/global/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Mono",
  description: "The place you can share your thoughts and be heard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.className} ${GeistMono.variable} overflow-x-hidden`}
    >
      <body className="w-screen pb-12 overflow-x-hidden bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
