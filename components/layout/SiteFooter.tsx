import Link from "next/link";
import { Wordmark } from "@/components/brand/Logo";
import { socialIcon } from "@/components/ui/Icons";
import { mainNav, site } from "@/content/site";
import { services } from "@/content/services";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="cv-auto relative overflow-hidden border-t border-line bg-abyss">
      <div className="container-site grid gap-14 pb-10 pt-20 md:pt-28 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="font-wide text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-[650] leading-[1.02] tracking-[-0.025em]">
            Infinite ideas.
            <br />
            <span className="text-teal">Powerful results.</span>
          </p>
          <a
            href={`mailto:${site.email}`}
            className="w-fit text-lead text-fg-2 underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-fg hover:decoration-teal"
          >
            {site.email}
          </a>
          <p className="text-label text-fg-3">Kerala, India · Serving the GCC</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h2 className="text-label mb-5 text-fg-3">Studio</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-fg-2 transition-colors hover:text-fg">
                  Home
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-fg-2 transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-label mb-5 text-fg-3">Services</h2>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-fg-2 transition-colors hover:text-fg">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-label mb-5 text-fg-3">Follow</h2>
            <ul className="flex flex-col gap-3">
              {site.socials.map((s) => {
                const Icon = socialIcon[s.label as keyof typeof socialIcon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-fg-2 transition-colors hover:text-fg"
                    >
                      <Icon className="size-4 text-fg-3 transition-colors group-hover:text-teal" />
                      {s.label}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      <div className="container-site" data-reveal="up">
        <Wordmark className="w-full text-fg/[0.06]" />
      </div>

      <div className="container-site flex flex-col gap-3 border-t border-line py-6 text-sm text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <ul className="flex gap-6">
          <li>
            <Link href="/privacy-policy" className="transition-colors hover:text-fg">
              Privacy policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="transition-colors hover:text-fg">
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
