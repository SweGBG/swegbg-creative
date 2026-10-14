import HomePage from "@/components/HomePage";
import { HomeJsonLd } from "@/components/JsonLd";

export default function Page() {
  return (
    <>
      <HomeJsonLd lang="sv" />
      <HomePage />
    </>
  );
}
