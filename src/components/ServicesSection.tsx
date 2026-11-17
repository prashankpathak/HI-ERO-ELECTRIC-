import { ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ShowroomImage } from './ShowroomImage';

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#0A0C0E] text-white py-16 lg:py-24 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#5CE61C] tracking-wide">
                Our Services
              </p>
              <h2 className="mt-2.5 text-balance text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Complete Electric Two-Wheeler Care at {BUSINESS_INFO.dealershipName}
              </h2>
              <p className="mt-4 text-base text-neutral-300 leading-relaxed">
                From selecting your new {BUSINESS_INFO.brandName} scooter to scheduled servicing,
                battery health diagnostics, and authentic replacement spares, our Tilhari workshop
                keeps you moving reliably.
              </p>
            </div>

            <div className="mt-8 rounded-xl overflow-hidden border border-white/15 bg-[#13161A] aspect-[4/3]">
              <ShowroomImage
                src="/assets/showroom/interior-lineup.jpg"
                alt="HI ERO ELECTRIC scooters inside TRISHNA MOTORS service and sales showroom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="py-6 first:pt-5 last:pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="max-w-xl">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-mono font-semibold tabular-nums text-[#5CE61C]">
                      {service.number}.
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-neutral-300 leading-relaxed pl-8">
                    {service.description}
                  </p>
                </div>

                <a
                  href={buildWhatsAppUrl(service.whatsappPrompt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enquire about ${service.title} on WhatsApp`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white border border-white/20 rounded-md hover:border-[#5CE61C] hover:text-[#5CE61C] transition-colors whitespace-nowrap shrink-0 self-start sm:self-center ml-8 sm:ml-0"
                >
                  <span>Enquire</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
