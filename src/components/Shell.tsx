import Link from "next/link";
import { Music2, LayoutDashboard, Mic2, Video, CreditCard, Settings, MessageCircle } from "lucide-react";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-3xl font-black">i<span className="text-red-600">S</span>ing</Link>
          <Link href="/create" className="rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white">Create Music</Link>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r bg-white p-5 md:block">
          <nav className="space-y-1">
            {[
              ["/dashboard","Dashboard",LayoutDashboard],
              ["/create","Create",Music2],
              ["/songs","My Music",Music2],
              ["/voices","My Voices",Mic2],
              ["/videos","My Videos",Video],
              ["/payments","Payments",CreditCard],
              ["/whatsapp","WhatsApp",MessageCircle],
              ["/account","Account",Settings]
            ].map(([href,label,Icon]: any) => (
              <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950">
                <Icon size={18}/>{label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
