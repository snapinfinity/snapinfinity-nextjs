"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { enquiryTypes, getService, type EnquiryType } from "@/content/services";
import { site } from "@/content/site";
import { submitEnquiry } from "@/lib/enquiry";
import { ArrowUpRight, Check } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "phone" | "message" | "connectWith", string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const field =
  "w-full rounded-sm border border-line-strong bg-void/60 px-4 text-fg placeholder:text-fg-3 transition-colors duration-300 hover:border-fg-3 focus:border-teal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-glow aria-[invalid=true]:border-error";

function validate(form: FormData): Errors {
  const errors: Errors = {};
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").replace(/[\s()-]/g, "");
  const message = String(form.get("message") ?? "").trim();
  if (!name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter an email address like name@company.com.";
  if (!/^\+?\d{6,16}$/.test(phone)) errors.phone = "Enter a phone number with 6 to 16 digits. You can start with +.";
  if (!form.get("connectWith")) errors.connectWith = "Choose what you’d like to talk about.";
  if (message.length < 10) errors.message = "Tell us a little about your project, at least 10 characters.";
  return errors;
}

export function ContactForm() {
  const params = useSearchParams();
  const preset = getService(params.get("service") ?? "")?.enquiry;
  const [type, setType] = useState<EnquiryType | "">(preset ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = new FormData(e.currentTarget);
    // Honeypot: real people never see or fill this field.
    if (form.get("company_site")) {
      setStatus("sent");
      return;
    }
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitEnquiry({
        name: String(form.get("name")).trim(),
        email: String(form.get("email")).trim(),
        phone: String(form.get("phone")).replace(/[\s()-]/g, ""),
        message: String(form.get("message")).trim(),
        connectWith: String(form.get("connectWith")),
      });
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-start justify-center gap-6">
        <span className="grid size-14 place-items-center rounded-full bg-teal text-void">
          <Check className="size-7" />
        </span>
        <h2 className="text-h2">Thanks, we’ve got it.</h2>
        <p className="max-w-[40ch] text-lead text-fg-2">
          Your message is with the Snap Infinity team. We’ll reply to the email address you gave us.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="text-teal-glow underline underline-offset-4 hover:text-fg">
          Send another message
        </button>
      </div>
    );
  }

  const describe = (key: keyof Errors) => (errors[key] ? `${key}-error` : undefined);
  const error = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="text-sm text-error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-7" aria-describedby="form-note">
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="name" className="text-[0.95rem] text-fg-2">
            Your name
          </label>
          <input id="name" name="name" autoComplete="name" className={cn(field, "h-13")} aria-invalid={!!errors.name} aria-describedby={describe("name")} />
          {error("name")}
        </div>
        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className="text-[0.95rem] text-fg-2">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className={cn(field, "h-13")} aria-invalid={!!errors.email} aria-describedby={describe("email")} />
          {error("email")}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <label htmlFor="phone" className="text-[0.95rem] text-fg-2">
          Phone or WhatsApp
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 or +971 …" className={cn(field, "h-13")} aria-invalid={!!errors.phone} aria-describedby={describe("phone")} />
        {error("phone")}
      </div>

      <fieldset className="flex flex-col gap-3" aria-describedby={describe("connectWith")}>
        <legend className="mb-3 text-[0.95rem] text-fg-2">What would you like to talk about?</legend>
        <div className="flex flex-wrap gap-2">
          {enquiryTypes.map((t) => (
            <label key={t} className="relative">
              <input type="radio" name="connectWith" value={t} checked={type === t} onChange={() => setType(t)} className="peer sr-only" />
              <span className="flex min-h-11 cursor-pointer items-center rounded-full border border-line-strong px-5 text-[0.95rem] text-fg-2 transition-colors duration-300 hover:border-teal hover:text-fg peer-checked:border-teal peer-checked:bg-teal peer-checked:text-void peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-glow">
                {t}
              </span>
            </label>
          ))}
        </div>
        {error("connectWith")}
      </fieldset>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="message" className="text-[0.95rem] text-fg-2">
          About your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you building, and what would success look like?"
          className={cn(field, "resize-y py-3.5")}
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
        />
        {error("message")}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_site">Leave this empty</label>
        <input id="company_site" name="company_site" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/btn inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-teal px-7 text-lg font-semibold text-void transition-[background,box-shadow] duration-300 hover:bg-teal-glow hover:shadow-[0_0_56px_-12px_rgb(70_227_200/0.75)] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowUpRight className="size-5 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </button>
        <p id="form-note" className="text-sm text-fg-3">
          We only use your details to reply. See our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-fg">
            privacy policy
          </a>
          .
        </p>
      </div>

      <div aria-live="assertive">
        {status === "failed" && (
          <p className="rounded-sm border border-error/40 bg-error/10 px-4 py-3 text-fg">
            Your message couldn’t be sent. Please try again, or email us directly at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
