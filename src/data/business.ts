export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  whatsappPrompt: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: 'exterior' | 'interior';
  featured?: boolean;
}

export const BUSINESS_INFO = {
  brandName: 'HI ERO ELECTRIC',
  dealershipName: 'TRISHNA MOTORS',
  fullName: 'HI ERO ELECTRIC – TRISHNA MOTORS',
  category: 'Electric Two Wheeler Showroom',
  tagline: 'Powering Your Electric Future.',
  addressLine1: 'Rajul Paradise, Near Tilhari,',
  addressLine2: 'Jabalpur, Madhya Pradesh – 482020, India.',
  fullAddress: 'Rajul Paradise, Near Tilhari, Jabalpur, Madhya Pradesh – 482020, India.',
  phoneDisplay: '+91 93297 05830',
  phoneHref: 'tel:+919329705830',
  whatsappDisplay: '+919329705830',
  whatsappDigits: '919329705830',
  whatsappBaseUrl: 'https://wa.me/919329705830',
  defaultWhatsAppMessage:
    'Hello TRISHNA MOTORS, I am interested in HI ERO ELECTRIC scooters. Please share scooter models, prices and details.',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rajul+Paradise+Near+Tilhari+Jabalpur+Madhya+Pradesh+482020',
} as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'sales',
    number: '01',
    title: 'Electric Scooter Sales',
    description:
      'Explore our full lineup of HI ERO ELECTRIC two-wheelers at our Tilhari showroom with transparent guidance and test rides.',
    whatsappPrompt:
      'Hello TRISHNA MOTORS, I would like details on HI ERO ELECTRIC scooter sales and available models at your Jabalpur showroom.',
  },
  {
    id: 'servicing',
    number: '02',
    title: 'Scooter Servicing',
    description:
      'Routine periodic maintenance, brake and suspension checks, electrical diagnostics, and controller tuning by trained technicians.',
    whatsappPrompt:
      'Hello TRISHNA MOTORS, I would like to book electric scooter servicing at HI ERO ELECTRIC, Tilhari.',
  },
  {
    id: 'battery',
    number: '03',
    title: 'Battery Inspection',
    description:
      'Thorough battery health testing, charger verification, cell balance checks, and range diagnostics for dependable daily rides.',
    whatsappPrompt:
      'Hello TRISHNA MOTORS, I would like to schedule a battery inspection for my electric scooter.',
  },
  {
    id: 'spares',
    number: '04',
    title: 'Genuine Spare Parts',
    description:
      'Authentic replacement parts, chargers, controllers, tyres, and body panels stocked directly at TRISHNA MOTORS.',
    whatsappPrompt:
      'Hello TRISHNA MOTORS, I am looking for genuine HI ERO ELECTRIC spare parts.',
  },
  {
    id: 'support',
    number: '05',
    title: 'Customer Support',
    description:
      'Direct showroom assistance over phone and WhatsApp for warranty queries, test ride scheduling, and post-purchase support.',
    whatsappPrompt:
      'Hello TRISHNA MOTORS, I need customer support regarding HI ERO ELECTRIC two-wheelers.',
  },
];

export const SHOWROOM_GALLERY: GalleryPhoto[] = [
  {
    id: 'exterior-front',
    src: '/assets/showroom/exterior-front.jpg',
    alt: 'HI ERO ELECTRIC – TRISHNA MOTORS showroom exterior at Rajul Paradise, Tilhari, Jabalpur',
    title: 'Showroom Facade & Forecourt',
    caption: 'Main showroom entrance featuring Sales, Service & Spares display at Rajul Paradise, Near Tilhari.',
    category: 'exterior',
    featured: true,
  },
  {
    id: 'interior-lineup',
    src: '/assets/showroom/interior-lineup.jpg',
    alt: 'Electric scooters displayed inside HI ERO ELECTRIC – TRISHNA MOTORS showroom',
    title: 'Indoor Scooter Lineup',
    caption: 'White, silver, and gloss black electric two-wheelers displayed on the main showroom floor.',
    category: 'interior',
  },
  {
    id: 'interior-reception',
    src: '/assets/showroom/interior-reception.jpg',
    alt: 'HI ERO ELECTRIC reception desk and showroom branding wall at TRISHNA MOTORS',
    title: 'Customer Lounge & Branding Wall',
    caption: 'Showroom consultation desk beneath the HI ERO ELECTRIC Powering an Electric Future emblem.',
    category: 'interior',
  },
  {
    id: 'scooters-row',
    src: '/assets/showroom/scooters-row.jpg',
    alt: 'Row of electric scooters in mint, silver, white, and black at TRISHNA MOTORS',
    title: 'Color & Variant Showcase',
    caption: 'Side-by-side lineup of contemporary electric scooter finishes ready for inspection and test rides.',
    category: 'interior',
  },
  {
    id: 'exterior-opening',
    src: '/assets/showroom/exterior-grand-opening.jpg',
    alt: 'TRISHNA MOTORS HI ERO ELECTRIC showroom inauguration celebration in Tilhari, Jabalpur',
    title: 'Showroom Inauguration Display',
    caption: 'Welcome celebration at our Tilhari dealership with customer seating and forecourt models.',
    category: 'exterior',
  },
];
