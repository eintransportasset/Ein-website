// landing page
"use client"

import { ArrowBigRight, Facebook, Instagram, Linkedin, Mail, MapPin, MoveRight, Phone, Youtube } from "lucide-react"
import Link from "next/link"
import GMap from "@/components/map";
import { useLocationContext } from "@/app/context/LocationContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Component() {
  const { fromLocation, toLocation, setFromLocation, setToLocation } = useLocationContext();
  const [showMap, setShowMap] = useState<"from" | "to" | null>(null);
  const router = useRouter();

  const handleLocationSelect = (locationData) => {
    if (showMap === "from") setFromLocation(locationData);
    else if (showMap === "to") setToLocation(locationData);
    setShowMap(null);
  };

  const handleLetsMove = () => {
    // Save to localStorage for transfer (or use context in next page)
    localStorage.setItem("fromLocation", JSON.stringify(fromLocation));
    localStorage.setItem("toLocation", JSON.stringify(toLocation));
    router.push("/packers-and-movers");
  };


  const testimonials = [
    {
      name: "Anjali M",
      initials: "AM",
      role: "Bangalore",
      text: "Eintransport made my house shifting unbelievably easy. The team arrived on time, packed everything with care, and delivered it safely without a scratch. I didn’t have to lift a finger. Totally stress-free!",
    },
    {
      name: "Venkat K",
      initials: "Vk",
      role: "Bangalore",
      text: "I booked a mini truck for urgent goods delivery across the city. It was smooth, fast, and affordable. Will definitely book again!"
    },
    {
      name: "Dhanaasager G",
      initials: "DG",
      role: "Chennai",
      text: "I had just a few boxes to move, but they treated it like a priority. Respectful staff, neat work — highly recommended!"
    },
    {
      name: "Kaviyarasan G",
      initials: "KG",
      role: "Coimbatore",
      text: "I’ve moved houses before, but never this smoothly. The eintransport team packed everything perfectly and handled my fragile items with care. It felt like I had friends helping me move.",
    },
    // {
    //   name: "Robert Wilson",
    //   initials: "RW",
    //   role: "Verified Customer",
    //   text: "Outstanding value for money. The team was punctual, careful, and went above and beyond to ensure our satisfaction. Couldn't be happier with the service.",
    // },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#F0F0F0] text-white py-3 px-4 sm:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-[#0086FF]">Eintransport</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl sm:text-

4xl md:text-5xl font-bold text-gray-900 mb-4">
            {"Where's it going? We'll take it there."}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-blue-700 font-semibold mb-6 sm:mb-8">Fast, Safe, and Hassle-Free.</p>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Professional moving services you can trust. Get your free quote today.
          </p>
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base text-gray-600 bg-[#d8edff] px-4 py-2 rounded-lg">
              Packers & Movers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
              <button
                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-left"
                onClick={() => setShowMap("from")}
              >
                {fromLocation?.address || "Pickup Location"}
              </button>
              <button
                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-left"
                onClick={() => setShowMap("to")}
              >
                {toLocation?.address || "Drop Location"}
              </button>
            </div>
            <button
              className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#0086FF] text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleLetsMove}
              disabled={!fromLocation || !toLocation}
            >
              <ArrowBigRight className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
              <span className="text-sm sm:text-base font-semibold">Let's Move</span>
            </button>
          </div>
        </div>
      </section>

      {/* Our Secure Service */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Our Secure <span className="text-blue-600">Service</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-lg p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                <svg width="104" height="105" viewBox="0 0 104 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_dd_28_2099)">
                    <rect x="12" y="2.27979" width="80" height="80" rx="16" fill="#0086FF" />
                    <path d="M50.3333 58.4966C50.8401 58.7892 51.4149 58.9432 52 58.9432C52.5851 58.9432 53.1599 58.7892 53.6667 58.4966L65.3333 51.8299C65.8396 51.5377 66.26 51.1174 66.5526 50.6113C66.8451 50.1053 66.9994 49.5312 67 48.9466V35.6133C66.9994 35.0287 66.8451 34.4546 66.5526 33.9486C66.26 33.4425 65.8396 33.0222 65.3333 32.7299L53.6667 26.0633C53.1599 25.7707 52.5851 25.6167 52 25.6167C51.4149 25.6167 50.8401 25.7707 50.3333 26.0633L38.6667 32.7299C38.1604 33.0222 37.74 33.4425 37.4474 33.9486C37.1549 34.4546 37.0006 35.0287 37 35.6133V48.9466C37.0006 49.5312 37.1549 50.1053 37.4474 50.6113C37.74 51.1174 38.1604 51.5377 38.6667 51.8299L50.3333 58.4966Z" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M52 58.9465V42.2798" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M37.4844 33.9463L52.001 42.2796L66.5177 33.9463" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M44.5 29.3965L59.5 37.9798" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <filter id="filter0_dd_28_2099" x="0" y="0.279785" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_28_2099" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_28_2099" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_28_2099" />
                      <feOffset dy="10" />
                      <feGaussianBlur stdDeviation="7.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                      <feBlend mode="normal" in2="effect1_dropShadow_28_2099" result="effect2_dropShadow_28_2099" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_28_2099" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Packing & Moving</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                We pack it, move, and set it smoothly. Whether you're shifting your home or office, we've got you covered from start to finish.
              </p>
              <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                Book Your Move <MoveRight className="inline-block ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-lg p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                <svg width="104" height="105" viewBox="0 0 104 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_dd_28_2113)">
                    <rect x="12" y="2.27979" width="80" height="80" rx="16" fill="#0086FF" />
                    <path d="M55.332 52.2796V32.2796C55.332 31.3956 54.9808 30.5477 54.3557 29.9226C53.7306 29.2975 52.8828 28.9463 51.9987 28.9463H38.6654C37.7813 28.9463 36.9335 29.2975 36.3083 29.9226C35.6832 30.5477 35.332 31.3956 35.332 32.2796V50.613C35.332 51.055 35.5076 51.4789 35.8202 51.7915C36.1327 52.104 36.5567 52.2796 36.9987 52.2796H40.332" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M57 52.2798H47" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M63.6654 52.2799H66.9987C67.4407 52.2799 67.8646 52.1044 68.1772 51.7918C68.4898 51.4792 68.6654 51.0553 68.6654 50.6133V44.5299C68.6647 44.1517 68.5354 43.785 68.2987 43.4899L62.4987 36.2399C62.3428 36.0447 62.1451 35.8871 61.92 35.7786C61.695 35.6701 61.4485 35.6136 61.1987 35.6133H55.332" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M60.3333 55.613C62.1743 55.613 63.6667 54.1206 63.6667 52.2796C63.6667 50.4387 62.1743 48.9463 60.3333 48.9463C58.4924 48.9463 57 50.4387 57 52.2796C57 54.1206 58.4924 55.613 60.3333 55.613Z" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M43.6654 55.613C45.5063 55.613 46.9987 54.1206 46.9987 52.2796C46.9987 50.4387 45.5063 48.9463 43.6654 48.9463C41.8244 48.9463 40.332 50.4387 40.332 52.2796C40.332 54.1206 41.8244 55.613 43.6654 55.613Z" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <filter id="filter0_dd_28_2113" x="0" y="0.279785" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_28_2113" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_28_2113" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feMorphology radius="3" operator="erode" in="SourceAlpha" result="effect2_dropShadow_28_2113" />
                      <feOffset dy="10" />
                      <feGaussianBlur stdDeviation="7.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                      <feBlend mode="normal" in2="effect1_dropShadow_28_2113" result="effect2_dropShadow_28_2113" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_28_2113" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Trucks</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                Moving stuff? From small loads to big loads, we've got you covered from start to finish.
              </p>
              <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                Start Shipping
                <MoveRight className="inline-block ml-2 h-4 w-4 animate-shake" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Do Millions Move With Eintransport */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
            Why Do Millions Move With <span className="text-blue-600">Eintransport?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            At Eintransport, we’ve helped millions of people and businesses move smoothly—from homes shifting to goods transport across cities. With a trusted team, reliable vehicles, and a focus on quick and safe service, we make every move <span className="text-blue-600 font-semibold">simple, fast, and stress-free</span>. Whether it’s a single box or a full truckload, we’ve done it all, and <span className="text-blue-600 font-semibold">Are You Ready to Move? We Are.</span>
          </p>
        </div>
      </section>

      {/* What Our Customers Say - Marquee */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            What Our <span className="text-blue-600">Customers</span> Say
          </h2>

          {/* <div className="relative overflow-hidden">
            <div
              className={`flex ${isPaused ? 'animate-none' : 'animate-marquee'}`}
              style={{
                width: `${testimonials.length * 100}%`,
                animationDuration: `${testimonials.length * 10}s`,
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 py-2 sm:px-4"
                  style={{ width: "400px" }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 h-64 sm:h-72 flex flex-col">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 sm:mr-6 flex-shrink-0">
                        <span className="text-blue-600 font-bold text-base sm:text-lg">{testimonial.initials}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-base sm:text-lg break-words">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm sm:text-base break-words">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic text-sm sm:text-xl leading-relaxed overflow-hidden flex-1 break-words">{`"${testimonial.text}"`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className="relative overflow-hidden">
            <div
              className="flex animate-marquee"
              style={{
                width: `${testimonials.length * 100}%`,
                animationDuration: `${testimonials.length * 10}s`,
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 py-2 sm:px-4 marquee-card"
                  style={{ width: "400px" }}
                >
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 h-64 sm:h-72 flex flex-col">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 sm:mr-6 flex-shrink-0">
                        <span className="text-blue-600 font-bold text-base sm:text-lg">{testimonial.initials}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-base sm:text-lg break-words">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm sm:text-base break-words">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic text-sm sm:text-xl leading-relaxed overflow-hidden flex-1 break-words">{`"${testimonial.text}"`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">Frequently Asked Questions?</h2>
          <p className="text-center text-gray-600 text-sm sm:text-base mb-8 sm:mb-12">Need more clarity? Our team is always here to help you out.</p>
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="font-semibold text-base sm:text-lg mb-2">What regions do you cover?</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our transport services cover Karnataka, Kerala, Tamil Nadu. We also offer long-distance and interstate transport depending on the requirements.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="font-semibold text-base sm:text-lg mb-2">What services does Eintransport provide?</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Eintransport provides two types of services: 1. Packers and Movers services 2. Truck Service for any permitted goods.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Does Eintransport provide Packers and Movers services?</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Yes, packing cities include Bangalore, Chennai, Coimbatore, Kochi, and Thiruvananthapuram. Delivery depends on the requirements.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="font-semibold text-base sm:text-lg mb-2">What type of vehicles do you use?</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We offer a wide range of vehicles including TATA 407, open-body trucks, and container trucks. Whether you need a small vehicle or a high-capacity one, we’ll provide the right fit for your move.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">Eintransport</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Your trusted partner for sustainable and efficient transportation services. Moving forward together towards a better future.
              </p>
              <div className="flex space-x-3 mt-4">
                {[
                  { href: "https://www.facebook.com/share/1CMLVRUx1y/", icon: Facebook },
                  { href: "https://youtube.com/@eintransport", icon: Youtube },
                  { href: "https://www.instagram.com/eintransport_pvt_ltd", icon: Instagram },
                  { href: "https://www.linkedin.com/company/eintransport/", icon: Linkedin }
                ].map((link, index) => (
                  <Link
                    target="_blank"
                    href={link.href}
                    key={index}
                    className="p-2 rounded-2xl bg-[#1E2939] hover:bg-[#0086FF] transition-colors"
                  >
                    <link.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-4 text-[#0086FF]">Services</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><a href="#" className="hover:text-white">Packers & Movers</a></li>
                <li><a href="#" className="hover:text-white">Trucks Service</a></li>
                <li><a href="#" className="hover:text-white">Local Moving</a></li>
                <li><a href="#" className="hover:text-white">Long Distance Moving</a></li>
                <li><a href="#" className="hover:text-white">Commercial Moving</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-4 text-[#0086FF]">Branch</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><a href="#" className="hover:text-white">Bangalore</a></li>
                <li><a href="#" className="hover:text-white">Chennai</a></li>
                <li><a href="#" className="hover:text-white">Coimbatore</a></li>
                <li><a href="#" className="hover:text-white">Kochi</a></li>
                <li><a href="#" className="hover:text-white">Thiruvananthapuram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-4 text-[#0086FF]">Contact Info</h4>
              <div className="space-y-3 text-sm sm:text-base text-gray-400">
                <section className="flex gap-2 items-center">
                  <span className="bg-[#1E2939] rounded-[12px] px-2 py-1 text-white">
                    <Phone width={15} />
                  </span>
                  <p>+91 9043384332</p>
                </section>
                <section className="flex gap-2 items-center">
                  <span className="bg-[#1E2939] rounded-[12px] px-2 py-1 text-white">
                    <Mail width={15} />
                  </span>
                  <p>eintransport.order@gmail.com</p>
                </section>
                <h4 className="font-semibold text-[#0086FF] mt-4">Registered office</h4>
                <section className="flex gap-3 items-start">
                  <span className="bg-[#1E2939] rounded-[12px] p-2 text-white shrink-0 mt-1">
                    <MapPin width={15} height={15} />
                  </span>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    No. 1, 3rd Floor, Joseph K Building<br />
                    Huskur, Electronics City,<br />
                    Bangalore South,<br /> Bangalore – 560100<br />
                    Karnataka, India
                  </p>
                </section>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-4 text-center text-sm text-gray-400">
            <p>&copy; 2024 Eintransport. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl h-[500px] relative">
            <GMap
              onLocationSelect={handleLocationSelect}
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
  )
}