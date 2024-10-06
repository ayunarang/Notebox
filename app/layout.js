import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Notebox",
  description: "This is Notebox app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
