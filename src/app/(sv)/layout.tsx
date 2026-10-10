import RootShell, { buildMetadata } from "@/components/RootShell";

export { viewport } from "@/components/RootShell";
export const metadata = buildMetadata("sv");

export default function SvLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="sv">{children}</RootShell>;
}
