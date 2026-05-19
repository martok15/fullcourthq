"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="marketing-header">
      <div className="site-shell header-bar">
        <Link className="brand-link" href="/" aria-label="FullCourtHQ home" onClick={() => setOpen(false)}>
          <Image src="/brand/fullcourthq-horizontal.png" alt="FullCourtHQ" width={1004} height={216} priority />
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
            Book a Demo
          </Link>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mobile-nav-wrap">
          <nav className="mobile-nav site-shell" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="button button-gold" href="#demo" onClick={() => setOpen(false)}>
              Book a Demo
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
