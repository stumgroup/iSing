import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iSing AI — Create Music From an Idea",
  description: "iSing AI turns your ideas into original music with an in-house creative engine.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
