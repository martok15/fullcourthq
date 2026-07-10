"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/marketing/brand-lockup";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Product tour", href: "#product-tour" },
  { label: "Who it’s for", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Trust", href: "#trust" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="marketing-header">
      <div className="site-shell header-bar">
        <Link className="brand-link" href="/" aria-label="FullCourtHQ home" onClick={closeMenu}>
          <BrandLockup />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="button button-gold header-demo" href="#demo">
            See the platform
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
          </Link>
          <button
            ref={menuButtonRef}
            className="mobile-menu-button"
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </div>

      <div className="mobile-nav-wrap" data-open={open} aria-hidden={!open} inert={open ? undefined : true}>
        <nav id="mobile-navigation" className="mobile-nav site-shell" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} tabIndex={open ? 0 : -1}>
              {item.label}
            </Link>
          ))}
          <Link className="button button-gold" href="#demo" onClick={closeMenu} tabIndex={open ? 0 : -1}>
            See the platform
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
