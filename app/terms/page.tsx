import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "The terms and conditions that govern use of the Snap Infinity website and its content.",
  path: "/terms",
});

// Text carried over from the previous site, lightly edited for clarity.
export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" path="/terms">
      <p>
        These Terms and Conditions govern the use of the websites located at, or linked to, snapinfinity.com, the services
        that may be offered on them, the information provided on them, the ability to register in our database and
        receive newsletters and promotional emails, and any related links (together, our “Sites”). Please read them
        carefully. By using any of our Sites, you agree to be legally bound by these Terms and Conditions and to follow
        all applicable laws and regulations governing our Sites.
      </p>
      <p>
        These Terms and Conditions supersede any later terms or conditions included with any purchase order, whether or
        not such terms are signed by Snap Infinity (“Snap Infinity”, “we” or “us”). We may change these Terms and
        Conditions at any time, effective immediately when posted on our Sites. If you violate them, we may end your use
        of the Sites, bar you from future use, and/or take appropriate legal action.
      </p>

      <h2>Copyright and trademark notice</h2>
      <p>
        All material on our Sites is copyrighted by Snap Infinity unless otherwise stated. All rights are reserved, and
        content may not be reproduced, downloaded, disseminated or transferred, in any form or by any means, without the
        prior written agreement of Snap Infinity, except as set out below.
      </p>
      <p>
        <strong>Permitted use.</strong> You may download pages or other content for your own personal use on a single
        device, but no part of that content may otherwise be reproduced, downloaded, disseminated or transferred, in any
        form or by any means, without the prior written agreement of, and express attribution to, Snap Infinity. You
        agree that you may only visit, view and keep a copy of pages of the Sites for your own personal use, and that you
        will not duplicate, download, publish, modify or otherwise distribute material on the Sites for any other
        purpose unless we specifically authorise you to. You also agree not to deep-link to the Sites for any purpose
        unless we specifically authorise you to.
      </p>

      <h2>General legal notice and liability disclaimer</h2>
      <p>
        We make our Sites and the information and services on them available “as is”. While Snap Infinity makes every
        effort to present accurate and reliable information, it does not endorse, approve or certify that information,
        nor guarantee its accuracy, completeness, efficacy or timeliness. Use of the information is voluntary, and you
        should rely on it only after an independent review by qualified experts.
      </p>
      <p>Reference to any specific commercial product, process or service does not constitute or imply endorsement, recommendation or favouring by Snap Infinity.</p>
      <p>
        In places, our Sites link to other websites. Those sites contain information created, published, maintained or
        otherwise posted by institutions or organisations independent of Snap Infinity. Snap Infinity does not endorse,
        approve, certify or control those sites and does not guarantee the accuracy, completeness, efficacy or
        timeliness of information on them. Use of information from those sites is voluntary, and you should rely on it
        only after an independent review by qualified experts.
      </p>
      <p>
        Snap Infinity assumes no responsibility for consequences resulting from use of the information on our Sites or
        on linked sites, or for the content of such information. Snap Infinity is not responsible for, and expressly
        disclaims all liability for, damages of any kind arising out of use of, reference to, reliance on, or
        performance of such information.
      </p>

      <h2>Privacy</h2>
      <p>
        Snap Infinity values individual privacy and wants visitors to know what information we collect and how we treat
        it. Read our <Link href="/privacy-policy">Privacy Policy</Link> for details.
      </p>

      <h2>Severability</h2>
      <p>
        If any provision of these Terms and Conditions is invalid or unenforceable, the remaining provisions are not
        affected, and these Terms and Conditions will be read as if the invalid or unenforceable provision had been
        omitted.
      </p>
    </LegalPage>
  );
}
