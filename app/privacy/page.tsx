import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacyPage } from "@/content/conversion";
import { sharedOpenGraphImage } from "@/content/metadata";
import "../editorial.css";
import "../conversion.css";

const page = privacyPage;

export const metadata: Metadata = {
  title: page.fields["SEO title"],
  description: page.fields["Meta description"],
  alternates: { canonical: page.fields.Route },
  openGraph: {
    title: page.fields["Open Graph title"],
    description: page.fields["Meta description"],
    url: page.fields.Route,
    siteName: "Kreative Sparq",
    locale: "en_NG",
    type: "website",
    images: [sharedOpenGraphImage],
  },
};

export default function PrivacyPage() {
  return <LegalPage page={page} />;
}
