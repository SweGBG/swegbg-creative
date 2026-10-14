"use client";

import { useContact } from "@/components/ContactDialog";

/** Any button that opens the shared contact form. */
export default function ContactButton({ className, children }: { className: string; children: React.ReactNode }) {
  const openContact = useContact();
  return (
    <button type="button" className={className} onClick={() => openContact()}>
      {children}
    </button>
  );
}
