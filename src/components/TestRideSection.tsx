import { useEffect, useState, type FormEvent } from 'react';
import { Calendar, CheckCircle2, Copy, Check, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import type { ScooterProduct } from '../data/scooters';
import {
  buildTestRideWhatsAppUrl,
  getTodayLocalIso,
  validateTestRideForm,
  type TestRideFormValues,
} from '../utils/whatsapp';
import { ShowroomImage } from './ShowroomImage';

interface TestRideSectionProps {
  scooters: ScooterProduct[];
  selectedModel: string;
}

interface SubmittedBooking {
  customerName: string;
  normalizedPhone: string;
  scooterModel: string;
  preferredDate: string;
  whatsappUrl: string;
}

export function TestRideSection({ scooters, selectedModel }: TestRideSectionProps) {
  const todayIso = getTodayLocalIso();

  const [values, setValues] = useState<TestRideFormValues>({
    customerName: '',
    mobileNumber: '',
    scooterModel: selectedModel || scooters[0]?.modelName || '',
    preferredDate: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TestRideFormValues, string>>>({});
  const [submitted, setSubmitted] = useState<SubmittedBooking | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (selectedModel) {
      setValues((prev) => ({ ...prev, scooterModel: selectedModel }));
      setSubmitted(null);
    }
  }, [selectedModel]);

  useEffect(() => {
    if (!values.scooterModel && scooters[0]?.modelName) {
      setValues((prev) => ({ ...prev, scooterModel: scooters[0].modelName }));
    }
  }, [scooters, values.scooterModel]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateTestRideForm(values, todayIso);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const whatsappUrl = buildTestRideWhatsAppUrl(values, validation.normalizedPhone);
    setSubmitted({
      customerName: values.customerName.trim(),
      normalizedPhone: validation.normalizedPhone,
      scooterModel: values.scooterModel.trim(),
      preferredDate: values.preferredDate.trim(),
      whatsappUrl,
    });
  };

  const handleCopyBookingDetails = async () => {
    if (!submitted) return;
    const text = `Test Ride Request - ${BUSINESS_INFO.fullName}\nName: ${submitted.customerName}\nMobile: +91 ${submitted.normalizedPhone}\nModel: ${submitted.scooterModel}\nPreferred Date: ${submitted.preferredDate}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <section
      id="test-ride"
      className="bg-[#F5F6F7] text-[#0A0C0E] py-16 lg:py-24 border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#16820B] tracking-wide">
                Book Test Ride
              </p>
              <h2 className="mt-2.5 text-balance text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0C0E]">
                Experience {BUSINESS_INFO.brandName} in Tilhari
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Schedule a showroom visit and test ride at {BUSINESS_INFO.dealershipName}. Fill in
                your details and send your booking request straight to our showroom WhatsApp desk.
              </p>
            </div>

            <div className="mt-8 rounded-xl overflow-hidden border border-black/10 bg-[#13161A] aspect-[4/3]">
              <ShowroomImage
                src="/assets/showroom/scooters-row.jpg"
                alt="Electric scooters available for test ride at HI ERO ELECTRIC – TRISHNA MOTORS"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-black/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            {submitted ? (
              <div className="space-y-6" data-testid="test-ride-confirmation">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#16820B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0C0E]">
                      Test Ride Request Prepared
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">
                      Your details are verified. Click below to send this request directly to{' '}
                      {BUSINESS_INFO.dealershipName} on WhatsApp.
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-y border-black/10 text-sm">
                  <div>
                    <dt className="text-xs text-neutral-500">Customer Name</dt>
                    <dd className="mt-1 font-semibold text-[#0A0C0E]">{submitted.customerName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">Mobile Number</dt>
                    <dd className="mt-1 font-semibold font-mono tabular-nums text-[#0A0C0E]">
                      +91 {submitted.normalizedPhone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">Interested Scooter Model</dt>
                    <dd className="mt-1 font-semibold text-[#0A0C0E]">{submitted.scooterModel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">Preferred Visit Date</dt>
                    <dd className="mt-1 font-semibold font-mono tabular-nums text-[#0A0C0E]">
                      {submitted.preferredDate}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={submitted.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold bg-[#5CE61C] text-[#0A0C0E] rounded-md hover:bg-[#46C20E] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send via WhatsApp Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBookingDetails}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#0A0C0E] border border-black/20 rounded-md hover:bg-neutral-50 transition-colors"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-4 h-4 text-[#16820B]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copy Details</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(null)}
                    className="px-4 py-3 text-sm font-medium text-neutral-600 hover:text-[#0A0C0E]"
                  >
                    Edit Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="test-ride-name"
                      className="block text-sm font-semibold text-[#0A0C0E] mb-1.5"
                    >
                      Customer Name
                    </label>
                    <input
                      id="test-ride-name"
                      name="customerName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={values.customerName}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, customerName: e.target.value }));
                        if (errors.customerName) {
                          setErrors((prev) => ({ ...prev, customerName: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.customerName)}
                      aria-describedby={errors.customerName ? 'error-customer-name' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                    />
                    {errors.customerName && (
                      <p
                        id="error-customer-name"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="test-ride-mobile"
                      className="block text-sm font-semibold text-[#0A0C0E] mb-1.5"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="test-ride-mobile"
                      name="mobileNumber"
                      type="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      value={values.mobileNumber}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, mobileNumber: e.target.value }));
                        if (errors.mobileNumber) {
                          setErrors((prev) => ({ ...prev, mobileNumber: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.mobileNumber)}
                      aria-describedby={errors.mobileNumber ? 'error-mobile-number' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                    />
                    {errors.mobileNumber && (
                      <p
                        id="error-mobile-number"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.mobileNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="test-ride-model"
                      className="block text-sm font-semibold text-[#0A0C0E] mb-1.5"
                    >
                      Interested Scooter Model
                    </label>
                    <select
                      id="test-ride-model"
                      name="scooterModel"
                      value={values.scooterModel}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, scooterModel: e.target.value }));
                        if (errors.scooterModel) {
                          setErrors((prev) => ({ ...prev, scooterModel: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.scooterModel)}
                      aria-describedby={errors.scooterModel ? 'error-scooter-model' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                    >
                      {scooters.map((scooter) => (
                        <option key={scooter.id} value={scooter.modelName}>
                          {scooter.modelName}
                        </option>
                      ))}
                      <option value="All Available Showroom Models">
                        All Available Showroom Models
                      </option>
                    </select>
                    {errors.scooterModel && (
                      <p
                        id="error-scooter-model"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.scooterModel}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="test-ride-date"
                      className="block text-sm font-semibold text-[#0A0C0E] mb-1.5"
                    >
                      Preferred Visit Date
                    </label>
                    <div className="relative">
                      <input
                        id="test-ride-date"
                        name="preferredDate"
                        type="date"
                        min={todayIso}
                        value={values.preferredDate}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, preferredDate: e.target.value }));
                          if (errors.preferredDate) {
                            setErrors((prev) => ({ ...prev, preferredDate: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.preferredDate)}
                        aria-describedby={errors.preferredDate ? 'error-preferred-date' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-white border border-black/20 rounded-md focus:outline-none focus:border-[#0A0C0E]"
                      />
                    </div>
                    {errors.preferredDate && (
                      <p
                        id="error-preferred-date"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-700"
                      >
                        {errors.preferredDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#16820B]" aria-hidden="true" />
                    <span>Showroom Visit: Rajul Paradise, Near Tilhari, Jabalpur</span>
                  </p>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold bg-[#5CE61C] text-[#0A0C0E] rounded-md hover:bg-[#46C20E] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0C0E]"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Submit via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
