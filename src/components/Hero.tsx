import { ArrowRight, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ShowroomImage } from './ShowroomImage';

export function Hero() {
  return (
    <section
      id="home"
      className="bg-[#0A0C0E] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#5CE61C] tracking-wide mb-4">
                {BUSINESS_INFO.category} · Tilhari, Jabalpur
              </p>

              <h1 className="text-balance font-bold tracking-tight text-white text-[clamp(2.15rem,4.1vw,3.5rem)] leading-[1.08]">
                Welcome to {BUSINESS_INFO.fullName}
              </h1>

              <p className="mt-4 text-lg sm:text-xl font-medium text-[#5CE61C]">
                {BUSINESS_INFO.tagline}
              </p>

              <p className="mt-5 text-base text-neutral-300 leading-relaxed max-w-xl">
                Visit TRISHNA MOTORS at Rajul Paradise, Near Tilhari, Jabalpur for electric
                two-wheeler sales, periodic servicing, battery inspection, and genuine spare parts.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#test-ride"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold bg-[#5CE61C] text-[#0A0C0E] rounded-md hover:bg-[#46C20E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Book Test Ride</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#scooters"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm sm:text-base font-semibold text-white border border-white/25 rounded-md hover:border-white/60 hover:bg-white/5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5CE61C]"
                >
                  Explore Scooters
                </a>

                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base font-medium text-neutral-200 hover:text-[#5CE61C] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5CE61C]"
                >
                  <MessageCircle className="w-4 h-4 text-[#5CE61C]" aria-hidden="true" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/15 bg-[#13161A] min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
            <ShowroomImage
              src="/assets/showroom/exterior-front.jpg"
              alt="HI ERO ELECTRIC – TRISHNA MOTORS showroom exterior at Rajul Paradise, Tilhari, Jabalpur"
              loading="eager"
              className="w-full h-full lg:absolute lg:inset-0 object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2 text-white">
              <div>
                <p className="text-xs font-medium text-[#5CE61C]">Showroom Exterior</p>
                <p className="text-sm font-semibold">{BUSINESS_INFO.fullName}</p>
              </div>
              <p className="text-xs text-neutral-300 font-mono tabular-nums">
                {BUSINESS_INFO.phoneDisplay}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-neutral-400">Brand</p>
            <p className="mt-1 text-sm font-semibold text-white">{BUSINESS_INFO.brandName}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Authorized Dealership</p>
            <p className="mt-1 text-sm font-semibold text-white">{BUSINESS_INFO.dealershipName}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Showroom Location</p>
            <p className="mt-1 text-sm font-semibold text-white">
              Rajul Paradise, Near Tilhari, Jabalpur
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Sales, Service & Spares</p>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="mt-1 inline-block text-sm font-semibold font-mono tabular-nums text-[#5CE61C] hover:underline"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
