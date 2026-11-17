import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export function FloatingWhatsApp() {
  return (
    <a
      href={buildGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Enquiry with HI ERO ELECTRIC – TRISHNA MOTORS"
      className="fixed bottom-4 right-4 z-40 h-12 w-12 sm:w-auto sm:px-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#5CE61C] text-[#0A0C0E] font-semibold text-sm shadow-lg border border-black/15 hover:bg-[#46C20E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0C0E]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
