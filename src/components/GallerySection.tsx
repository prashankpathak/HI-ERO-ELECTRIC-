import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { BUSINESS_INFO, SHOWROOM_GALLERY, type GalleryPhoto } from '../data/business';
import { ShowroomImage } from './ShowroomImage';

type GalleryFilter = 'all' | 'exterior' | 'interior';

export function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredPhotos: GalleryPhoto[] =
    filter === 'all'
      ? SHOWROOM_GALLERY
      : SHOWROOM_GALLERY.filter((photo) => photo.category === filter);

  const activePhoto = activeIndex !== null ? filteredPhotos[activeIndex] ?? null : null;

  useEffect(() => {
    setActiveIndex(null);
  }, [filter]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length,
        );
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length,
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, filteredPhotos.length]);

  return (
    <section id="gallery" className="bg-white text-[#0A0C0E] py-16 lg:py-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#16820B] tracking-wide">
              Showroom Gallery · {BUSINESS_INFO.fullName}
            </p>
            <h2 className="mt-2.5 text-balance text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0C0E]">
              Inside Our Tilhari, Jabalpur Showroom
            </h2>
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Original photographs from {BUSINESS_INFO.fullName}. Click any photograph to inspect
              our showroom exterior, customer lounge, and electric scooter display in full view.
            </p>
          </div>

          <div
            className="inline-flex items-center gap-1 p-1 bg-[#F5F6F7] rounded-lg border border-black/10 self-start md:self-auto"
            role="group"
            aria-label="Filter showroom photographs"
          >
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-[#0A0C0E] text-white'
                  : 'text-neutral-700 hover:text-[#0A0C0E]'
              }`}
            >
              All Photos
            </button>
            <button
              type="button"
              onClick={() => setFilter('exterior')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'exterior'
                  ? 'bg-[#0A0C0E] text-white'
                  : 'text-neutral-700 hover:text-[#0A0C0E]'
              }`}
            >
              Exterior
            </button>
            <button
              type="button"
              onClick={() => setFilter('interior')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'interior'
                  ? 'bg-[#0A0C0E] text-white'
                  : 'text-neutral-700 hover:text-[#0A0C0E]'
              }`}
            >
              Interior & Scooters
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${photo.title} in lightbox`}
              className={`group text-left rounded-xl overflow-hidden border border-black/10 bg-[#13161A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0C0E] ${
                filter === 'all' && photo.featured ? 'md:col-span-2' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  filter === 'all' && photo.featured
                    ? 'aspect-[16/9] md:aspect-[2/1]'
                    : 'aspect-[4/3]'
                }`}
              >
                <ShowroomImage
                  src={photo.src}
                  alt={photo.alt}
                  fallbackTitle={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute top-3 right-3 w-9 h-9 rounded-md bg-black/60 text-white flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:bg-[#5CE61C] group-hover:text-[#0A0C0E] transition-colors">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-base font-bold leading-snug">{photo.title}</p>
                  <p className="mt-1 text-xs text-neutral-300 line-clamp-2">{photo.caption}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#060708]/[0.98] backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox preview: ${activePhoto.title}`}
        >
          <div className="flex items-center justify-between gap-4 text-white max-w-6xl w-full mx-auto">
            <div>
              <p className="text-xs text-[#5CE61C] font-mono tabular-nums">
                {activeIndex + 1} / {filteredPhotos.length}
              </p>
              <h3 className="text-base sm:text-lg font-bold">{activePhoto.title}</h3>
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close photo lightbox"
              className="w-11 h-11 rounded-md bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-4 min-h-0">
            <button
              type="button"
              onClick={() =>
                setActiveIndex(
                  (activeIndex - 1 + filteredPhotos.length) % filteredPhotos.length,
                )
              }
              aria-label="Previous showroom photograph"
              className="absolute left-0 sm:left-2 z-10 w-11 h-11 rounded-md bg-black/70 hover:bg-[#5CE61C] text-white hover:text-[#0A0C0E] border border-white/20 inline-flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="max-h-full max-w-full flex items-center justify-center px-12 sm:px-16">
              <ShowroomImage
                src={activePhoto.src}
                alt={activePhoto.alt}
                fallbackTitle={activePhoto.title}
                loading="eager"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg border border-white/15"
              />
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex((activeIndex + 1) % filteredPhotos.length)}
              aria-label="Next showroom photograph"
              className="absolute right-0 sm:right-2 z-10 w-11 h-11 rounded-md bg-black/70 hover:bg-[#5CE61C] text-white hover:text-[#0A0C0E] border border-white/20 inline-flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-sm text-neutral-300 max-w-2xl mx-auto">
            {activePhoto.caption}
          </p>
        </div>
      )}
    </section>
  );
}
