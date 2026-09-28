"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/marketing/brand-lockup";

const navItems = [
  { label: "Payments", href: "#payments" },
  { label: "Courts", href: "#courts" },
  { label: "Families", href: "#families" },
  { label: "Product", href: "#product-tour" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

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
    <header className="site-header" data-scrolled={scrolled || open}>
      <div className="site-shell site-header__bar">
        <Link className="site-header__brand" href="/" aria-label="FullCourtHQ home" onClick={closeMenu}>
          <BrandLockup />
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="btn btn--primary btn--sm site-header__cta" href="#demo">
            Book a walkthrough
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
          <button
            ref={menuButtonRef}
            className="site-header__menu-button"
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

      <div className="site-header__mobile" data-open={open} aria-hidden={!open} inert={open ? undefined : true}>
        <nav id="mobile-navigation" className="site-shell site-header__mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} tabIndex={open ? 0 : -1}>
              {item.label}
            </Link>
          ))}
          <Link className="btn btn--primary" href="#demo" onClick={closeMenu} tabIndex={open ? 0 : -1}>
            Book a walkthrough
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
