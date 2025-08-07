"use client"

import DateInput from "@/components/DateInput"
import GMap from "@/components/map"
import { ArrowLeft, Truck, ArrowRight, MapPin, Calendar, Package, User, Phone, Mail, Navigation, MapPinHouse } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useLocationContext } from "@/app/context/LocationContext"
import Loading from "@/components/fileLoading"


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
  }, [contextFromLocation, contextToLocation, setValue])

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
    // setTimeout(() => {
    //   setLoading(false)
    // }, 800)

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

    // <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-2 sm:p-4 flex flex-col">
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-2 sm:p-4 flex">

      {/* <div className="max-w-6xl mx-auto flex flex-col flex-1"> */}
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
              Packers & Movers
            </h1>
          </div>
        </div>



        {/* Main Form Container */}
        <div className="bg-white backdrop-blur-sm shadow-lg rounded-xl p-4 sm:p-6 border border-slate-200/50 flex-1 flex flex-col overflow-hidden">
          {/* <div className="bg-white backdrop-blur-sm shadow-2xl shadow-slate-200/50 rounded-2xl p-6 sm:p-8 border border-slate-200/50 "> */}

          {loading && <Loading />}
          <form id="packersandmovers" onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-y-auto">
            {/* Form Content - Grid Layout */}
            <div className="flex-1 text-gray-900 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Contact Information Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-r from-[#0086FF] to-blue-600 rounded-lg shadow-md">
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
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-700 group-focus-within:text-[#0086FF]" />
                        <input
                          {...register("fullName", { required: "Full name is required" })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0086FF]/20 focus:border-[#0086FF] bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
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
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-700 group-focus-within:text-[#0086FF]" />
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
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-700 group-focus-within:text-[#0086FF]" />
                          <input
                            type="email"
                            {...register("email")}
                            className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0086FF]/20 focus:border-[#0086FF] bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Information Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-r from-[#0086FF] to-blue-600 rounded-lg shadow-md">
                      <Navigation className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">Route Information</h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Pickup Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group cursor-pointer" onClick={() => setShowMap("from")}>
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-700 group-hover:text-[#0086FF]" />
                        <input
                          {...register("fromAddress", { required: "Pickup address is required" })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-white cursor-pointer text-xs sm:text-sm group-hover:border-[#0086FF]/50"
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
                        <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-700 group-hover:text-[#0086FF]" />
                        <input
                          {...register("toAddress", { required: "Drop-off address is required" })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-white cursor-pointer text-xs sm:text-sm group-hover:border-[#0086FF]/50"
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
                {/* Shifting Schedule Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-r from-[#0086FF] to-blue-600 rounded-lg shadow-md">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">Shifting Schedule</h2>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                      Select Date<span className="text-red-500">*</span>
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
                </div>

                {/* Items Information Section */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-r from-[#0086FF] to-blue-600 rounded-lg shadow-md">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">Items Information</h2>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                      Items to be Moved <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <Package className="absolute left-3 top-3 w-4 h-4 text-blue-700 group-focus-within:text-[#0086FF]" />
                      <textarea
                        {...register("shiftingThings", { required: "Please describe items to be moved" })}
                        className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#0086FF]/20 focus:border-[#0086FF] bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400 h-30 sm:h-45 "
                        placeholder="Please describe the items you need to Move in details or BHK"
                      />
                    </div>
                    {errors.shiftingThings && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.shiftingThings.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4 mb-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                form="packersandmovers"
                className={`group relative px-6 py-3 bg-gradient-to-r from-[#0086FF] via-blue-600 to-indigo-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-[#0086FF]/30 hover:scale-105 active:scale-95"
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

          {/* Map Modal */}
          {/* {showMap && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
              <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-4xl h-[70vh] sm:h-[80vh] relative overflow-hidden border border-slate-200">
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
          )} */}
          {showMap && (
            <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[75vh] mt-13 relative overflow-hidden border border-slate-200">

                <GMap onLocationSelect={handleMapLocationSelect} onBack={() => setShowMap(null)} />

              </div>
            </div>
          )}
        </div>
      </div>
    </div>)
}

export default Page
