import { Check, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import type { ScooterProduct } from '../data/scooters';
import { buildScooterEnquiryUrl } from '../utils/whatsapp';
import { ShowroomImage } from './ShowroomImage';

interface ScootersSectionProps {
  scooters: ScooterProduct[];
  onSelectForTestRide: (modelName: string) => void;
  onOpenEditor: () => void;
}

export function ScootersSection({
  scooters,
  onSelectForTestRide,
  onOpenEditor,
}: ScootersSectionProps) {
  return (
    <section
      id="scooters"
      className="bg-[#F5F6F7] text-[#0A0C0E] py-16 lg:py-24 border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#16820B] tracking-wide">
              Electric Scooters · {BUSINESS_INFO.brandName}
            </p>
            <h2 className="mt-2.5 text-balance text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0C0E]">
              Showroom Lineup at {BUSINESS_INFO.dealershipName}
            </h2>
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Browse models available at our Tilhari, Jabalpur showroom. Request exact on-road
              pricing, range, and battery options directly on WhatsApp or customize this catalog.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0A0C0E] bg-white border border-black/15 rounded-md hover:border-black/40 transition-colors whitespace-nowrap shrink-0 self-start md:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0C0E]"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span>Edit Scooter Catalog</span>
          </button>
        </div>

        <div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          data-testid="scooter-catalog-grid"
        >
          {scooters.map((scooter) => (
            <article
              key={scooter.id}
              data-testid="scooter-card"
              className="bg-white rounded-xl border border-black/10 overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
            >
              <div className="aspect-[4/3] w-full bg-[#13161A] overflow-hidden relative">
                <ShowroomImage
                  src={scooter.image}
                  alt={scooter.imageAlt}
                  fallbackTitle={scooter.modelName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-xl font-bold tracking-tight text-[#0A0C0E]">
                      {scooter.modelName}
                    </h3>
                    <p className="text-base font-semibold font-mono tabular-nums text-[#16820B]">
                      {scooter.price}
                    </p>
                  </div>

                  <dl className="mt-5 grid grid-cols-3 gap-3 py-4 border-y border-black/10 text-left">
                    <div>
                      <dt className="text-xs text-neutral-500">Range</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#0A0C0E] tabular-nums">
                        {scooter.range}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-neutral-500">Battery</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#0A0C0E] tabular-nums">
                        {scooter.battery}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-neutral-500">Top Speed</dt>
                      <dd className="mt-1 text-sm font-semibold text-[#0A0C0E] tabular-nums">
                        {scooter.topSpeed}
                      </dd>
                    </div>
                  </dl>

                  {scooter.features.length > 0 && (
                    <ul className="mt-4 space-y-2" aria-label={`Features of ${scooter.modelName}`}>
                      {scooter.features.map((feature, index) => (
                        <li
                          key={`${scooter.id}-feature-${index}`}
                          className="flex items-start gap-2.5 text-sm text-neutral-700"
                        >
                          <Check
                            className="w-4 h-4 text-[#16820B] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 pt-5 border-t border-black/10 flex flex-wrap items-center gap-3">
                  <a
                    href={buildScooterEnquiryUrl(scooter.modelName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#5CE61C] text-[#0A0C0E] rounded-md hover:bg-[#46C20E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0C0E]"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onSelectForTestRide(scooter.modelName)}
                    className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-[#0A0C0E] border border-black/20 rounded-md hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0C0E]"
                  >
                    Book Test Ride
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
