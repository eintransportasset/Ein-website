"use client"

import DateInput from "@/components/DateInput"
import GMap from "@/components/map"
import { ArrowLeft, Truck,ArrowRight, MapPin, Calendar, Package, User, Phone, Mail, Navigation } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useLocationContext } from "@/app/context/LocationContext"

// Add the missing LocationField type
type LocationField = {
  address: string
  lat: number
  lng: number
  district?: string
}

type FormData = {
  fromAddress: string
  fromLat: number
  fromLng: number
  fromDistrict?: string
  toAddress: string
  toLat: number
  toLng: number
  toDistrict?: string
  dateTime: string
  description: string
  fullName: string
  phoneNumber: string
  email?: string
  shiftingThings: string
}

const Page: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    getValues,
    setValue,
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showMap, setShowMap] = useState<"from" | "to" | null>(null)
  const [fromLocation, setFromLocation] = useState<LocationField | null>(null)
  const [toLocation, setToLocation] = useState<LocationField | null>(null)
  const { fromLocation: contextFromLocation, toLocation: contextToLocation } = useLocationContext()

  //if page reload remove from localStorage
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("fromLocation")
      localStorage.removeItem("toLocation")
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    // Try context first, fallback to localStorage
    const from = contextFromLocation || JSON.parse(localStorage.getItem("fromLocation") || "null")
    const to = contextToLocation || JSON.parse(localStorage.getItem("toLocation") || "null")

    if (from) {
      setFromLocation(from)
      setValue("fromAddress", from.address)
      setValue("fromLat", from.lat)
      setValue("fromLng", from.lng)
      setValue("fromDistrict", from.district)
    }

    if (to) {
      setToLocation(to)
      setValue("toAddress", to.address)
      setValue("toLat", to.lng)
      setValue("toLng", to.lng)
      setValue("toDistrict", to.district)
    }
  }, [])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    // Validate that locations are selected
    if (!fromLocation || !toLocation) {
      alert("Please select both pickup and drop-off locations using the map.")
      setLoading(false)
      return
    }

    const payload = {
      ...data,
      targetTab: "PackersAndMoversRequests",
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
      const dbPromise = fetch("/api/packers-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Wait for both requests to finish
      await Promise.all([sheetPromise, dbPromise, sheetPromise2])

      setSubmitted(true)
      reset()
      setFromLocation(null)
      setToLocation(null)
      //remove from localStorage
      localStorage.removeItem("fromLocation")
      localStorage.removeItem("toLocation")
      router.push("/packers-and-movers/orderPlaced")
    } catch (error) {
      console.error("Submission error:", error)
      alert("Something went wrong. Please try again.")
    }
    setLoading(false)
  }

  const handleMapLocationSelect = (locationData: LocationField) => {
    if (showMap === "from") {
      setFromLocation(locationData)
      setValue("fromAddress", locationData.address)
      setValue("fromLat", locationData.lat)
      setValue("fromLng", locationData.lng)
      setValue("fromDistrict", locationData.district)
    } else if (showMap === "to") {
      setToLocation(locationData)
      setValue("toAddress", locationData.address)
      setValue("toLat", locationData.lat)
      setValue("toLng", locationData.lng)
      setValue("toDistrict", locationData.district)
    }
    setShowMap(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Enhanced Header Navigation */}
        <div className="flex justify-between items-center mb-2 pt-2">
          <Link
            href="/"
            className="group flex items-center gap-3 text-slate-600 hover:text-[#0086FF] bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-[#0086FF]/30 px-4 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold hidden sm:inline">Back to Home</span>
            <span className="font-semibold sm:hidden">Home</span>
          </Link>

          <div className="text-center flex flex-row items-center gap-2">
            <Truck className="w-6 h-6 text-[#0086FF]" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#0086FF] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Packers & Movers
            </h1>
          </div>

          <Link
            href="/goods-transport"
            className="group flex items-center gap-3 text-slate-600 hover:text-[#0086FF] bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-[#0086FF]/30 px-4 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 text-sm"
          >
            <span className="font-semibold hidden sm:inline">Goods Transport</span>
            <span className="font-semibold sm:hidden">Transport</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Enhanced Main Form Container */}
        <div className="bg-white backdrop-blur-sm shadow-2xl shadow-slate-200/50 rounded-2xl p-6 sm:p-8 border border-slate-200/50 ">
          <form id="packersandmovers" onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            {/* Form Content - Enhanced Grid Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Enhanced Contact Information Section */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#0086FF] to-blue-600 rounded-xl shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Contact Information</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative items-center">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-700 group-focus-within:text-[#0086FF] transition-colors duration-300" />
                        <input
                          {...register("fullName", { required: "Full name is required" })}
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0086FF]/20 focus:border-[#0086FF] transition-all duration-300 bg-white/70  hover:bg-white/90 text-sm font-medium placeholder:text-slate-400"
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
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-700 group-focus-within:text-[#0086FF] transition-colors duration-300" />
                          <input
                            type="tel"
                            {...register("phoneNumber", {
                              required: "Phone number is required",
                              maxLength: { value: 10, message: "Maximum 10 characters allowed" },
                            })}
                            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0086FF]/20 focus:border-[#0086FF] transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400"
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
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email <span className="text-slate-400 text-xs font-normal">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-700 group-focus-within:text-[#0086FF] transition-colors duration-300" />
                          <input
                            type="email"
                            {...register("email")}
                            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0086FF]/20 focus:border-[#0086FF] transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400"
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
                    <div className="p-2 bg-gradient-to-r from-[#0086FF] to-blue-600 rounded-xl shadow-lg">
                      <Navigation className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Route Information</h2>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Pickup Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group cursor-pointer" onClick={() => setShowMap("from")}>
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-700 group-hover:text-[#0086FF] transition-colors duration-300" />
                        <input
                          {...register("fromAddress", { required: "Pickup address is required" })}
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-white cursor-pointer transition-all duration-300 text-sm font-medium group-hover:border-[#0086FF]/50 group-hover:shadow-md"
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
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Drop-off Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group cursor-pointer" onClick={() => setShowMap("to")}>
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-700 group-hover:text-[#0086FF] transition-colors duration-300" />
                        <input
                          {...register("toAddress", { required: "Drop-off address is required" })}
                          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-white cursor-pointer transition-all duration-300 text-sm font-medium group-hover:border-[#0086FF]/50 group-hover:shadow-md"
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
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Enhanced Date Section */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#0086FF] to-blue-600 rounded-xl shadow-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Shifting Schedule</h2>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Select Date & Time <span className="text-red-500">*</span>
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

                {/* Enhanced Package Information Section */}
                <div className="space-y-5 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#0086FF] to-blue-600 rounded-xl shadow-lg">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Items Information</h2>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Items to be Moved <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group h-full">
                      <Package className="absolute left-4 top-4 w-5 h-5 text-blue-700 group-focus-within:text-[#0086FF] transition-colors duration-300" />
                      <textarea
                        {...register("shiftingThings", { required: "Please describe items to be moved" })}
                        className="w-full pl-12 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0086FF]/20 focus:border-[#0086FF] transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm font-medium placeholder:text-slate-400 h-40 lg:h-48"
                        placeholder="Please describe the items you need to move in detail"
                      />
                    </div>
                    {errors.shiftingThings && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {errors.shiftingThings.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <div className="text-center pt-3 mt-2">
              <button
                type="submit"
                disabled={loading}
                form="packersandmovers"
                className={`group relative px-6 py-3 bg-gradient-to-r from-[#0086FF] via-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-xl hover:shadow-[#0086FF]/30 hover:scale-105 active:scale-95 hover:-translate-y-0.5"
                }`}
              >
                <span className="flex items-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full animate-spin"></div>
                      Processing Your Request...
                    </>
                  ) : (
                    <>
                      Submit Moving Request
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
              
            </div>
          </form>

          {/* Enhanced Map Modal */}
          {showMap && (
            <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[75vh] mt-13 relative overflow-hidden border border-slate-200">
                
                <GMap onLocationSelect={handleMapLocationSelect} onBack={() => setShowMap(null)} />

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
