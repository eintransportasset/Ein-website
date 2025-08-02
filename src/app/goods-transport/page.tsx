// 'use client'
// import React from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'

// type FormData = {
//   from: string,
//   to: string,
//   dateTime: string,
//   description: string,
//   fullName: string,
//   phoneNumber: string,
//   email?: string
//   materials: string
//   weight: string
//   vehicleRequired: string
// }

// const Page: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     const payload = {
//       ...data,
//       targetTab: "goodsTransportRequests",
//     };

//     await fetch(`${process.env.NEXT_PUBLIC_SHEET_LINK}`, {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     alert("Submitted!");
//   };

//   return (
//     <div className='w-1/2 justify-center bg-amber-600'>
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
//         <section className='flex flex-1'>
//           <label className='font-semibold'>From
//             <span className='text-red-500 font-bold'>*</span>
//           </label>

//           <input className='border-0 border-b-amber-100'{...register("from", { required: "Starting location is required" })} placeholder="Enter starting location" />
//           {errors.from && <span className="text-red-500">{errors.from.message}</span>}
//         <label>To</label>
//         <input {...register("to", { required: "Destination is required" })} placeholder="Enter destination location" />
//         {errors.to && <span className="text-red-500">{errors.to.message}</span>}
//         </section>


//         <label>Date & Time</label>
//         <input type="datetime-local" {...register("dateTime", { required: "Date and time are required" })} />
//         {errors.dateTime && <span className="text-red-500">{errors.dateTime.message}</span>}

//         <label>Description</label>
//         <textarea {...register("description")} placeholder="Enter any additional details" />

//         <label>Full Name</label>
//         <input {...register("fullName", { required: "Full name is required" })} placeholder="Enter your full name" />
//         {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}

//         <label>Phone Number</label>
//         <input type="tel" {...register("phoneNumber", { required: "Phone number is required" })} placeholder="Enter your phone number" />
//         {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

//         <label>Email (optional)</label>
//         <input type="email" {...register("email")} placeholder="Enter your email address" />

//         <label>Materials</label>
//         <input {...register("materials", { required: "Materials are required" })} placeholder="Enter materials to be transported" />
//         {errors.materials && <span className="text-red-500">{errors.materials.message}</span>}

//         <label>Weight</label>
//         <input type="number" {...register("weight", { required: "Weight is required" })} placeholder="Enter weight of the goods" />
//         {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}

//         <label>Vehicle Required</label>
//         <select {...register("vehicleRequired", { required: "Vehicle requirement is required" })}>
//           <option value="">Select vehicle type</option>
//           <option value="truck">Truck</option>
//           <option value="van">Van</option>
//           <option value="bike">Bike</option>
//           <option value="other">Other</option>
//         </select>
//         {errors.vehicleRequired && <span className="text-red-500">{errors.vehicleRequired.message}</span>}

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Page;


// 'use client'
// import React from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'

// type FormData = {
//   from: string,
//   to: string,
//   dateTime: string,
//   description: string,
//   fullName: string,
//   phoneNumber: string,
//   email?: string
//   materials: string
//   weight: string
//   vehicleRequired: string
// }

// const Page: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     const payload = {
//       ...data,
//       targetTab: "goodsTransportRequests",
//     };

//     await fetch('https://script.google.com/macros/s/AKfycbznBUean2KxcteAHnClwBerj63SM-sP3qHG-kEM7oncHA8Btk4SNs_ki9xwfstmvGY/exec', {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     alert("Submitted!");
//   };

//   return (
//     <div className="min-h-screen bg-amber-100 flex items-center justify-center py-10 px-4">
//       <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md space-y-6">
//         <h2 className="text-2xl font-bold text-center text-amber-700">Goods Transport Request</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block font-semibold mb-1">
//               From <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("from", { required: "Starting location is required" })}
//               placeholder="Enter starting location"
//               className="input"
//             />
//             {errors.from && <span className="text-red-500 text-sm">{errors.from.message}</span>}
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">
//               To <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("to", { required: "Destination is required" })}
//               placeholder="Enter destination location"
//               className="input"
//             />
//             {errors.to && <span className="text-red-500 text-sm">{errors.to.message}</span>}
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">
//               Date & Time <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="datetime-local"
//               {...register("dateTime", { required: "Date and time are required" })}
//               className="input"
//             />
//             {errors.dateTime && <span className="text-red-500 text-sm">{errors.dateTime.message}</span>}
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">Description</label>
//             <textarea
//               {...register("description")}
//               placeholder="Enter any additional details"
//               className="input h-24 resize-none"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("fullName", { required: "Full name is required" })}
//               placeholder="Enter your full name"
//               className="input"
//             />
//             {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">
//               Phone Number <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="tel"
//               {...register("phoneNumber", { required: "Phone number is required" })}
//               placeholder="Enter your phone number"
//               className="input"
//             />
//             {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">Email (optional)</label>
//             <input
//               type="email"
//               {...register("email")}
//               placeholder="Enter your email address"
//               className="input"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">
//               Materials <span className="text-red-500">*</span>
//             </label>
//             <input
//               {...register("materials", { required: "Materials are required" })}
//               placeholder="Enter materials to be transported"
//               className="input"
//             />
//             {errors.materials && <span className="text-red-500 text-sm">{errors.materials.message}</span>}
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">
//               Weight (in kg) <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               {...register("weight", { required: "Weight is required" })}
//               placeholder="Enter weight of the goods"
//               className="input"
//             />
//             {errors.weight && <span className="text-red-500 text-sm">{errors.weight.message}</span>}
//           </div>

//           <div>
//             <label className="block font-semibold mb-1">
//               Vehicle Required <span className="text-red-500">*</span>
//             </label>
//             <select
//               {...register("vehicleRequired", { required: "Vehicle requirement is required" })}
//               className="input"
//             >
//               <option value="">Select vehicle type</option>
//               <option value="truck">Truck</option>
//               <option value="van">Van</option>
//               <option value="bike">Bike</option>
//               <option value="other">Other</option>
//             </select>
//             {errors.vehicleRequired && <span className="text-red-500 text-sm">{errors.vehicleRequired.message}</span>}
//           </div>
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition-all duration-200"
//           >
//             Submit
//           </button>
//         </div>
//       </form>


//     </div>
//   );
// };

// export default Page;



'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { DayPicker } from 'react-day-picker';
import DateInput from '@/components/DateInput';
type FormData = {
  from: string,
  to: string,
  dateTime: string,
  description: string,
  fullName: string,
  phoneNumber: string,
  email?: string
  materials: string
  weight: string
  vehicleRequired: string
}

const Page: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setSubmitted(false);

    const payload = {
      ...data,
      targetTab: "goodsTransportRequests",
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbznBUean2KxcteAHnClwBerj63SM-sP3qHG-kEM7oncHA8Btk4SNs_ki9xwfstmvGY/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      reset(); // Reset form after successful submission
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen  bg-amber-100  px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-amber-600 mb-6 text-center">Request Goods Transport</h1>

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
          </div>

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
