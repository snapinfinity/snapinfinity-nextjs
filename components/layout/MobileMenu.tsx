"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { mainNav, site } from "@/content/site";
import { useLenis } from "@/components/motion/SmoothScroll";
import { ButtonLink } from "@/components/ui/Button";
import { socialIcon } from "@/components/ui/Icons";
import { cn, pad } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
  isActive: (href: string) => boolean;
};

/** Full-screen menu for phones and tablets: modal dialog with focus trap and Escape to close. */
export function MobileMenu({ open, onClose, returnFocusTo, isActive }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const wasOpen = useRef(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      wasOpen.current = true;
      lenis.current?.stop();
      document.documentElement.style.overflow = "hidden";
      // Wait until the panel's visibility transition has started, or focus() is ignored.
      const first = panel.querySelector<HTMLElement>("a, button");
      const focusTimer = window.setTimeout(() => first?.focus(), 120);

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
          return;
        }
        if (e.key !== "Tab") return;
        // Keep focus inside the dialog, including the toggle button in the header bar.
        const focusables = [
          ...(returnFocusTo.current ? [returnFocusTo.current] : []),
          ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
        ];
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(focusTimer);
        document.removeEventListener("keydown", onKey);
      };
    }

    if (wasOpen.current) {
      wasOpen.current = false;
      lenis.current?.start();
      document.documentElement.style.overflow = "";
      returnFocusTo.current?.focus();
    }
  }, [open, onClose, lenis, returnFocusTo]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "fixed inset-0 -z-10 flex flex-col bg-void/95 backdrop-blur-xl transition-[clip-path,visibility] duration-700 ease-[var(--ease-in-out-quart)] lg:hidden",
        open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_90%_10%,rgb(55_173_157/0.25),transparent_70%)]"
      />
      <nav aria-label="Mobile" className="container-site relative flex flex-1 flex-col justify-center pt-24">
        <ul className="flex flex-col">
          {mainNav.map((item, i) => (
            <li
              key={item.href}
              className={cn(
                "border-b border-line transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: open ? `${180 + i * 70}ms` : "0ms" }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group flex items-baseline gap-4 py-4"
              >
                <span className="text-num text-sm text-fg-3">{pad(i + 1)}</span>
                <span
                  className={cn(
                    "font-wide text-[clamp(2.25rem,9vw,3.5rem)] font-[680] leading-none tracking-[-0.03em] transition-colors",
                    isActive(item.href) ? "text-teal" : "text-fg group-hover:text-teal-glow",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={cn(
          "container-site relative flex flex-col gap-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 transition-opacity duration-700",
          open ? "opacity-100 delay-500" : "opacity-0",
        )}
      >
        <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
          Start a project
        </ButtonLink>
        <div className="flex flex-wrap items-center justify-between gap-4 text-fg-2">
          <a href={`mailto:${site.email}`} className="text-lg underline-offset-4 hover:text-fg hover:underline">
            {site.email}
          </a>
          <ul className="flex gap-2">
            {site.socials.map((s) => {
              const Icon = socialIcon[s.label as keyof typeof socialIcon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-full border border-line-strong hover:border-teal hover:text-fg"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
