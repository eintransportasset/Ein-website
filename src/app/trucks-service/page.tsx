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
} from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"

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
    console.log("Form data before submission:", data)

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

      setTimeout(() => {
        router.push("/trucks-service/orderPlaced")
      }, 2000)
    } catch (error) {
      console.log("Error in create ", error)
      alert("Something went wrong. Please try again.")
    }
    setLoading(false)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Enhanced Header Navigation */}
        <div className="flex justify-between items-center mb-2 pt-2">
          <Link
            href="/"
            className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-blue-500/30 px-4 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold hidden sm:inline">Back to Home</span>
            <span className="font-semibold sm:hidden">Home</span>
          </Link>

          <div className="text-center flex flex-row items-center gap-2">
            <Truck className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 bg-clip-text text-transparent">
              Trucks Service
            </h1>
          </div>

          <Link
            href="/packers-and-movers"
            className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-blue-500/30 px-4 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 text-sm"
          >
            <span className="font-semibold hidden sm:inline">Packers & Movers</span>
            <span className="font-semibold sm:hidden">Movers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Enhanced Main Form Container */}
        <div className="bg-white backdrop-blur-sm shadow-2xl shadow-slate-200/50 rounded-2xl p-6 sm:p-8 border border-slate-200/50">
          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-50 text-blue-800 border border-blue-200 rounded-xl flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-semibold">Request submitted successfully! Redirecting...</span>
            </div>
          )}

          <form id="transportForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {/* Form Content - Enhanced Grid Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Enhanced Contact Information Section */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-600 rounded-xl shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Contact Information</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="group">
                      <label className="block text-sm  text-slate-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors duration-300" />
                        <input
                          {...register("fullName", { required: "Full name is required" })}
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="group">
                        <label className="block text-sm  text-slate-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors duration-300" />
                          <input
                            type="tel"
                            {...register("phoneNumber", {
                              required: "Phone number is required",
                              maxLength: { value: 10, message: "Maximum 10 characters allowed" },
                            })}
                            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400"
                            placeholder="1234567890"
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>

                      <div className="group">
                        <label className="block text-sm  text-slate-700 mb-2">
                          Email <span className="text-slate-400 text-xs font-normal">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors duration-300" />
                          <input
                            type="email"
                            {...register("email")}
                            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Route Information Section */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-600 rounded-xl shadow-lg">
                      <Navigation className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Route Information</h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm  text-slate-700 mb-2">
                        Pickup Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group cursor-pointer" onClick={() => setShowMap("from")}>
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                        <input
                          {...register("fromAddress", { required: "Pickup location is required" })}
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-white cursor-pointer transition-all duration-300 text-sm font-medium group-hover:border-blue-500/50 group-hover:shadow-md"
                          placeholder="Click to select pickup location on map"
                          value={fromLocation?.address || ""}
                          readOnly
                        />
                      </div>
                      {errors.fromAddress && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {errors.fromAddress.message}
                        </p>
                      )}
                      <input type="hidden" {...register("fromLat", { required: true })} />
                      <input type="hidden" {...register("fromLng", { required: true })} />
                      <input type="hidden" {...register("fromDistrict")} />
                    </div>

                    <div>
                      <label className="block text-sm  text-slate-700 mb-2">
                        Drop-off Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group cursor-pointer" onClick={() => setShowMap("to")}>
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                        <input
                          {...register("toAddress", { required: "Destination is required" })}
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-white cursor-pointer transition-all duration-300 text-sm font-medium group-hover:border-blue-500/50 group-hover:shadow-md"
                          placeholder="Click to select drop-off location on map"
                          value={toLocation?.address || ""}
                          readOnly
                        />
                      </div>
                      {errors.toAddress && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {errors.toAddress.message}
                        </p>
                      )}
                      <input type="hidden" {...register("toLat", { required: true })} />
                      <input type="hidden" {...register("toLng", { required: true })} />
                      <input type="hidden" {...register("toDistrict")} />
                    </div>

                    <div>
                      <label className="block text-sm  text-slate-700 mb-2">
                        Transport Date & Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DateInput control={control} name="dateTime" />
                      </div>
                      {errors.dateTime && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {errors.dateTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Enhanced Goods Information Section */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-600 rounded-xl shadow-lg">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Goods Details</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="group">
                      <label className="block text-sm  text-slate-700 mb-2">
                        Materials/Goods <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors duration-300" />
                        <input
                          {...register("materials", { required: "Materials are required" })}
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400"
                          placeholder="What are you transporting?"
                        />
                      </div>
                      {errors.materials && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {errors.materials.message}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm  text-slate-700 mb-2">
                        Weight (kg) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Weight className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors duration-300" />
                        <input
                          type="number"
                          {...register("weight", { required: "Weight is required" })}
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400"
                          placeholder="e.g. 100"
                          min={1}
                        />
                      </div>
                      {errors.weight && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {errors.weight.message}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm  text-slate-700 mb-2">
                        Vehicle Required <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Truck className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors duration-300" />
                        <input
                          onFocus={() => setIsOpen(true)}
                          type="text"
                          {...register("vehicle", { required: "Vehicle type is required" })}
                          placeholder="Click to select vehicle type"
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400 cursor-pointer"
                          readOnly
                        />
                      </div>
                      {errors.vehicle && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {errors.vehicle.message}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm  text-slate-700 mb-2">Additional Notes</label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-4 w-5 h-5 text-blue-600 group-focus-within:text-blue-700 transition-colors duration-300" />
                        <textarea
                          {...register("description")}
                          className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400 h-32 resize-none"
                          placeholder="Any extra information about the transport..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <div className="text-center pt-8 mt-8 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className={`group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg ${loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
                  }`}
              >
                <span className="flex items-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Your Request...
                    </>
                  ) : (
                    <>
                      Submit Transport Request
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Vehicle Selection Modal */}
          {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} selectValue={setValue} />}

          {/* Enhanced Map Modal */}
          {showMap && (
            <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl  mt-13 h-[75vh] relative overflow-hidden border border-slate-200">
                {/* <div className="absolute top-4 left-4 z-10">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-slate-200">
                    <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Select {showMap === "from" ? "Pickup" : "Drop-off"} Location
                    </p>
                  </div>
                </div> */}

                <GMap onLocationSelect={handleMapLocationSelect} onBack={() => setShowMap(null)} />

                <button
                  className="absolute top-4 right-4 z-10 p-3 bg-white/95 backdrop-blur-sm text-slate-600 hover:text-red-500 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 border border-slate-200"
                  onClick={() => setShowMap(null)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
