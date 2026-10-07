import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { Statement } from "@/components/sections/home/Statement";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { ServicesIndex } from "@/components/sections/home/ServicesIndex";
import { Clients } from "@/components/sections/home/Clients";
import { Process } from "@/components/sections/home/Process";
import { WhySnap } from "@/components/sections/home/WhySnap";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <SelectedWork />
      <ServicesIndex />
      <Clients />
      <Process />
      <WhySnap />
      <ClosingCta />
    </>
  );
}
