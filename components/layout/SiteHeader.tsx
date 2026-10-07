"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/content/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header data-home={pathname === "/"} className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border-b border-line bg-void/80 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-500",
          scrolled && !open ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="container-site relative flex h-18 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          aria-label="Snap Infinity home"
          className="relative -m-2 rounded-md p-2"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <Logo className="h-6 md:h-7" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="glass flex items-center gap-1 rounded-full p-1.5">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-4 py-2 text-[0.95rem] transition-colors duration-300",
                      active ? "bg-fg/[0.07] text-fg" : "text-fg-2 hover:text-fg",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-2.5 w-1 rounded-[2px] bg-teal transition-all duration-300",
                        active ? "opacity-100" : "w-0 opacity-0",
                      )}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" className="max-md:hidden">
            Start a project
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass relative grid size-12 place-items-center rounded-full lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-full rounded bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open && "translate-y-[5.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-full rounded bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open && "-translate-y-[5.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} returnFocusTo={toggleRef} isActive={isActive} />
    </header>
  );
}
