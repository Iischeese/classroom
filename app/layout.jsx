import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | NoAll",
    default: "NoAll",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-background text-text flex overflow-x-hidden ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
