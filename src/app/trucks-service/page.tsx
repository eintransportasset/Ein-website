"use client";

import DateInput from "@/components/DateInput";
import Modal from "@/components/modal";
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
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Loading from "@/components/fileLoading";

export type FormData = {
  fromAddress: string;
  toAddress: string;
  dateTime: string;
  description: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  materials: string;
  weight: string;
  vehicleRequired: string;
};

const Page: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Watch the dateTime field specifically
  const watchedDateTime = watch("dateTime");

  // useEffect(() => {
  //   if (watchedDateTime) {
  //     console.log("Selected date:", watchedDateTime);
  //   }
  // }, [watchedDateTime])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setSubmitted(false);

    const payload = {
      ...data,
      targetTab: "goodsTransportRequests",
    };

    try {
      // Send to Google Sheet
      const sheetPromise = fetch(
        `${process.env.NEXT_PUBLIC_SHEET_SCRIPT_LINK}`,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Send to Google Sheet2
      const sheetPromise2 = fetch(
        `${process.env.NEXT_PUBLIC_SHEET_SCRIPT_LINK2}`,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Send to DB endpoint
      const dbPromise = fetch("/api/goods-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Wait for all requests to finish
      await Promise.all([sheetPromise, dbPromise, sheetPromise2]);

      sessionStorage.setItem("isMove", "true");
      if (sessionStorage.getItem("isMove") === "true") {
        document.cookie = "isMove=true; path=/";
      }

      sessionStorage.removeItem("fromAddress");
      sessionStorage.removeItem("toAddress");

      setSubmitted(true);
      reset(); // Reset form after successful submission
      router.push("/trucks-service/orderPlaced");
    } catch (error) {
      console.log("Error in create ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "page_view",
        page: "/trucks-service",
      });
    }
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-2 sm:p-4 flex flex-col">
      <div className="max-w-6xl mx-auto flex flex-col flex-1">
        {/* Header Navigation */}

        <div className="relative flex items-center justify-between mb-1.5 pt-1.5 sm:mb-2 sm:pt-2">
          <Link
            href="/"
            className={`group flex items-center gap-1.5 
    text-slate-600 hover:text-[#0086FF] 
    bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 hover:border-[#0086FF]/30
    px-2 py-1 text-xs
    sm:px-3 sm:py-2 sm:text-sm
    transition-all duration-300 hover:shadow-md 
    ${loading ? "pointer-events-none opacity-50" : ""}
  `}
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold hidden sm:inline">Back to Home</span>
            <span className="font-semibold sm:hidden">Home</span>
          </Link>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-0.5 sm:gap-2">
            <Truck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#0086FF]" />
            <h1
              className="text-[10px] sm:text-base md:text-lg font-bold 
      bg-gradient-to-r from-[#0086FF] via-blue-600 to-indigo-600 
      bg-clip-text text-transparent truncate"
              title="Trucks Service"
            >
              Trucks Service
            </h1>
          </div>
          <Link
            href="tel:+919043384332"
            className="
    flex items-center gap-1 
    text-white bg-[#0086FF] rounded-md 
    px-0.5 py-0.5 text-xs
    sm:px-2 sm:py-1 sm:text-sm
    md:px-3 md:py-1.5 md:text-base
    hover:underline transition-colors duration-300 font-medium animate-bounce
  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            9043384332
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="bg-white backdrop-blur-sm shadow-lg rounded-xl p-4 sm:p-6 border border-slate-200/50 flex-1 flex flex-col overflow-hidden">
          {loading && <Loading />}

          {/* Success Message */}
          {submitted && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg flex items-center gap-2 text-sm">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-semibold">
                Request submitted successfully! Redirecting...
              </span>
            </div>
          )}

          <form
            id="transportForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col flex-1 overflow-y-auto"
          >
            {/* Form Content - Grid Layout */}
            <div className="flex-1 text-gray-900 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Contact Information Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-600 rounded-lg shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">
                      Contact Information
                    </h2>
                  </div>
                  <div className="space-y-3">
                    <div className="group">
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <input
                          {...register("fullName", {
                            required: "Full name is required",
                          })}
                          className="w-full pl-10 pr-3 py-2 border text-black border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
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
                              maxLength: {
                                value: 10,
                                message: "Maximum 10 characters allowed",
                              },
                              minLength: {
                                value: 10,
                                message: "Minimum 10 characters required",
                              },
                              pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone number must be 10 digits",
                              },
                            })}
                            onInput={(e) => {
                              e.currentTarget.value =
                                e.currentTarget.value.replace(/[^0-9]/g, "");
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
                          Email{" "}
                          <span className="text-slate-400 text-xs">
                            (optional)
                          </span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                          <input
                            type="email"
                            {...register("email", {
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                              },
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
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">
                      Route Information
                    </h2>
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
                      <div className="relative group">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <input
                          {...register("fromAddress", {
                            required: "Pickup location is required",
                          })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                          placeholder="Enter pickup address"
                        />
                      </div>
                      {errors.fromAddress && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.fromAddress.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Drop-off Location{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <input
                          {...register("toAddress", {
                            required: "Destination is required",
                          })}
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                          placeholder="Enter drop-off address"
                        />
                      </div>
                      {errors.toAddress && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.toAddress.message}
                        </p>
                      )}
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
                    <h2 className="text-base sm:text-lg font-bold text-slate-800">
                      Goods Details
                    </h2>
                  </div>
                  <div className="space-y-3">
                    <div className="group">
                      <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                        Materials <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 group-focus-within:text-blue-700" />
                        <input
                          {...register("materials", {
                            required: "Materials are required",
                          })}
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
                          {...register("weight", {
                            required: "Weight is required",
                          })}
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
                          type="text"
                          {...register("vehicleRequired", {
                            required: "Vehicle type is required",
                          })}
                          placeholder="Enter required vehicle type"
                          className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 hover:bg-white/90 text-xs sm:text-sm placeholder:text-slate-400"
                        />
                      </div>
                      {errors.vehicleRequired && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          {errors.vehicleRequired.message}
                        </p>
                      )}
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
                className={`group relative px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md ${loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
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
          {isOpen && (
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selectValue={setValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
