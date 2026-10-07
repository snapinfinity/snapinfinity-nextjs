import type { Metadata } from "next";
import { Aurora } from "@/components/brand/Aurora";
import { InfinityMark } from "@/components/brand/InfinityMark";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <Aurora className="-z-10" />
      <InfinityMark id="nf-mark" animate className="pointer-events-none absolute -right-[10%] top-1/2 -z-10 w-[70vw] max-w-[900px] -translate-y-1/2 opacity-20" />
      <div className="container-site flex flex-col gap-8 py-32">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="text-h1 max-w-[13ch]">
          This page went <span className="text-teal">beyond our boundaries.</span>
        </h1>
        <p className="text-lead max-w-[44ch] text-fg-2">
          The link may be old or mistyped. Try one of these instead.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/work" variant="ghost" icon={false}>
            See our work
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" icon={false}>
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
