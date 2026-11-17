import { BUSINESS_INFO } from '../data/business';
import type { ScooterProduct } from '../data/scooters';

export interface TestRideFormValues {
  customerName: string;
  mobileNumber: string;
  scooterModel: string;
  preferredDate: string;
}

export interface TestRideValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof TestRideFormValues, string>>;
  normalizedPhone: string;
}

/**
 * Strips spaces/dashes and validates an Indian 10-digit mobile number
 * (optionally prefixed with +91 or 0). Returns the 10-digit number or ''.
 */
export function normalizeIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return digits;
  }
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]\d{9}$/.test(digits.slice(2))) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0') && /^[6-9]\d{9}$/.test(digits.slice(1))) {
    return digits.slice(1);
  }
  return '';
}

export function buildWhatsAppUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(BUSINESS_INFO.defaultWhatsAppMessage);
}

export function buildScooterEnquiryUrl(modelName: string): string {
  const cleanName = modelName.trim() || 'HI ERO ELECTRIC scooters';
  const message = `Hello TRISHNA MOTORS, I am interested in ${cleanName} (${BUSINESS_INFO.brandName}). Please share price, range, battery details, and availability.`;
  return buildWhatsAppUrl(message);
}

export function buildTestRideWhatsAppUrl(values: TestRideFormValues, normalizedPhone?: string): string {
  const phone = normalizedPhone || normalizeIndianPhone(values.mobileNumber) || values.mobileNumber.trim();
  const message = [
    `Hello ${BUSINESS_INFO.dealershipName} (${BUSINESS_INFO.brandName}),`,
    `I would like to book a Test Ride at your Tilhari, Jabalpur showroom.`,
    `Customer Name: ${values.customerName.trim()}`,
    `Mobile Number: +91 ${phone}`,
    `Interested Model: ${values.scooterModel.trim()}`,
    `Preferred Visit Date: ${values.preferredDate.trim()}`,
  ].join('\n');
  return buildWhatsAppUrl(message);
}

export function getTodayLocalIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function validateTestRideForm(
  values: TestRideFormValues,
  todayIso: string = getTodayLocalIso(),
): TestRideValidationResult {
  const errors: Partial<Record<keyof TestRideFormValues, string>> = {};

  if (values.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name (at least 2 characters).';
  }

  const normalizedPhone = normalizeIndianPhone(values.mobileNumber);
  if (!normalizedPhone) {
    errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number.';
  }

  if (!values.scooterModel.trim()) {
    errors.scooterModel = 'Please select an electric scooter model.';
  }

  if (!values.preferredDate.trim()) {
    errors.preferredDate = 'Please choose your preferred visit date.';
  } else if (values.preferredDate < todayIso) {
    errors.preferredDate = 'Preferred visit date cannot be in the past.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone,
  };
}

export function sanitizeScooterCatalog(
  rawList: unknown,
  fallback: ScooterProduct[],
): ScooterProduct[] {
  if (!Array.isArray(rawList) || rawList.length === 0) {
    return fallback;
  }

  const cleaned: ScooterProduct[] = [];
  for (const item of rawList) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Partial<ScooterProduct>;
    if (!record.id || !record.modelName || typeof record.modelName !== 'string') continue;

    cleaned.push({
      id: String(record.id),
      modelName: record.modelName.trim() || 'HI ERO ELECTRIC Scooter',
      price: typeof record.price === 'string' && record.price.trim() ? record.price.trim() : 'Enquire for Price',
      range: typeof record.range === 'string' && record.range.trim() ? record.range.trim() : 'Showroom Spec',
      battery: typeof record.battery === 'string' && record.battery.trim() ? record.battery.trim() : 'Showroom Spec',
      topSpeed: typeof record.topSpeed === 'string' && record.topSpeed.trim() ? record.topSpeed.trim() : 'Showroom Spec',
      features: Array.isArray(record.features)
        ? record.features.map((f) => String(f).trim()).filter(Boolean)
        : [],
      image:
        typeof record.image === 'string' && record.image.startsWith('/')
          ? record.image
          : '/assets/showroom/interior-lineup.jpg',
      imageAlt:
        typeof record.imageAlt === 'string' && record.imageAlt.trim()
          ? record.imageAlt.trim()
          : `${record.modelName} at HI ERO ELECTRIC – TRISHNA MOTORS`,
    });
  }

  return cleaned.length > 0 ? cleaned : fallback;
}
