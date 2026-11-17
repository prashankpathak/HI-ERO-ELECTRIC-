import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CatalogEditorModal } from './components/CatalogEditorModal';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScootersSection } from './components/ScootersSection';
import { ServicesSection } from './components/ServicesSection';
import { TestRideSection } from './components/TestRideSection';
import { DEFAULT_SCOOTERS, SCOOTER_STORAGE_KEY, type ScooterProduct } from './data/scooters';
import { sanitizeScooterCatalog } from './utils/whatsapp';

function loadSavedScooters(): ScooterProduct[] {
  if (typeof window === 'undefined') return DEFAULT_SCOOTERS;
  try {
    const raw = window.localStorage.getItem(SCOOTER_STORAGE_KEY);
    if (!raw) return DEFAULT_SCOOTERS;
    return sanitizeScooterCatalog(JSON.parse(raw), DEFAULT_SCOOTERS);
  } catch {
    return DEFAULT_SCOOTERS;
  }
}

export default function App() {
  const [scooters, setScooters] = useState<ScooterProduct[]>(loadSavedScooters);
  const [selectedTestRideModel, setSelectedTestRideModel] = useState<string>(
    scooters[0]?.modelName ?? '',
  );
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(SCOOTER_STORAGE_KEY, JSON.stringify(scooters));
    } catch {
      // Ignore storage quota errors in restricted browsing modes
    }
  }, [scooters]);

  const handleSelectForTestRide = (modelName: string) => {
    setSelectedTestRideModel(modelName);
    const el = document.getElementById('test-ride');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveCatalog = (updated: ScooterProduct[]) => {
    const cleaned = sanitizeScooterCatalog(updated, DEFAULT_SCOOTERS);
    setScooters(cleaned);
    if (cleaned.length > 0) {
      setSelectedTestRideModel(cleaned[0].modelName);
    }
  };

  const handleResetCatalog = () => {
    setScooters(DEFAULT_SCOOTERS);
    setSelectedTestRideModel(DEFAULT_SCOOTERS[0]?.modelName ?? '');
    try {
      window.localStorage.removeItem(SCOOTER_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0C0E]">
      <Header />

      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ScootersSection
          scooters={scooters}
          onSelectForTestRide={handleSelectForTestRide}
          onOpenEditor={() => setEditorOpen(true)}
        />
        <ServicesSection />
        <GallerySection />
        <TestRideSection scooters={scooters} selectedModel={selectedTestRideModel} />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />

      <CatalogEditorModal
        isOpen={editorOpen}
        scooters={scooters}
        onClose={() => setEditorOpen(false)}
        onSave={handleSaveCatalog}
        onReset={handleResetCatalog}
      />
    </div>
  );
}
