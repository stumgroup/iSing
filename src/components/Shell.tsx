"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, LayoutDashboard, Mic2, Music2, Video, CreditCard, Settings, MessageCircle, HelpCircle, Sparkles, Menu, X, Globe2, Share2, BarChart3 } from "lucide-react";
import { useState } from "react";

const nav = [
  ["/dashboard", "Overview", LayoutDashboard],
  ["/create", "Create", Sparkles],
  ["/songs", "My Music", Music2],
  ["/videos", "My Videos", Video],
  ["/voices", "My Voices", Mic2],
];
const manage = [
  ["/payments", "Payments", CreditCard],
  ["/whatsapp", "WhatsApp", MessageCircle],
  ["/account", "Account", Settings],
  ["/help", "Help Center", HelpCircle],
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const links = [...nav, ...manage];
  return (
    <div className="saas-app">
      <header className="saas-topbar">
        <div className="saas-topbar-inner">
          <button className="mobile-menu" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20}/></button>
          <Link href="/" className="brand"><span className="brand-mark">i</span>Sing <span className="brand-ai">AI</span></Link>
          <div className="topbar-spacer" />
          <Link href="/create" className="top-create"><Sparkles size={15}/> Create</Link>
          <button className="icon-button" aria-label="Notifications"><Bell size={18}/><span className="notification-dot"/></button>
          <Link href="/account" className="profile-pill"><span className="avatar">i</span><span className="profile-name">My account</span><ChevronDown size={14}/></Link>
        </div>
      </header>
      <div className="saas-layout">
        <aside className={`saas-sidebar ${open ? "mobile-open" : ""}`}>
          <div className="sidebar-mobile-head"><span className="text-xs font-black uppercase tracking-widest text-zinc-400">Workspace</span><button className="icon-button" onClick={() => setOpen(false)}><X size={18}/></button></div>
          <div className="sidebar-section-label">Workspace</div>
          <nav>{nav.map(([href,label,Icon]) => { const I = Icon as typeof LayoutDashboard; return <Link key={String(href)} href={String(href)} onClick={() => setOpen(false)} className={`side-item ${isActive(String(href)) ? "side-item-active" : ""}`}><I size={17}/><span>{String(label)}</span></Link>; })}</nav>
          <div className="sidebar-section-label sidebar-gap">Manage</div>
          <nav>{manage.map(([href,label,Icon]) => { const I = Icon as typeof LayoutDashboard; return <Link key={String(href)} href={String(href)} onClick={() => setOpen(false)} className={`side-item ${isActive(String(href)) ? "side-item-active" : ""}`}><I size={17}/><span>{String(label)}</span></Link>; })}</nav>
          <div className="sidebar-bottom-card">
            <div className="mini-orb"><Music2 size={15}/></div>
            <b>Make something great.</b>
            <p>Start with an idea and let iSing AI shape it.</p>
            <Link href="/create">Open studio <span>→</span></Link>
          </div>
        </aside>
        {open && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setOpen(false)} />}
        <main className="saas-main">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow || "iSing AI"}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>;
}

export function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail?: string; icon?: any }) {
  return <div className="stat-card">{Icon && <div className="stat-icon"><Icon size={17}/></div>}<div className="stat-label">{label}</div><div className="stat-value">{value}</div>{detail && <div className="stat-detail">{detail}</div>}</div>;
}

export function EmptyState({ icon: Icon = Music2, title, text, action }: { icon?: any; title: string; text: string; action?: React.ReactNode }) {
  return <div className="empty-state"><div className="empty-icon"><Icon size={23}/></div><h3>{title}</h3><p>{text}</p>{action}</div>;
}
