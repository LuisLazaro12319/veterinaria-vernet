import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProfessionalSection } from './components/ProfessionalSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingSection } from './components/BookingSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/BrandIcons';
import { CLINIC, sedeTxt, whatsappUrl } from './data/clinicData';
import { useSucursal } from './data/sucursalElegida';

export default function App() {
  const { sucursal } = useSucursal();
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-violet-100 selection:text-violet-900">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <ProfessionalSection />
        <ReviewsSection />
        <BookingSection />
        <LocationSection />
      </main>
      <Footer />

      <a
        href={whatsappUrl(`Hola! Quisiera hacer una consulta en ${CLINIC.name}${sedeTxt(sucursal)}.`, sucursal.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:scale-105 transition-all"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
