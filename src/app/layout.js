import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevInsight v2 | The Zero Bugs Club Intelligence Matrix",
  description: "Advanced engineering forensics to reveal raw developer horsepower. Analyze consistency, growth, and authenticity via AI-powered semantic processing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
