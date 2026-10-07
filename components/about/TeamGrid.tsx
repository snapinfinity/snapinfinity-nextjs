import Image from "next/image";
import { team } from "@/content/team";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export function TeamGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {team.map((m, i) => (
        <li key={m.name} data-reveal="up" style={{ "--reveal-delay": (i % 4) * 70 } as React.CSSProperties} className="group">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-abyss">
            {m.photo ? (
              <>
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role}`}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
                  className="object-cover grayscale-[0.85] contrast-[1.05] transition-[filter,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-teal-deep/30 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/70 to-transparent" />
              </>
            ) : (
              <div
                role="img"
                aria-label={`${m.name}, photo coming soon`}
                className="grid h-full place-items-center bg-[radial-gradient(80%_60%_at_50%_30%,rgb(55_173_157/0.25),transparent_70%)]"
              >
                <span className="font-wide text-[clamp(2.5rem,6vw,4.5rem)] font-[700] tracking-[-0.03em] text-teal/80">{initials(m.name)}</span>
              </div>
            )}
          </div>
          <h3 className="mt-4 text-lg font-[600] leading-tight">{m.name}</h3>
          <p className="mt-1 text-[0.92rem] text-fg-2">{m.role}</p>
        </li>
      ))}
    </ul>
  );
}
