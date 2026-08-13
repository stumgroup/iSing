import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iSing — AI Music Through WhatsApp",
  description: "Create original music, voices and AI-inspired videos with iSing."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
