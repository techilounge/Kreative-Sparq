"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { GlobalContent } from "@/content/types";
import { BrandLogo } from "./brand-logo";
import { ThemeControl } from "./theme-control";

export function SiteHeader({ content }: { content: GlobalContent }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const menu = dialog.current;
    if (!menu) return;

    if (open) {
      if (!menu.open) menu.showModal();
      document.body.classList.add("mobile-menu-open");
      closeButton.current?.focus();
    } else {
      if (menu.open) menu.close();
      document.body.classList.remove("mobile-menu-open");
    }

    return () => document.body.classList.remove("mobile-menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <div className="ks-container site-header__inner">
        <BrandLogo />
        <nav className="desktop-nav" aria-label="Primary">
          {content.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="desktop-actions">
          <ThemeControl />
          <Link
            className="button button--primary"
            href={content.primaryAction.href}
          >
            {content.primaryAction.label}
          </Link>
        </div>
        <button
          ref={menuButton}
          className="menu-trigger"
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-labelledby="mobile-menu-heading"
        onCancel={() => setOpen(false)}
        onClose={() => {
          setOpen(false);
          menuButton.current?.focus();
        }}
      >
        <div className="ks-container mobile-menu__inner">
          <div className="mobile-menu__top">
            <h2 id="mobile-menu-heading">Explore Kreative Sparq</h2>
            <button
              ref={closeButton}
              type="button"
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav className="mobile-nav" aria-label="Mobile primary">
            {content.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__bottom">
            <ThemeControl />
            <Link
              className="button button--primary"
              href={content.primaryAction.href}
              onClick={() => setOpen(false)}
            >
              {content.primaryAction.label}
            </Link>
          </div>
        </div>
      </dialog>
    </header>
  );
}
