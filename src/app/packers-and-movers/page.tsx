'use client'
import DateInput from '@/components/DateInput'
import GMap from '@/components/map';
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

// Add the missing LocationField type
type LocationField = {
  address: string;
  lat: number;
  lng: number;
  district?: string;
};

type FormData = {
  fromAddress: string;
  fromLat: number;
  fromLng: number;
  fromDistrict?: string;
  toAddress: string;
  toLat: number;
  toLng: number;
  toDistrict?: string;
  dateTime: string;
  description: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  shiftingThings: string;
};

const Page: React.FC = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, control, reset, getValues, setValue } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMap, setShowMap] = useState<'from' | 'to' | null>(null);
  const [fromLocation, setFromLocation] = useState<LocationField | null>(null);
  const [toLocation, setToLocation] = useState<LocationField | null>(null);
  
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    // Validate that locations are selected
    if (!fromLocation || !toLocation) {
      alert("Please select both pickup and drop-off locations using the map.");
      setLoading(false);
      return;
    }

    const payload = {
      ...data,
      targetTab: "PackersAndMoversRequests",
    };

    try {
      // Send to Google Sheet
      const sheetPromise = fetch(`${process.env.NEXT_PUBLIC_SHEET_SCRIPT_LINK}`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Send to Google Sheet2
      const sheetPromise2 = fetch(`${process.env.NEXT_PUBLIC_SHEET_SCRIPT_LINK2}`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Send to DB endpoint
      const dbPromise = fetch("/api/packers-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      // Wait for both requests to finish
      await Promise.all([sheetPromise, dbPromise, sheetPromise2]);

      setSubmitted(true);
      reset();
      setFromLocation(null);
      setToLocation(null);

      setTimeout(() => {
        router.push('/order-placed');
      }, 2000);

    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleMapLocationSelect = (locationData: LocationField) => {
    if (showMap === 'from') {
      setFromLocation(locationData);
      // Use setValue instead of reset for better form management
      setValue('fromAddress', locationData.address);
      setValue('fromLat', locationData.lat);
      setValue('fromLng', locationData.lng);
      setValue('fromDistrict', locationData.district);
    } else if (showMap === 'to') {
      setToLocation(locationData);
      // Use setValue instead of reset for better form management
      setValue('toAddress', locationData.address);
      setValue('toLat', locationData.lat);
      setValue('toLng', locationData.lng);
      setValue('toDistrict', locationData.district);
    }
    setShowMap(null);
  };

  return (
    <div className="min-h-screen bg-amber-100 px-4 sm:px-6 lg:px-8">
      <div className='flex justify-between items-center max-w-4xl mx-auto py-4'>
        <Link href="/" className="flex gap-1 text-amber-600 bg-amber-50 rounded hover:bg-amber-600 hover:text-amber-50 border px-2 py-2 mb-4">
          <span>
            <ArrowLeft />
          </span>
          Home
        </Link>
        <Link href="/goods-transport" className="flex gap-1 text-amber-600 bg-amber-50 rounded hover:bg-amber-600 hover:text-amber-50 border px-2 py-2 mb-4">
          Goods Transport
          <span>
            <ArrowRight />
          </span>
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-amber-600 mb-6 text-center">Packers and Movers</h1>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            ✅ Your request has been submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-amber-700">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name <span className="required">*</span></label>
                <input {...register("fullName", { required: "Full name is required" })} className="input" placeholder="Your full name" />
                {errors.fullName && <p className="error">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="label">Phone Number <span className="required">*</span></label>
                <input type="tel" {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Phone number is required"
                  },
                  maxLength: {
                    value: 10,
                    message: "maximum 10 characters allowed"
                  }
                })} className="input" placeholder="e.g. 234 567 8920" />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Email <span className="text-sm text-gray-400">(optional)</span></label>
                <input type="email" {...register("email")} className="input" placeholder="you@example.com" />
              </div>
            </div>
          </div>

          {/* Route Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-amber-700">Route Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">From <span className="required">*</span></label>
                <div className="flex gap-2">
                  <input
                    {...register("fromAddress", { required: "Pickup address is required" })}
                    className="input"
                    placeholder="Pickup location"
                    value={fromLocation?.address || ""}
                    readOnly
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => setShowMap('from')}
                  >
                    Pick on Map
                  </button>
                </div>
                {errors.fromAddress && <p className="error">{errors.fromAddress.message}</p>}
                
                {/* Hidden fields for lat/lng */}
                <input type="hidden" {...register("fromLat", { required: true })} />
                <input type="hidden" {...register("fromLng", { required: true })} />
                <input type="hidden" {...register("fromDistrict")} />
              </div>
              
              <div>
                <label className="label">To <span className="required">*</span></label>
                <div className="flex gap-2">
                  <input
                    {...register("toAddress", { required: "Drop-off address is required" })}
                    className="input"
                    placeholder="Drop-off location"
                    value={toLocation?.address || ""}
                    readOnly
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => setShowMap('to')}
                  >
                    Pick on Map
                  </button>
                </div>
                {errors.toAddress && <p className="error">{errors.toAddress.message}</p>}
                
                {/* Hidden fields for lat/lng */}
                <input type="hidden" {...register("toLat", { required: true })} />
                <input type="hidden" {...register("toLng", { required: true })} />
                <input type="hidden" {...register("toDistrict")} />
              </div>
              
              <div className="md:col-span-2">
                <label className="label">Shifting Date <span className="required">*</span></label>
                <DateInput control={control} name="dateTime" />
                {errors.dateTime && <p className="error">{errors.dateTime.message}</p>}
              </div>
            </div>
          </div>

          {/* Packer Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-amber-700">Package Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Shifting Things <span className="required">*</span></label>
                <textarea {...register("shiftingThings", { required: "Shifting things is required" })} className="input" placeholder="Mention your things" />
                {errors.shiftingThings && <p className="error">{errors.shiftingThings.message}</p>}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-amber-600 text-white px-6 py-2 rounded-md transition-all duration-200 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-700"}`}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>

        {showMap && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl h-[500px] relative">
              <GMap
                onLocationSelect={handleMapLocationSelect}
                onBack={() => setShowMap(null)}
              />
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                onClick={() => setShowMap(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;