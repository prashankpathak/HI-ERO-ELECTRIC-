import { useEffect, useState } from 'react';
import { Check, Copy, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { SHOWROOM_GALLERY } from '../data/business';
import type { ScooterProduct } from '../data/scooters';

interface CatalogEditorModalProps {
  isOpen: boolean;
  scooters: ScooterProduct[];
  onClose: () => void;
  onSave: (updated: ScooterProduct[]) => void;
  onReset: () => void;
}

export function CatalogEditorModal({
  isOpen,
  scooters,
  onClose,
  onSave,
  onReset,
}: CatalogEditorModalProps) {
  const [drafts, setDrafts] = useState<ScooterProduct[]>(scooters);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDrafts(scooters.map((item) => ({ ...item, features: [...item.features] })));
      setCopied(false);
    }
  }, [isOpen, scooters]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (index: number, field: keyof ScooterProduct, value: string | string[]) => {
    setDrafts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleAddScooter = () => {
    const nextNum = drafts.length + 1;
    setDrafts((prev) => [
      ...prev,
      {
        id: `showroom-slot-${Date.now()}`,
        modelName: `HI ERO Showroom Series 0${nextNum}`,
        price: 'Enquire for Price',
        range: 'Showroom Spec',
        battery: 'Configurable Pack',
        topSpeed: 'Showroom Spec',
        features: ['LED Headlamp', 'Available for Test Ride'],
        image: SHOWROOM_GALLERY[0].src,
        imageAlt: `HI ERO ELECTRIC scooter model at TRISHNA MOTORS`,
      },
    ]);
  };

  const handleRemoveScooter = (index: number) => {
    if (drafts.length <= 1) return;
    setDrafts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(drafts, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSaveChanges = () => {
    onSave(drafts);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-editor-title"
    >
      <div className="bg-white text-[#0A0C0E] rounded-xl border border-black/15 w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between gap-4">
          <div>
            <h2 id="catalog-editor-title" className="text-lg font-bold tracking-tight">
              Edit Scooter Catalog
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5">
              Update Model Name, Price, Range, Battery, Top Speed, and Features. Changes save
              locally in your browser.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close catalog editor"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100 hover:text-[#0A0C0E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {drafts.map((item, index) => (
            <div
              key={item.id}
              className="p-5 rounded-lg border border-black/10 bg-[#F9FAFB] space-y-4"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-[#0A0C0E]">Scooter #{index + 1}</p>
                {drafts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveScooter(index)}
                    aria-label={`Remove ${item.modelName}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 hover:text-red-900 px-2.5 py-1.5 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor={`model-name-${index}`}
                    className="block text-xs font-medium text-neutral-700 mb-1"
                  >
                    Model Name
                  </label>
                  <input
                    id={`model-name-${index}`}
                    type="text"
                    value={item.modelName}
                    onChange={(e) => updateField(index, 'modelName', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`model-price-${index}`}
                    className="block text-xs font-medium text-neutral-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    id={`model-price-${index}`}
                    type="text"
                    value={item.price}
                    onChange={(e) => updateField(index, 'price', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`model-range-${index}`}
                    className="block text-xs font-medium text-neutral-700 mb-1"
                  >
                    Range
                  </label>
                  <input
                    id={`model-range-${index}`}
                    type="text"
                    value={item.range}
                    onChange={(e) => updateField(index, 'range', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`model-battery-${index}`}
                    className="block text-xs font-medium text-neutral-700 mb-1"
                  >
                    Battery
                  </label>
                  <input
                    id={`model-battery-${index}`}
                    type="text"
                    value={item.battery}
                    onChange={(e) => updateField(index, 'battery', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`model-speed-${index}`}
                    className="block text-xs font-medium text-neutral-700 mb-1"
                  >
                    Top Speed
                  </label>
                  <input
                    id={`model-speed-${index}`}
                    type="text"
                    value={item.topSpeed}
                    onChange={(e) => updateField(index, 'topSpeed', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`model-image-${index}`}
                    className="block text-xs font-medium text-neutral-700 mb-1"
                  >
                    Showroom Photo
                  </label>
                  <select
                    id={`model-image-${index}`}
                    value={item.image}
                    onChange={(e) => updateField(index, 'image', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                  >
                    {SHOWROOM_GALLERY.map((photo) => (
                      <option key={photo.id} value={photo.src}>
                        {photo.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`model-features-${index}`}
                  className="block text-xs font-medium text-neutral-700 mb-1"
                >
                  Features (comma-separated)
                </label>
                <input
                  id={`model-features-${index}`}
                  type="text"
                  value={item.features.join(', ')}
                  onChange={(e) =>
                    updateField(
                      index,
                      'features',
                      e.target.value
                        .split(',')
                        .map((part) => part.trim())
                        .filter(Boolean),
                    )
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddScooter}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0A0C0E] border border-dashed border-black/30 rounded-md hover:border-black/60 hover:bg-neutral-50 transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Another Scooter Model</span>
          </button>
        </div>

        <div className="px-6 py-4 border-t border-black/10 bg-[#F9FAFB] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-700 border border-black/15 rounded-md hover:bg-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Default</span>
            </button>

            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-700 border border-black/15 rounded-md hover:bg-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#16820B]" aria-hidden="true" />
                  <span>Copied JSON</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-[#0A0C0E]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="px-5 py-2 text-sm font-semibold bg-[#5CE61C] text-[#0A0C0E] rounded-md hover:bg-[#46C20E] transition-colors"
            >
              Save Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
