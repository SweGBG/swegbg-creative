import LandingPage, { landingMetadata } from "@/components/landing/LandingPage";
import { landings } from "@/lib/landing";

// One page per search intent (see lib/landing.ts). Unknown slugs give a 404.
export const dynamicParams = false;
export const generateStaticParams = () => landings.map((l) => ({ slug: l.sv.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return landingMetadata("sv", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <LandingPage lang="sv" slug={(await params).slug} />;
}
