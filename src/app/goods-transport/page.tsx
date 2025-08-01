'use client'
import React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'

type FormData = {
  from:string,
  to:string,
  dateTime:string,
  description:string,
  fullName:string,
  phoneNumber:string,
  email?:string
  materials: string
  weight: string
  vehicleRequired: string
}

const Page: React.FC = () => {
  const{register, handleSubmit, formState:{errors}} = useForm<FormData>();

const onSubmit: SubmitHandler<FormData> = async (data) => {
  const payload = {
    ...data,
    targetTab: "goodsTransportRequests", 
  };

  await fetch('https://script.google.com/macros/s/AKfycbznBUean2KxcteAHnClwBerj63SM-sP3qHG-kEM7oncHA8Btk4SNs_ki9xwfstmvGY/exec', {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
        <label>From</label>
        <input {...register("from", { required: "Starting location is required" })} placeholder="Enter starting location" />
        {errors.from && <span className="text-red-500">{errors.from.message}</span>}

        <label>To</label>
        <input {...register("to", { required: "Destination is required" })} placeholder="Enter destination location" />
        {errors.to && <span className="text-red-500">{errors.to.message}</span>}

        <label>Date & Time</label>
        <input type="datetime-local" {...register("dateTime", { required: "Date and time are required" })} />
        {errors.dateTime && <span className="text-red-500">{errors.dateTime.message}</span>}

        <label>Description</label>
        <textarea {...register("description")} placeholder="Enter any additional details" />

        <label>Full Name</label>
        <input {...register("fullName", { required: "Full name is required" })} placeholder="Enter your full name" />
        {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}

        <label>Phone Number</label>
        <input type="tel" {...register("phoneNumber", { required: "Phone number is required" })} placeholder="Enter your phone number" />
        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

        <label>Email (optional)</label>
        <input type="email" {...register("email")} placeholder="Enter your email address" />

        <label>Materials</label>
        <input {...register("materials", { required: "Materials are required" })} placeholder="Enter materials to be transported" />
        {errors.materials && <span className="text-red-500">{errors.materials.message}</span>}

        <label>Weight</label>
        <input type="number" {...register("weight", { required: "Weight is required" })} placeholder="Enter weight of the goods" />
        {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}

        <label>Vehicle Required</label>
        <select {...register("vehicleRequired", { required: "Vehicle requirement is required" })}>
          <option value="">Select vehicle type</option>
          <option value="truck">Truck</option>
          <option value="van">Van</option>
          <option value="bike">Bike</option>
          <option value="other">Other</option>
        </select>
        {errors.vehicleRequired && <span className="text-red-500">{errors.vehicleRequired.message}</span>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;