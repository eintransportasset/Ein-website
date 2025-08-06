"use client"

import DateInput from "@/components/DateInput"
import GMap from "@/components/map"
import Modal from "@/components/modal"
import {
  ArrowLeft,
  Truck,
  ArrowRight,
  MapPin,
  Package,
  User,
  Phone,
  Mail,
  Navigation,
  Weight,
  FileText,
  MapPinHouse,
} from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import Loading from "@/components/fileLoading"

// LocationField type
type LocationField = {
  address: string
  lat: number
  lng: number
  district?: string
}

export type FormData = {
  fromLat: number
  fromLng: number
  fromAddress: string
  fromDistrict?: string
  toLat: number
  toLng: number
  toAddress: string
  toDistrict?: string
  dateTime: string
  description: string
  fullName: string
  phoneNumber: string
  email?: string
  materials: string
  weight: string
  vehicle: string
}

const Page: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showMap, setShowMap] = useState<"from" | "to" | null>(null)

  // Store selected locations for from/to
  const [fromLocation, setFromLocation] = useState<LocationField | null>(null)
  const [toLocation, setToLocation] = useState<LocationField | null>(null)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    setSubmitted(false)

    const payload = {
      ...data,
      targetTab: "goodsTransportRequests",
    }

    try {
      // Send to Google Sheet
      const sheetPromise = fetch(`${process.env.NEXT_PUBLIC_SHEET_SCRIPT_LINK}`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      // Send to Google Sheet2
      const sheetPromise2 = fetch(`${process.env.NEXT_PUBLIC_SHEET_SCRIPT_LINK2}`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      // Send to DB endpoint
      const dbPromise = fetch("/api/goods-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Wait for all requests to finish
      await Promise.all([sheetPromise, dbPromise, sheetPromise2])

      setSubmitted(true)
      reset() // Reset form after successful submission
      setFromLocation(null)
      setToLocation(null)
      localStorage.removeItem("fromLocation")
      localStorage.removeItem("toLocation")
      // setTimeout(() => {
      router.push("/trucks-service/orderPlaced")
      // }, 2000)
    } catch (error) {
      console.log("Error in create ", error)
      alert("Something went wrong. Please try again.")
    }
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  // Handler for map selection
  const handleMapLocationSelect = (locationData: LocationField) => {
    if (showMap === "from") {
      setFromLocation(locationData)
      // Set the form values properly
      setValue("fromLat", locationData.lat)
      setValue("fromLng", locationData.lng)
      setValue("fromAddress", locationData.address)
      setValue("fromDistrict", locationData.district)
    } else if (showMap === "to") {
      setToLocation(locationData)
      // Set the form values properly
      setValue("toLat", locationData.lat)
      setValue("toLng", locationData.lng)
      setValue("toAddress", locationData.address)
      setValue("toDistrict", locationData.district)
    }
    setShowMap(null)
  }

  return (

    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-2 sm:p-4 flex flex-col">
      <div className="max-w-6xl mx-auto flex flex-col flex-1">
        {/* Header Navigation */}

        <div className="relative flex items-center mb-1.5 pt-1.5 sm:mb-2 sm:pt-2">
          <Link
            href="/"
            className={`group flex items-center gap-2 text-slate-600 hover:text-blue-600 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 hover:border-blue-500/30 px-3 py-2 transition-all duration-300 hover:shadow-md text-xs sm:text-sm
    ${loading ? "pointer-events-none opacity-50" : ""}`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold hidden sm:inline">Back to Home</span>
            <span className="font-semibold sm:hidden">Home</span>
          </Link>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-1 sm:gap-2">
            <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#0086FF]" />
            <h1
              className="text-xs sm:text-base md:text-lg font-bold bg-gradient-to-r from-[#0086FF] via-blue-600 to-indigo-600 bg-clip-text text-transparent truncate"
              title="Packers & Movers"
            >
              Trucks Service
            </h1>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-white backdrop-blur-sm shadow-lg rounded-xl p-4 sm:p-6 border border-slate-200/50 flex-1 flex flex-col overflow-hidden">
          {loading && <Loading />}

          {/* Success Message */}
          {submitted && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg flex items-center gap-2 text-sm">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-semibold">Request submitted successfully! Redirecting...</span>
            </div>
          )}

          <form id="transportForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-y-auto">
            {/* Form Content - Grid Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Contact Information Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-600 rounded-lg shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">Contact Information</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="group">
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <input
                          {...register("fullName", { required: "Full name is required" })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="group">
                        <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                          <input
                            type="text"
                            {...register("phoneNumber", {
                              required: "Phone number is required",
                              maxLength: { value: 10, message: "Maximum 10 characters allowed" },
                              minLength: { value: 10, message: "Minimum 10 characters required" },
                              pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone number must be 10 digits",
                              },
                            })}
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                            }}
                            className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0086FF]/20 focus:border-[#0086FF] bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                            placeholder="1234567890"
                            maxLength={10}
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="group">
                        <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                          Email <span className="text-slate-400 text-xs">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                          <input
                            type="email"
                            {...register("email", {
                              pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                              }
                            })}
                            className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                            placeholder="you@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Information Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-600 rounded-lg shadow-md">
                      <Navigation className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">Route Information</h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Transport Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DateInput
                          control={control}
                          name="dateTime"
                          register={{
                            ...register("dateTime", {
                              required: "Date is required",
                              validate: {
                                dateTime: (value) => {
                                  const selectedDate = new Date(value);
                                  const currentDate = new Date();

                                  // Normalize both to ignore time for same-day validation
                                  selectedDate.setHours(0, 0, 0, 0);
                                  currentDate.setHours(0, 0, 0, 0);

                                  if (selectedDate < currentDate) {
                                    return "Please select a future date";
                                  }
                                  return true;
                                },
                              },
                            }),
                          }}
                        />
                      </div>
                      {errors.dateTime && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.dateTime.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Pickup Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group cursor-pointer" onClick={() => setShowMap("from")}>
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                        <input
                          {...register("fromAddress", { required: "Pickup location is required" })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-white cursor-pointer text-xs sm:text-sm group-hover:border-blue-500/50"
                          placeholder="Click to select pickup location on map"
                          value={fromLocation?.address || ""}
                          readOnly
                        />
                      </div>
                      {errors.fromAddress && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.fromAddress.message}
                        </p>
                      )}
                      <input type="hidden" {...register("fromLat", { required: true })} />
                      <input type="hidden" {...register("fromLng", { required: true })} />
                      <input type="hidden" {...register("fromDistrict")} />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Drop-off Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group cursor-pointer" onClick={() => setShowMap("to")}>
                        <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                        <input
                          {...register("toAddress", { required: "Destination is required" })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-white cursor-pointer text-xs sm:text-sm group-hover:border-blue-500/50"
                          placeholder="Click to select drop-off location on map"
                          value={toLocation?.address || ""}
                          readOnly
                        />
                      </div>
                      {errors.toAddress && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.toAddress.message}
                        </p>
                      )}
                      <input type="hidden" {...register("toLat", { required: true })} />
                      <input type="hidden" {...register("toLng", { required: true })} />
                      <input type="hidden" {...register("toDistrict")} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Goods Details Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-600 rounded-lg shadow-md">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">Goods Details</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="group">
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Materials <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <input
                          {...register("materials", { required: "Materials are required" })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                          placeholder="What are you transporting?"
                        />
                      </div>
                      {errors.materials && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.materials.message}
                        </p>
                      )}
                    </div>
                    <div className="group">
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Weight (kg) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <input
                          type="number"
                          {...register("weight", { required: "Weight is required" })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                          placeholder="e.g. 100"
                          min={1}
                        />
                      </div>
                      {errors.weight && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.weight.message}
                        </p>
                      )}
                    </div>
                    <div className="group">
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Vehicle Required <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <input
                          // onFocus={() => setIsOpen(true)}
                          type="text"
                          {...register("vehicle", { required: "Vehicle type is required" })}
                          placeholder="Enter required vehicle type"
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                        // readOnly
                        />
                      </div>
                      {errors.vehicle && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.vehicle.message}
                        </p>
                      )}
                    </div>
                    <div className="group">
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">Additional Notes</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <textarea
                          {...register("description")}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400 h-16 sm:h-20 resize-none"
                          placeholder="Any extra information about the transport..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4 mb-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className={`group relative px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
                  }`}
              >
                <span className="flex items-center gap-2 text-xs sm:text-sm">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Vehicle Selection Modal */}
          {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} selectValue={setValue} />}

          {/* Map Modal */}
          {showMap && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[80vh] sm:h-[90vh] relative overflow-hidden border border-slate-200">
                <GMap onLocationSelect={handleMapLocationSelect} onBack={() => setShowMap(null)} />
                <button
                  className="absolute top-2 right-2 p-2 bg-white/90 text-slate-600 hover:text-red-500 rounded-lg shadow-md transition-all duration-300 hover:scale-105 border border-slate-200"
                  onClick={() => setShowMap(null)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
