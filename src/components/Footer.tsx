import { BUSINESS_INFO, SERVICES } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { BrandMark } from './BrandMark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0C0E] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-white">
              <BrandMark className="w-6 h-6 text-white shrink-0" />
              <span>{BUSINESS_INFO.fullName}</span>
            </div>
            <p className="text-sm text-[#5CE61C] font-medium">{BUSINESS_INFO.tagline}</p>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-md">
              {BUSINESS_INFO.category} — Electric Scooter Sales, Service and Spare Parts.
            </p>
            <address className="not-italic text-sm text-neutral-400 leading-relaxed">
              {BUSINESS_INFO.addressLine1}
              <br />
              {BUSINESS_INFO.addressLine2}
            </address>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              <li>
                <a href="#home" className="hover:text-[#5CE61C] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#5CE61C] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#scooters" className="hover:text-[#5CE61C] transition-colors">
                  Electric Scooters
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#5CE61C] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#test-ride" className="hover:text-[#5CE61C] transition-colors">
                  Book Test Ride
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#5CE61C] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="hover:text-[#5CE61C] transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">Direct Contact</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="text-xs text-neutral-500">Mobile</p>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="font-mono tabular-nums text-neutral-200 hover:text-[#5CE61C] transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs text-neutral-500">WhatsApp</p>
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono tabular-nums text-neutral-200 hover:text-[#5CE61C] transition-colors"
                >
                  {BUSINESS_INFO.whatsappDisplay}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#5CE61C] hover:underline"
                >
                  Get Google Maps Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {currentYear} {BUSINESS_INFO.fullName}. All rights reserved.
          </p>
          <p>Rajul Paradise, Near Tilhari, Jabalpur, MP – 482020</p>
        </div>
      </div>
    </footer>
  );
}
