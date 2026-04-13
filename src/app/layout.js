import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevInsight v2 | Developer Authenticity & Behavior Analysis",
  description: "Evaluate developers based on behavior, consistency, growth, and engineering maturity. Uncover real engineering talent beyond raw code.",
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
