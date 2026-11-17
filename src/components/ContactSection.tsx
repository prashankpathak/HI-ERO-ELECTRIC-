import { MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ShowroomImage } from './ShowroomImage';

export function ContactSection() {
  return (
    <section id="contact" className="bg-white text-[#0A0C0E] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#16820B] tracking-wide">
                Contact Us
              </p>
              <h2 className="mt-2.5 text-balance text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0C0E]">
                Visit {BUSINESS_INFO.dealershipName}
              </h2>
              <p className="mt-1 text-lg font-semibold text-neutral-700">
                {BUSINESS_INFO.brandName}
              </p>

              <div className="mt-8 space-y-6 border-t border-black/10 pt-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-md bg-[#0A0C0E] text-[#5CE61C] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500">Showroom Address</p>
                    <address className="not-italic mt-1 text-base font-medium text-[#0A0C0E] leading-relaxed">
                      {BUSINESS_INFO.addressLine1}
                      <br />
                      Jabalpur, Madhya Pradesh 482020, India.
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-md bg-[#0A0C0E] text-[#5CE61C] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500">Phone</p>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="mt-1 inline-block text-base font-bold font-mono tabular-nums text-[#0A0C0E] hover:text-[#16820B] transition-colors"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-md bg-[#0A0C0E] text-[#5CE61C] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500">WhatsApp</p>
                    <a
                      href={buildGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-base font-bold font-mono tabular-nums text-[#0A0C0E] hover:text-[#16820B] transition-colors"
                    >
                      {BUSINESS_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#0A0C0E] text-white rounded-md hover:bg-neutral-800 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#5CE61C]" aria-hidden="true" />
                <span>Call Now</span>
              </a>

              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#5CE61C] text-[#0A0C0E] rounded-md hover:bg-[#46C20E] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0C0E] border border-black/20 rounded-md hover:bg-neutral-100 transition-colors whitespace-nowrap"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-xl overflow-hidden border border-black/10 bg-[#0A0C0E] text-white flex flex-col justify-between">
            <div className="relative flex-1 min-h-[260px]">
              <ShowroomImage
                src="/assets/showroom/exterior-grand-opening.jpg"
                alt="HI ERO ELECTRIC – TRISHNA MOTORS location at Rajul Paradise, Near Tilhari, Jabalpur"
                className="w-full h-full lg:absolute lg:inset-0 object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-semibold text-[#5CE61C]">Google Maps Directions</p>
                <p className="mt-1 text-lg font-bold text-white">{BUSINESS_INFO.fullName}</p>
                <p className="mt-1 text-sm text-neutral-300">
                  Rajul Paradise, Near Tilhari, Jabalpur, Madhya Pradesh 482020
                </p>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold bg-[#5CE61C] text-[#0A0C0E] rounded-md hover:bg-[#46C20E] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
