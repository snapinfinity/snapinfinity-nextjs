import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clients, type Client } from "@/content/clients";
import { cn } from "@/lib/utils";

function LogoTile({ client, copy }: { client: Client; copy?: boolean }) {
  return (
    <li
      aria-hidden={copy || undefined}
      className={cn(
        "logo-tile",
        copy && "motion-reduce:hidden",
      )}
    >
      <Image
        src={client.logo}
        alt={copy ? "" : client.name}
        width={client.width}
        height={client.height}
        sizes="220px"
        className="logo-tile-img"
        style={{ height: 40 * client.scale, maxHeight: "70%" }}
      />
    </li>
  );
}

function Row({ items, reverse, decorative }: { items: Client[]; reverse?: boolean; decorative?: boolean }) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn(
        "marquee relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] motion-reduce:[mask-image:none]",
        decorative && "motion-reduce:hidden",
      )}
      style={{ "--marquee-dir": reverse ? "reverse" : "normal", "--marquee-duration": "60s" } as React.CSSProperties}
    >
      <ul className="marquee-track flex w-max shrink-0 gap-4 pr-4 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-4">
        {items.map((c) => (
          <LogoTile key={c.name} client={c} copy={decorative} />
        ))}
        {/* A second copy makes the loop seamless; hidden from assistive tech */}
        {items.map((c) => (
          <LogoTile key={`${c.name}-copy`} client={c} copy />
        ))}
      </ul>
    </div>
  );
}

export function Clients() {
  const half = Math.ceil(clients.length / 2);
  return (
    <section aria-labelledby="clients-title" className="cv-auto section-y overflow-hidden border-t border-line">
      <div className="container-site mb-14 md:mb-20">
        <SectionHeading
          id="clients-title"
          eyebrow="Clients"
          title={["Trusted by", { text: "forward-thinking brands.", className: "text-teal" }]}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Row items={clients} />
        <Row items={[...clients.slice(half), ...clients.slice(0, half)].reverse()} reverse decorative />
      </div>
    </section>
  );
}
