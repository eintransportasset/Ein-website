'use client'
import DateInput from '@/components/DateInput'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormData = {
  from: string,
  to: string,
  dateTime: string,
  description: string,
  fullName: string,
  phoneNumber: string,
  email?: string
}

const Page: React.FC = () => {
  const { register, handleSubmit, formState: { errors },control } = useForm<FormData>();
  const [loading] = useState(false);
  const [submitted] = useState(false);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const payload = {
      ...data,
      targetTab: "PackersAndMoversRequests",
    };

    await fetch(`${process.env.NEXT_PUBLIC_SHEET_SCRIPT_LINK}`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    alert("Submitted!");
  };

  return (
    // <div>
    //   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
    //     <label>From</label>
    //     <input {...register("from", { required: "Starting location is required" })} placeholder="Enter starting location" />
    //     {errors.from && <span className="text-red-500">{errors.from.message}</span>}

    //     <label>To</label>
    //     <input {...register("to", { required: "Destination is required" })} placeholder="Enter destination location" />
    //     {errors.to && <span className="text-red-500">{errors.to.message}</span>}

    //     <label>Date & Time</label>
    //     <input type="datetime-local" {...register("dateTime", { required: "Date and time are required" })} />
    //     {errors.dateTime && <span className="text-red-500">{errors.dateTime.message}</span>}

    //     <label>Description</label>
    //     <textarea {...register("description")} placeholder="Enter any additional details" />

    //     <label>Full Name</label>
    //     <input {...register("fullName", { required: "Full name is required" })} placeholder="Enter your full name" />
    //     {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}

    //     <label>Phone Number</label>
    //     <input type="tel" {...register("phoneNumber", { required: "Phone number is required" })} placeholder="Enter your phone number" />
    //     {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

    //     <label>Email (optional)</label>
    //     <input type="email" {...register("email")} placeholder="Enter your email address" />

    //     <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer">
    //       Submit
    //     </button>
    //   </form>
    // </div>

    <div className="min-h-screen  bg-amber-100  px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-amber-600 mb-6 text-center">Packers and Movers</h1>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            ✅ Your request has been submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Route Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-amber-700">Route Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">From <span className="required">*</span></label>
                <input {...register("from", { required: "Starting location is required" })} className="input" placeholder="Pickup location" />
                {errors.from && <p className="error">{errors.from.message}</p>}
              </div>
              <div>
                <label className="label">To <span className="required">*</span></label>
                <input {...register("to", { required: "Destination is required" })} className="input" placeholder="Drop-off location" />
                {errors.to && <p className="error">{errors.to.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Date <span className="required">*</span></label>
                {/* <input type="datetime-local" {...register("dateTime", { required: "Date and time are required" })} className="input" />
                    {errors.dateTime && <p className="error">{errors.dateTime.message}</p>} */}
                <DateInput control={control} name="dateTime" />
              </div>
            </div>
          </div>

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

          {/* Goods Info */}
          {/* <div>
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
                <select {...register("vehicleRequired", { required: "Vehicle requirement is required" })} className="input">
                  <option value="">Select vehicle type</option>
                  <option value="truck">Truck</option>
                  <option value="van">Van</option>
                  <option value="bike">Bike</option>
                  <option value="other">Other</option>
                </select>
                {errors.vehicleRequired && <p className="error">{errors.vehicleRequired.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">Additional Notes</label>
                <textarea {...register("description")} className="input h-24 resize-none" placeholder="Any extra information about the transport..." />
              </div>
            </div>
          </div> */}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-amber-600 text-white px-6 py-2 rounded-md transition-all duration-200 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-700"
                }`}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>


    </div>
  );
};

export default Page;