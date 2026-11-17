export interface ScooterProduct {
  id: string;
  modelName: string;
  price: string;
  range: string;
  battery: string;
  topSpeed: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export const SCOOTER_STORAGE_KEY = 'hiero_trishna_scooters_v1';

/**
 * Easy-to-edit Showroom Scooter Catalog.
 * Update Model Name, Price, Range, Battery, Top Speed, and Features below,
 * or edit them directly in the website's "Edit Scooter Catalog" panel.
 */
export const DEFAULT_SCOOTERS: ScooterProduct[] = [
  {
    id: 'showroom-slot-1',
    modelName: 'HI ERO Showroom Series 01',
    price: 'Enquire for Price',
    range: 'Showroom Spec',
    battery: 'Configurable Pack',
    topSpeed: 'Showroom Spec',
    features: [
      'Gloss & Metallic Finishes',
      'LED Headlamp & Indicators',
      'Available for Test Ride',
    ],
    image: '/assets/showroom/interior-lineup.jpg',
    imageAlt: 'Electric scooters lined up inside HI ERO ELECTRIC – TRISHNA MOTORS showroom',
  },
  {
    id: 'showroom-slot-2',
    modelName: 'HI ERO Showroom Series 02',
    price: 'Enquire for Price',
    range: 'Showroom Spec',
    battery: 'Configurable Pack',
    topSpeed: 'Showroom Spec',
    features: [
      'Digital Instrument Display',
      'Front Disc Brake Setup',
      'City Commute Ergonomics',
    ],
    image: '/assets/showroom/scooters-row.jpg',
    imageAlt: 'Contemporary electric scooter variants at TRISHNA MOTORS Jabalpur',
  },
  {
    id: 'showroom-slot-3',
    modelName: 'HI ERO Showroom Series 03',
    price: 'Enquire for Price',
    range: 'Showroom Spec',
    battery: 'Configurable Pack',
    topSpeed: 'Showroom Spec',
    features: [
      'Sporty Dual-Tone Styling',
      'Alloy Wheels & Tubeless Tyres',
      'Dedicated Service Support',
    ],
    image: '/assets/showroom/interior-reception.jpg',
    imageAlt: 'Sporty electric scooters beside reception desk at HI ERO ELECTRIC – TRISHNA MOTORS',
  },
  {
    id: 'showroom-slot-4',
    modelName: 'HI ERO Showroom Series 04',
    price: 'Enquire for Price',
    range: 'Showroom Spec',
    battery: 'Configurable Pack',
    topSpeed: 'Showroom Spec',
    features: [
      'Spacious Floorboard & Storage',
      'Low Running & Maintenance Cost',
      'Genuine Spare Parts Support',
    ],
    image: '/assets/showroom/exterior-front.jpg',
    imageAlt: 'Electric scooters displayed outside TRISHNA MOTORS showroom in Tilhari, Jabalpur',
  },
];
