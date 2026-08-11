"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/marketing/brand-lockup";

const navItems = [
  { label: "Operating flow", href: "#workflows" },
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
    <header className="ops-header">
      <div className="site-shell ops-header__bar">
        <Link className="ops-header__brand" href="/" aria-label="FullCourtHQ home" onClick={closeMenu}>
          <BrandLockup />
        </Link>

        <nav className="ops-header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ops-header__actions">
          <Link className="ops-button ops-button--primary ops-header__cta" href="#demo">
            Book a walkthrough
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
          </Link>
          <button
            ref={menuButtonRef}
            className="ops-header__menu-button"
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

      <div className="ops-header__mobile-wrap" data-open={open} aria-hidden={!open} inert={open ? undefined : true}>
        <nav id="mobile-navigation" className="ops-header__mobile-nav site-shell" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} tabIndex={open ? 0 : -1}>
              {item.label}
            </Link>
          ))}
          <Link
            className="ops-button ops-button--primary"
            href="#demo"
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
          >
            Book a walkthrough
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
