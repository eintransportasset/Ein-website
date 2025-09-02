"use client";

import {
  ArrowBigRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MoveRight,
  Phone,
  Youtube,
  ChevronDown,
  MapPinHouse,
} from "lucide-react";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RotatingText from "@/components/RotatingText";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "@/components/test";
import Image from "next/image";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    sessionStorage.setItem("isMove", "false");
    if (sessionStorage.getItem("isMove") === "false") {
      document.cookie = "isMove=false; path=/";
    }

    setIsVisible(true);
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setShowModal(true);
  //   }, 20000); // 20000ms = 20 seconds
  //   return () => clearInterval(timer);
  // }, []);
  
  useEffect(() => {
    // First timeout: trigger after 7 seconds
    const firstTimer = setTimeout(() => {
      setShowModal(true);

      // After the first one, set interval to trigger every 20 seconds
      const intervalTimer = setInterval(() => {
        setShowModal(true);
      }, 20000);

      // Save intervalTimer to clear on cleanup
      // This must be outside setTimeout to be reachable
      return () => clearInterval(intervalTimer);
    }, 7000);

    // Cleanup function
    return () => clearTimeout(firstTimer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLetsMove = () => {
    if (fromAddress || toAddress) {
      // Save to localStorage for transfer
      sessionStorage.setItem("fromAddress", fromAddress);
      sessionStorage.setItem("toAddress", toAddress);
    }
    router.push("/packers-and-movers");
  };

  const testimonials = [
    {
      name: "Anjali M",
      initials: "AM",
      role: "Bangalore",
      text: "Eintransport made my house shifting unbelievably easy. The team arrived on time, packed everything with care, and delivered it safely without a scratch. I didn't have to lift a finger. Totally stress-free!",
    },
    {
      name: "Venkat K",
      initials: "VK",
      role: "Bangalore",
      text: "I booked a mini truck for urgent goods delivery across the city. It was smooth, fast, and affordable. Will definitely book again!",
    },
    {
      name: "Dhanaasager G",
      initials: "DG",
      role: "Chennai",
      text: "I had just a few boxes to move, but they treated it like a priority. Respectful staff, neat work — highly recommended!",
    },
    {
      name: "Kaviyarasan G",
      initials: "KG",
      role: "Kochi",
      text: "I've moved houses before, but never this smoothly. The eintransport team packed everything perfectly and handled my fragile items with care. It felt like I had friends helping me move.",
    },
  ];

  const faqs = [
    {
      question: "What regions do you cover?",
      answer:
        "Our transport services cover Karnataka, Kerala, Tamil Nadu. We also offer long-distance and interstate transport depending on the requirements.",
    },
    {
      question: "What services does Eintransport provide?",
      answer:
        "Eintransport provides two types of services: 1. Packers and Movers services 2. Truck Service for any permitted goods.",
    },
    {
      question: "Does Eintransport provide Packers and Movers services?",
      answer:
        "Yes, packing cities include Bangalore, Chennai, Coimbatore, Kochi, and Thiruvananthapuram. Delivery depends on the requirements.",
    },
    {
      question: "What type of vehicles do you use?",
      answer:
        "We offer a wide range of vehicles including TATA 407, open-body trucks, and container trucks. Whether you need a small vehicle or a high-capacity one, we'll provide the right fit for your move.",
    },
  ];

  useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "page_view",
      page: "/",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header
        className={`text-white bg-gray-800 py-3 px-4 sm:px-6 md:px-36 sticky top-0 z-50 backdrop-blur-sm transition-all duration-500 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0086FF] hover:scale-105 transition-transform duration-300 cursor-pointer">
            Eintransport
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex text-base sm:text-lg md:text-xl space-x-4 md:space-x-6">
            <a
              href="#services"
              className="text-white hover:text-[#0086FF] transition-colors duration-300 font-medium"
            >
              Service
            </a>
            <a
              href="#about"
              className="text-white hover:text-[#0086FF] transition-colors duration-300 font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-white hover:text-[#0086FF] transition-colors duration-300 font-medium"
            >
              Contact
            </a>
            <a
              href="#faq"
              className="text-white hover:text-[#0086FF] transition-colors duration-300 font-medium"
            >
              FAQ
            </a>
            <Link
              className="text-white hover:text-[#0086FF] transition-colors duration-300"
              href="tel:+919043384332"
            >
              +919043384332
            </Link>
          </nav>
          {/* Hamburger Button */}
          <button
            className="flex sm:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="sm:hidden bg-gray-800 overflow-hidden"
            >
              <div className="flex flex-col items-center space-y-4 py-4">
                <a
                  href="#services"
                  className="text-white w-full flex justify-center px-auto hover:text-[#0086FF] text-lg font-medium transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Service
                </a>
                <a
                  href="#about"
                  className="text-white  w-full flex justify-center hover:text-[#0086FF] text-lg font-medium transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-white  w-full flex justify-center hover:text-[#0086FF] text-lg font-medium transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Contact
                </a>
                <a
                  href="#faq"
                  className="text-white  w-full flex justify-center hover:text-[#0086FF] text-lg font-medium transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  FAQ
                </a>
                <Link
                  className="text-white  w-full flex justify-center hover:text-[#0086FF] text-lg font-medium transition-colors duration-300"
                  href="tel:+919043384332"
                >
                  +919043384332
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-6 flex items-center sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[url('/path-to-your-subtle-pattern.svg')] bg-repeat"></div>
        </div>
        <div className={`container mx-auto max-w-6xl relative z-10`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-12 items-center">
            {/* Left Column: Headings and Subtitle */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="block">Where's it going?</span>
                  <span className="block">We'll take it there.</span>
                </h1>
                <RotatingText
                  texts={["Safe Transport", "On Time", "Reliable"]}
                  mainClassName=" mx-auto sm:px-2 w-fit md:px-3 text-4xl sm:text-7xl font-bold bg-[#0086FF] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "tween", damping: 50, stiffness: 500 }}
                  rotationInterval={2000}
                  animatePresenceMode="wait"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mt-6 text-lg sm:text-xl text-gray-600 max-w-lg mx-auto md:mx-0"
              >
                Get fast and secure moving solutions from professionals. Request
                your free, no-obligation quote today and let us handle the
                shifting.{" "}
              </motion.p>
            </div>

            {/* Right Column: Enhanced Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="bg-white p-8 rounded-2xl shadow-2xl "
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Plan Your Move With Packers & Movers
              </h2>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className="w-full p-4 pl-10 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter pickup address"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="w-full p-4 pl-10 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter drop-off address"
                  />
                  <MapPinHouse className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full cursor-pointer  flex items-center justify-center px-8 py-4 bg-[#0086FF] text-white rounded-lg  transition-colors duration-300 transform text-lg font-semibold"
                  onClick={handleLetsMove}
                  // disabled={!fromAddress || !toAddress}
                >
                  <span className="relative z-10">Let's Move</span>
                  <ArrowBigRight className="relative z-10 h-6 w-6 ml-2" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Secure Service */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2
            className={`text-3xl text-gray-900 sm:text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Our Secure{" "}
            <span className="text-[#0086FF] relative">
              Service
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#0086FF] rounded-full transform scale-x-0 animate-scale-x animation-delay-1000"></div>
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Packing & Moving Card */}
            <div
              className={`group bg-[#F0F0F0] rounded-2xl p-8 sm:p-10 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } animation-delay-200`}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg
                  width="104"
                  height="105"
                  viewBox="0 0 104 105"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <g filter="url(#filter0_dd_28_2099)">
                    <rect
                      x="12"
                      y="2.27979"
                      width="80"
                      height="80"
                      rx="16"
                      fill="#0086FF"
                    />
                    <path
                      d="M50.3333 58.4966C50.8401 58.7892 51.4149 58.9432 52 58.9432C52.5851 58.9432 53.1599 58.7892 53.6667 58.4966L65.3333 51.8299C65.8396 51.5377 66.26 51.1174 66.5526 50.6113C66.8451 50.1053 66.9994 49.5312 67 48.9466V35.6133C66.9994 35.0287 66.8451 34.4546 66.5526 33.9486C66.26 33.4425 65.8396 33.0222 65.3333 32.7299L53.6667 26.0633C53.1599 25.7707 52.5851 25.6167 52 25.6167C51.4149 25.6167 50.8401 25.7707 50.3333 26.0633L38.6667 32.7299C38.1604 33.0222 37.74 33.4425 37.4474 33.9486C37.1549 34.4546 37.0006 35.0287 37 35.6133V48.9466C37.0006 49.5312 37.1549 50.1053 37.4474 50.6113C37.74 51.1174 38.1604 51.5377 38.6667 51.8299L50.3333 58.4966Z"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M52 58.9465V42.2798"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M37.4844 33.9463L52.001 42.2796L66.5177 33.9463"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M44.5 29.3965L59.5 37.9798"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_dd_28_2099"
                      x="0"
                      y="0.279785"
                      width="104"
                      height="104"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="4"
                        operator="erode"
                        in="SourceAlpha"
                        result="effect1_dropShadow_28_2099"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_28_2099"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="3"
                        operator="erode"
                        in="SourceAlpha"
                        result="effect2_dropShadow_28_2099"
                      />
                      <feOffset dy="10" />
                      <feGaussianBlur stdDeviation="7.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect1_dropShadow_28_2099"
                        result="effect2_dropShadow_28_2099"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow_28_2099"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                Packers & Movers
              </h3>
              <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                We pack it, move, and set it smoothly. Whether you're shifting
                your home or office, we've got you covered from start to finish.
              </p>
              <Link
                href="/packers-and-movers"
                className="group inline-flex items-center bg-[#0086FF] text-white px-8 py-4 rounded-xl  transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold"
              >
                Book Your Move
                <MoveRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Trucks Card */}
            <div
              className={`group bg-[#F0F0F0] rounded-2xl p-8 sm:p-10 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } animation-delay-400`}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg
                  width="104"
                  height="105"
                  viewBox="0 0 104 105"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <g filter="url(#filter0_dd_28_2113)">
                    <rect
                      x="12"
                      y="2.27979"
                      width="80"
                      height="80"
                      rx="16"
                      fill="#0086FF"
                    />
                    <path
                      d="M55.332 52.2796V32.2796C55.332 31.3956 54.9808 30.5477 54.3557 29.9226C53.7306 29.2975 52.8828 28.9463 51.9987 28.9463H38.6654C37.7813 28.9463 36.9335 29.2975 36.3083 29.9226C35.6832 30.5477 35.332 31.3956 35.332 32.2796V50.613C35.332 51.055 35.5076 51.4789 35.8202 51.7915C36.1327 52.104 36.5567 52.2796 36.9987 52.2796H40.332"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M57 52.2798H47"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M63.6654 52.2799H66.9987C67.4407 52.2799 67.8646 52.1044 68.1772 51.7918C68.4898 51.4792 68.6654 51.0553 68.6654 50.6133V44.5299C68.6647 44.1517 68.5354 43.785 68.2987 43.4899L62.4987 36.2399C62.3428 36.0447 62.1451 35.8871 61.92 35.7786C61.695 35.6701 61.4485 35.6136 61.1987 35.6133H55.332"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M60.3333 55.613C62.1743 55.613 63.6667 54.1206 63.6667 52.2796C63.6667 50.4387 62.1743 48.9463 60.3333 48.9463C58.4924 48.9463 57 50.4387 57 52.2796C57 54.1206 58.4924 55.613 60.3333 55.613Z"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M43.6654 55.613C45.5063 55.613 46.9987 54.1206 46.9987 52.2796C46.9987 50.4387 45.5063 48.9463 43.6654 48.9463C41.8244 48.9463 40.332 50.4387 40.332 52.2796C40.332 54.1206 41.8244 55.613 43.6654 55.613Z"
                      stroke="white"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_dd_28_2113"
                      x="0"
                      y="0.279785"
                      width="104"
                      height="104"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="4"
                        operator="erode"
                        in="SourceAlpha"
                        result="effect1_dropShadow_28_2113"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_28_2113"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="3"
                        operator="erode"
                        in="SourceAlpha"
                        result="effect2_dropShadow_28_2113"
                      />
                      <feOffset dy="10" />
                      <feGaussianBlur stdDeviation="7.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect1_dropShadow_28_2113"
                        result="effect2_dropShadow_28_2113"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect2_dropShadow_28_2113"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                Trucks
              </h3>
              <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                Moving stuff? From small loads to big loads, we've got you
                covered from start to finish.
              </p>
              <Link
                href="/trucks-service"
                className="group inline-flex items-center bg-[#0086FF] text-white px-8 py-4 rounded-xl  transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold"
              >
                Start Shipping
                <MoveRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* carosal */}
      <section id="" className=" px-4 sm:px-6 bg-white">
        <div className="items-center flex justify-center font-semibold text-2xl">
          <h2
            className={`text-3xl text-gray-900 sm:text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Moving Made <span className="text-[#0086FF] relative">Easy</span>
          </h2>

          {/* <h1 className="text-black items-center"> </h1> */}
        </div>
        <Carousel />
      </section>

      {/* Why Do Millions Move With Eintransport */}
      <section
        id="about"
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-24 px-4 sm:px-6"
      >
        <div
          className={`container mx-auto max-w-6xl text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } animation-delay-600`}
        >
          <h2 className="text-gray-900 text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-12 leading-tight">
            Why Do Millions Move With{" "}
            <span className="text-[#0086FF] relative">
              Eintransport?
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#0086FF] rounded-full transform scale-x-0 animate-scale-x animation-delay-1200"></div>
            </span>
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-white/20">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed">
              At Eintransport, we've helped millions of people and businesses
              move smoothly—from homes shifting to goods transport across
              cities. With a trusted team, reliable vehicles, and a focus on
              quick and safe service, we make every move{" "}
              <span className="text-[#0086FF] font-bold bg-blue-50 px-2 py-1 rounded-lg">
                simple, fast, and stress-free
              </span>
              . Whether it's a single box or a full truckload, we've done it
              all, and{" "}
              <Link
                href={"/packers-and-movers"}
                prefetch
                className="text-[#0086FF] underline hover:text-blue-800 font-bold bg-blue-50 px-2 py-1 rounded-lg"
              >
                Are You Ready to Move? We Are.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* single Image */}
      <section className="py-6 h-screen w-full px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <h2
            className={`text-3xl text-gray-900 sm:text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Service <span className="text-[#0086FF] relative">Spotlight</span>
          </h2>
        </div>

        <div className="relative w-full h-full">
          <Image
            src="/images/dual.png"
            alt="hero"
            fill
            className="object-cover" // or object-cover depending on what you need
          />
        </div>
      </section>

      {/* What Our Customers Say - Enhanced Marquee */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        {/* <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-900"> */}
        <div className="container mx-auto max-w-7xl">
          <h2
            className={`text-3xl text-gray-900 sm:text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            } animation-delay-800`}
            // className={`text-3xl text-white sm:text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} animation-delay-800`}
          >
            What Our{" "}
            <span className="text-[#0086FF] relative">
              Customers
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#0086FF] rounded-full transform scale-x-0 animate-scale-x animation-delay-1400"></div>
            </span>{" "}
            Say
          </h2>

          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex animate-marquee hover:pause-animation"
              style={{
                width: `${testimonials.length * 2 * 420}px`, // multiply by 2 since we duplicate
                animationDuration: `${testimonials.length * 15}s`,
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-4 py-4"
                  style={{ width: "420px" }}
                >
                  <div className="bg-gray-100 p-8 rounded-2xl shadow-lg border border-gray-100 h-80 flex flex-col hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#0086FF] font-bold text-lg">
                          {testimonial.initials}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-lg text-[#0086FF] break-words">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 font-medium break-words">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic text-base leading-relaxed overflow-hidden flex-1 break-words">
                      {`"${testimonial.text}"`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section
        id="faq"
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 sm:py-24 px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-4xl">
          <h2
            className={`text-3xl text-gray-900 sm:text-4xl md:text-5xl font-bold text-center mb-6 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            } animation-delay-1000`}
          >
            Frequently Asked Questions?
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Need more clarity? Our team is always here to help you out.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${1200 + index * 200}ms` }}
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                >
                  <h3 className="font-bold text-lg text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-6 w-6 text-[#0086FF] transition-transform duration-300 flex-shrink-0 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedFaq === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 border-t border-gray-100">
                    <p className="text-gray-600 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-white py-6  px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } animation-delay-1600`}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                Eintransport
              </h3>
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                Your trusted partner for sustainable and efficient
                transportation services. Moving forward together towards a
                better future.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    href: "https://www.facebook.com/share/1CMLVRUx1y/",
                    icon: Facebook,
                  },
                  { href: "https://youtube.com/@eintransport", icon: Youtube },
                  {
                    href: "https://www.instagram.com/eintransport_pvt_ltd",
                    icon: Instagram,
                  },
                  {
                    href: "https://www.linkedin.com/company/eintransport/",
                    icon: Linkedin,
                  },
                ].map((link, index) => (
                  <Link
                    target="_blank"
                    href={link.href}
                    key={index}
                    className="p-3 rounded-2xl bg-[#1E2939] hover:bg-[#0086FF] transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    <link.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
              <div className=" border-gray-800 mt-4 pt-8 text-left hover:underline hover:text-gray-400">
                {/* <p className="text-gray-400">Check for Privacy policy</p> */}
                <a
                  href="https://docs.google.com/document/d/1ZjkzdEuBJaLggLBb6QeJlw_hluWLuRpqUZKTMfFxxO4/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="text-gray-400">Check for Privacy policy</p>
                </a>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } animation-delay-1800`}
            >
              <h4 className="font-bold text-xl mb-6 text-[#0086FF]">
                Services
              </h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  { name: "Packers & Movers", href: "/packers-and-movers" },
                  { name: "Trucks Service", href: "/trucks-service" },
                  { name: "Local Moving", href: "/packers-and-movers" },
                  { name: "Long Distance Moving", href: "/packers-and-movers" },
                  { name: "Commercial Moving", href: "/packers-and-movers" },
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } animation-delay-2000`}
            >
              <h4 className="font-bold text-xl mb-6 text-[#0086FF]">Branch</h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  "Bangalore",
                  "Chennai",
                  "Coimbatore",
                  "Kochi",
                  "Thiruvananthapuram",
                ].map((city, index) => (
                  <li
                    key={index}
                    className="hover:text-white hover:translate-x-2 transition-all duration-300"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`transition-all lg:-ml-20  duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } animation-delay-2200`}
            >
              <h4 className="font-bold text-xl mb-6 text-[#0086FF]">
                Contact Info
              </h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex gap-3 items-center text-center group">
                  <span className="bg-[#1E2939] rounded-xl p-3 text-white group-hover:bg-[#0086FF] transition-colors duration-300">
                    <Phone width={18} height={18} />
                  </span>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3">
                      <Link
                        className="hover:text-white transition-colors duration-300"
                        href="tel:+919489847336"
                      >
                        +91 9489847336
                      </Link>
                    </div>
                    <Link
                      className="hover:text-white transition-colors duration-300"
                      href="tel:+919043384332"
                    >
                      +91 9043384332
                    </Link>
                  </div>
                </div>

                <div className="flex gap-3 items-center group">
                  <span className="bg-[#1E2939] rounded-xl p-3 text-white group-hover:bg-[#0086FF] transition-colors duration-300">
                    <Mail width={18} height={18} />
                  </span>
                  <Link
                    className="hover:text-white transition-colors duration-300 break-all"
                    href="mailto:eintransport.booking@gmail.com"
                  >
                    eintransport.booking@gmail.com
                  </Link>
                </div>

                <h4 className="font-bold text-[#0086FF] mt-6 mb-4">
                  Registered office
                </h4>
                <div className="flex gap-3 items-start group">
                  <span className="bg-[#1E2939] rounded-xl p-3 text-white shrink-0 mt-1 group-hover:bg-[#0086FF] transition-colors duration-300">
                    <MapPin width={18} height={18} />
                  </span>
                  <p className="text-gray-400 leading-relaxed">
                    No. 1, 3rd Floor, Joseph K Building Huskur, Electronics
                    City, Bangalore South, Bangalore – 560100
                    <br />
                    Karnataka, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400"> </p>
            <p className="text-gray-400">
              &copy; 2025 Eintransport. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-opacity-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="bg-blue-100 p-8 rounded-2xl shadow-2xl relative w-3/4 lg:max-w-xl h-auto"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 cursor-pointer right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Plan Your Move With Packers & Movers
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={fromAddress}
                  onChange={(e) => setFromAddress(e.target.value)}
                  className="w-full p-4 pl-10 text-gray-700 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter pickup address"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  className="w-full p-4 pl-10 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter drop-off address"
                />
                <MapPinHouse className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full cursor-pointer flex items-center justify-center px-8 py-4 bg-[#0086FF] text-white rounded-lg transition-colors duration-300 transform text-lg font-semibold"
                onClick={handleLetsMove}
              >
                <span className="relative z-10">Let's Move</span>
                <ArrowBigRight className="relative z-10 h-6 w-6 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
