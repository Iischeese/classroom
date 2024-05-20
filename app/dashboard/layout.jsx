import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/dashboard/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-background text-text flex ${inter.className}`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
