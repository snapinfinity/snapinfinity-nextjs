import { ProcessSteps } from "@/components/motion/ProcessSteps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/content/services";

export function Process({ title = "How we work" }: { title?: string }) {
  return (
    <section aria-labelledby="process-title" className="container-site section-y border-t border-line">
      <SectionHeading
        id="process-title"
        className="mb-16 md:mb-24"
        eyebrow="Process"
        title={title}
        lead="Four steps from first conversation to a product that keeps improving. You’re in the loop at every one."
      />
      <ProcessSteps steps={process} />
    </section>
  );
}
