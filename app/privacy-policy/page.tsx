import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Snap Infinity collects, uses and protects personal information shared through this website.",
  path: "/privacy-policy",
});

// Text carried over from the previous site, lightly edited for clarity.
export default function PrivacyPolicyPage() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated={site.privacyEffectiveDate}>
      <p>
        {site.legalName} (“Snap Infinity”, “we”, “us”) values individual privacy. We want visitors to know what
        information we collect about them and how we treat it.
      </p>
      <p>This Privacy Policy explains:</p>
      <ol>
        <li>Which information about you we collect</li>
        <li>Purposes of using your personal information and legal basis</li>
        <li>Retention of your personal information</li>
        <li>Disclosures of personal information</li>
        <li>Where your personal information is stored and your access rights</li>
        <li>How to contact us</li>
      </ol>

      <h2>1. Information we collect</h2>
      <h3>a) Information collected automatically when you visit our site</h3>
      <p>
        When you browse our website and use our services, Snap Infinity may store cookies. Cookies are small text files
        placed in your browser to store certain preferences and information, which can improve your browsing
        experience, for example by remembering your settings when you return. Snap Infinity does not use cookies to
        track or collect personally identifying information. Your browser settings let you be warned before a cookie is
        stored, block all cookies, or delete cookies from your device.
      </p>
      <h3>b) Information you choose to give us</h3>
      <p>
        You may write to us, or fill out forms or online requests, which provide your name, telephone number, email
        address, job and related information.
      </p>

      <h2>2. How we use your information, and our legal basis</h2>
      <p>Snap Infinity uses the information collected from you to:</p>
      <ul>
        <li>respond to your enquiries;</li>
        <li>consider your request or application;</li>
        <li>send you information about news, events, job openings and related topics you subscribed to; and</li>
        <li>for direct marketing, including newsletters, client alerts and information we think may interest you.</li>
      </ul>
      <p>Snap Infinity may also use such data for market and consumer studies about product types, demographics and consumer preferences.</p>
      <p>We are entitled to use your personal information based on:</p>
      <ul>
        <li>
          our legitimate interests, such as research and development, marketing and promoting our services, and protecting
          our legal rights and interests, to the extent your interests or fundamental rights do not override them;
        </li>
        <li>your consent for a specific purpose; or</li>
        <li>the need to comply with a legal obligation.</li>
      </ul>

      <h2>3. Retention of your personal information</h2>
      <p>
        Snap Infinity keeps your personal information for as long as needed to fulfil the purposes for which it was
        collected, or as needed to comply with our legal obligations, resolve disputes and maintain appropriate business
        records. Once the purpose has been fulfilled, your personal information is retained and blocked for as long as
        legal and governmental requirements apply, until the relevant limitation periods have run out.
      </p>

      <h2>4. Disclosures of personal information</h2>
      <p>Snap Infinity may share your personal information with affiliated companies.</p>
      <p>
        Snap Infinity also reserves the right to disclose information where required by law or to comply with a valid
        legal process (such as a search warrant, subpoena or court order), to protect Snap Infinity’s rights or property,
        including in the event of a transfer of control of Snap Infinity or substantially all of its assets, or in
        emergencies when safety is at risk.
      </p>

      <h2>5. Where your information is stored, and your access rights</h2>
      <h3>Storage</h3>
      <p>All information collected through this website is stored on secured servers to protect it against unauthorised use and access.</p>
      <h3>Your access rights</h3>
      <p>
        You can exercise your rights of access, rectification, erasure, restriction, objection, data portability and
        withdrawal of consent regarding the personal information stored on our servers by emailing {mail}.
      </p>
      <h3>Effective date</h3>
      <p>This privacy notice took effect on {site.privacyEffectiveDate}. It may be updated from time to time.</p>

      <h2>6. Contact us</h2>
      <p>If you have questions or concerns about how your personal data is processed, or about this policy, email us at {mail}.</p>
    </LegalPage>
  );
}
