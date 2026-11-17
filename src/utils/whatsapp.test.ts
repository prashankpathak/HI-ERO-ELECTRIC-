import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGeneralWhatsAppUrl,
  buildScooterEnquiryUrl,
  buildTestRideWhatsAppUrl,
  normalizeIndianPhone,
  sanitizeScooterCatalog,
  validateTestRideForm,
} from './whatsapp';
import { DEFAULT_SCOOTERS } from '../data/scooters';

test('normalizeIndianPhone handles valid 10-digit, +91, and 0-prefixed numbers', () => {
  assert.equal(normalizeIndianPhone('93297 05830'), '9329705830');
  assert.equal(normalizeIndianPhone('+91 9329705830'), '9329705830');
  assert.equal(normalizeIndianPhone('09876543210'), '9876543210');
  assert.equal(normalizeIndianPhone('12345'), '');
  assert.equal(normalizeIndianPhone('1234567890'), '');
});

test('buildGeneralWhatsAppUrl targets exact showroom WhatsApp number and HI ERO ELECTRIC spelling', () => {
  const url = buildGeneralWhatsAppUrl();
  assert.ok(url.startsWith('https://wa.me/919329705830?text='));
  const decoded = decodeURIComponent(url.split('text=')[1]);
  assert.ok(decoded.includes('TRISHNA MOTORS'));
  assert.ok(decoded.includes('HI ERO ELECTRIC'));
  assert.ok(!decoded.includes('HERO ELECTRIC'));
});

test('buildScooterEnquiryUrl includes selected scooter model name', () => {
  const url = buildScooterEnquiryUrl('HI ERO City Model');
  const decoded = decodeURIComponent(url.split('text=')[1]);
  assert.ok(decoded.includes('HI ERO City Model'));
  assert.ok(decoded.includes('TRISHNA MOTORS'));
});

test('validateTestRideForm rejects missing or invalid fields and accepts valid input', () => {
  const emptyResult = validateTestRideForm(
    {
      customerName: '',
      mobileNumber: '123',
      scooterModel: '',
      preferredDate: '',
    },
    '2026-11-17',
  );
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.customerName);
  assert.ok(emptyResult.errors.mobileNumber);
  assert.ok(emptyResult.errors.scooterModel);
  assert.ok(emptyResult.errors.preferredDate);

  const pastDateResult = validateTestRideForm(
    {
      customerName: 'Aarav Sharma',
      mobileNumber: '9876543210',
      scooterModel: 'HI ERO Showroom Series 01',
      preferredDate: '2026-11-16',
    },
    '2026-11-17',
  );
  assert.equal(pastDateResult.valid, false);
  assert.ok(pastDateResult.errors.preferredDate);

  const validResult = validateTestRideForm(
    {
      customerName: 'Aarav Sharma',
      mobileNumber: '+91 98765 43210',
      scooterModel: 'HI ERO Showroom Series 01',
      preferredDate: '2026-11-20',
    },
    '2026-11-17',
  );
  assert.equal(validResult.valid, true);
  assert.equal(validResult.normalizedPhone, '9876543210');

  const bookingUrl = buildTestRideWhatsAppUrl(
    {
      customerName: 'Aarav Sharma',
      mobileNumber: '+91 98765 43210',
      scooterModel: 'HI ERO Showroom Series 01',
      preferredDate: '2026-11-20',
    },
    validResult.normalizedPhone,
  );
  const decodedBooking = decodeURIComponent(bookingUrl.split('text=')[1]);
  assert.ok(decodedBooking.includes('Aarav Sharma'));
  assert.ok(decodedBooking.includes('+91 9876543210'));
  assert.ok(decodedBooking.includes('HI ERO Showroom Series 01'));
  assert.ok(decodedBooking.includes('2026-11-20'));
});

test('sanitizeScooterCatalog falls back cleanly on corrupt data and preserves valid items', () => {
  assert.deepEqual(sanitizeScooterCatalog(null, DEFAULT_SCOOTERS), DEFAULT_SCOOTERS);
  assert.deepEqual(sanitizeScooterCatalog([], DEFAULT_SCOOTERS), DEFAULT_SCOOTERS);

  const custom = sanitizeScooterCatalog(
    [
      {
        id: 'custom-1',
        modelName: 'Custom Model X',
        price: '₹85,000',
        range: '100 km',
        battery: '2.5 kWh',
        topSpeed: '55 km/h',
        features: ['LED Headlight', 'Digital Meter'],
        image: '/assets/showroom/interior-lineup.jpg',
        imageAlt: 'Custom Model X photo',
      },
    ],
    DEFAULT_SCOOTERS,
  );
  assert.equal(custom.length, 1);
  assert.equal(custom[0].modelName, 'Custom Model X');
  assert.equal(custom[0].price, '₹85,000');
});
