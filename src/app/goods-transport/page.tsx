'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler, UseFormSetValue } from 'react-hook-form'
import DateInput from '@/components/DateInput';
import GMap from '@/components/map';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal';
// Add the missing LocationField type
type LocationField = {
  address: string;
  lat: number;
  lng: number;
  district?: string;
};

export type FormData = {
  fromLat: number;
  fromLng: number;
  fromAddress: string;
  fromDistrict?: string;
  toLat: number;
  toLng: number;
  toAddress: string;
  toDistrict?: string;
  dateTime: string;
  description: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  materials: string;
  weight: string;
  vehicle: string;
};
// export interface FormData {
//   fullName: string;
//   phoneNumber: string;
//   email?: string;
//   from: string;
//   to: string;
//   dateTime: string;
//   materials: string;
//   weight: number;
//   vehicle?: string;
//   description?: string;
// }
const Page: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showMap, setShowMap] = useState<'from' | 'to' | null>(null);
  // Store selected locations for from/to
  const [fromLocation, setFromLocation] = useState<LocationField | null>(null);
  const [toLocation, setToLocation] = useState<LocationField | null>(null);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setSubmitted(false);

    console.log("Form data before submission:", data);
    const payload = {
      ...data,
      targetTab: "goodsTransportRequests",
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
      const dbPromise = fetch("/api/goods-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Wait for both requests to finish
      await Promise.all([sheetPromise, dbPromise, sheetPromise2]);


      setSubmitted(true);
      reset(); // Reset form after successful submission
      setFromLocation(null);
      setToLocation(null);
      router.push('/goods-transport/orderPlaced');
    } catch (error) {
      console.log("erron in create ", error)
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };
  // Handler for map selection
  const handleMapLocationSelect = (locationData: LocationField) => {
    if (showMap === 'from') {
      setFromLocation(locationData);
      // Set the form values properly
      setValue('fromLat', locationData.lat);
      setValue('fromLng', locationData.lng);
      setValue('fromAddress', locationData.address);
      setValue('fromDistrict', locationData.district);
    } else if (showMap === 'to') {
      setToLocation(locationData);
      // Set the form values properly
      setValue('toLat', locationData.lat);
      setValue('toLng', locationData.lng);
      setValue('toAddress', locationData.address);
      setValue('toDistrict', locationData.district);
    }
    setShowMap(null);
  };

  return (
    <div className="h-screen bg-amber-100 p-4">
      {/* <div className='flex justify-between items-center max-w-4xl mx-auto py-4'>
          <Link href="/" className="flex gap-1 text-amber-600 bg-amber-50 rounded hover:bg-amber-600  hover:text-amber-50 border px-2 py-2 mb-4">

            <span>
              <ArrowLeft />
            </span>
            Home
          </Link>
          <Link href="/packers-and-movers" className="flex gap-1 text-amber-600 bg-amber-50 rounded hover:bg-amber-600  hover:text-amber-50 border px-2 py-2 mb-4">

            Packers and Movers
            <span>
              <ArrowRight />
            </span>
          </Link>

        </div> */}

      <div className="h-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <div className='flex justify-between items-center mb-4'>
          <Link href="/" className="flex gap-1 text-amber-600 bg-amber-50 rounded hover:bg-amber-600  hover:text-amber-50 border px-2 py-2 mb-4">

            <span>
              <ArrowLeft />
            </span>
            Home
          </Link>
          <h1 className="text-2xl font-bold text-amber-600 mb-4 text-center">Goods Transport</h1>
          <Link href="/packers-and-movers" className="flex gap-1 text-amber-600 bg-amber-50 rounded hover:bg-amber-600  hover:text-amber-50 border px-2 py-2 mb-4">

            Packers and Movers
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
        <form id="transportForm" onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto space-y-4 pr-2">
          {submitted && (
            <div className="mb-4 p-2 bg-green-100 text-green-800 border border-green-300 rounded">
              ✅ Request submitted successfully!
            </div>
          )}
          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-semibold mt-2 mb-2 text-amber-700">Contact Information</h2>
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
                    message: "maximum 10 charactors allowed"
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
                    {...register("fromAddress", { required: "Pickup location is required" })}
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
                    {...register("toAddress", { required: "Destination is required" })}
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
                <label className="label">Date <span className="required">*</span></label>
                <DateInput control={control} name="dateTime" />
                {errors.dateTime && <p className="error">{errors.dateTime.message}</p>}
              </div>
            </div>
          </div>

          {/* Goods Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-amber-700">Goods Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Materials <span className="required">*</span></label>
                <input {...register("materials", { required: "Materials are required" })} className="input" placeholder="What are you transporting?" />
                {errors.materials && <p className="error">{errors.materials.message}</p>}
              </div>
              <div>
                <label className="label">Weight (kg) <span className="required">*</span></label>
                <input type="number" {...register("weight", { required: "Weight is required" })} className="input" placeholder="e.g. 100" />
                {errors.weight && <p className="error">{errors.weight.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Vehicle Required <span className="required">*</span></label>
                <input onFocus={() => {
                  setIsOpen(true)
                }} type="text" {...register("vehicle")} placeholder='click me' className='input' />
                {/* <Select
                  options={options}
                  components={{ Option: customOption, SingleValue: customSingleValue }}
                  placeholder="Select an item"
                />
                {errors.vehicleRequired && <p className="error">{errors.vehicleRequired.message}</p>} */}
              </div>
              <div className="md:col-span-2">
                <label className="label">Additional Notes</label>
                <textarea {...register("description")} className="input h-24 resize-none" placeholder="Any extra information about the transport..." />
              </div>
            </div>
          </div>

        </form>
        <div className="mt-4 text-center">
          <button
            type="submit"
            form="transportForm"
            disabled={loading}
            className={`bg-amber-600 text-white px-6 py-2 rounded-md ${loading ? "opacity-50" : "hover:bg-amber-700"}`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
      {
        isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} selectValue={setValue} />
        )
      }
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
  );
};

export default Page;
