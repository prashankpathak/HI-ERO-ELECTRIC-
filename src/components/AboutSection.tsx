import { MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { ShowroomImage } from './ShowroomImage';

export function AboutSection() {
  return (
    <section id="about" className="bg-white text-[#0A0C0E] py-16 lg:py-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-black/10 bg-[#13161A] min-h-[280px] sm:min-h-[360px]">
            <ShowroomImage
              src="/assets/showroom/interior-reception.jpg"
              alt="Inside HI ERO ELECTRIC – TRISHNA MOTORS showroom showing reception wall and electric scooters"
              className="w-full h-full lg:absolute lg:inset-0 object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-semibold text-[#16820B] tracking-wide">
              About Our Showroom
            </p>

            <h2 className="mt-3 text-balance text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0C0E]">
              {BUSINESS_INFO.dealershipName} — Tilhari’s Destination for {BUSINESS_INFO.brandName}
            </h2>

            <p className="mt-5 text-base text-neutral-600 leading-relaxed">
              Located at Rajul Paradise, Near Tilhari in Jabalpur, Madhya Pradesh,{' '}
              <strong className="font-semibold text-[#0A0C0E]">
                {BUSINESS_INFO.fullName}
              </strong>{' '}
              is a dedicated electric two-wheeler showroom committed to clean, economical, and
              dependable urban mobility.
            </p>

            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              From helping first-time electric riders compare scooter options and take test rides to
              supporting owners with periodic servicing, battery diagnostics, and genuine spare parts,
              every stage of your ownership is handled under one roof.
            </p>

            <div className="mt-8 pt-8 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="w-9 h-9 rounded-md bg-[#0A0C0E] text-[#5CE61C] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-[#0A0C0E]">Dedicated Sales</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Walk-in scooter inspection and guided test rides in Tilhari.
                </p>
              </div>

              <div>
                <div className="w-9 h-9 rounded-md bg-[#0A0C0E] text-[#5CE61C] flex items-center justify-center mb-3">
                  <Wrench className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-[#0A0C0E]">Service & Spares</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  In-house servicing, battery checks, and genuine spare parts.
                </p>
              </div>

              <div>
                <div className="w-9 h-9 rounded-md bg-[#0A0C0E] text-[#5CE61C] flex items-center justify-center mb-3">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-[#0A0C0E]">Tilhari, Jabalpur</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Conveniently situated at Rajul Paradise, PIN 482020.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
