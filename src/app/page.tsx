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
  Menu,
  Milestone,
  X,
  // Shield,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  LocateFixed,
  CheckCircle,
  Truck,
  // Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import RotatingText from "@/components/rotating-text";
import GMap from "@/components/map";
import { useLocationContext } from "@/app/context/LocationContext";
import ShinyText from "@/components/shiny-text";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMap, setShowMap] = useState<"from" | "to" | null>(null);
  const { fromLocation, toLocation, setFromLocation, setToLocation } =
    useLocationContext();
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLocationSelect = (locationData: any) => {
    if (showMap === "from") setFromLocation(locationData);
    else if (showMap === "to") setToLocation(locationData);
    setShowMap(null);
  };

  const handleLetsMove = () => {
    if (fromLocation || toLocation) {
      localStorage.setItem("fromLocation", JSON.stringify(fromLocation));
      localStorage.setItem("toLocation", JSON.stringify(toLocation));
    }
    if (!fromLocation) {
      localStorage.removeItem("fromLocation");
    }
    if (!toLocation) {
      localStorage.removeItem("toLocation");
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
      role: "Coimbatore",
      text: "I've moved houses before, but never this smoothly. The eintransport team packed everything perfectly and handled my fragile items with care. It felt like I had friends helping me move.",
    },
  ];

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Premium Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-gray-100"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              className="text-3xl font-black bg-gradient-to-r from-[#0086FF] to-blue-700 bg-clip-text text-transparent cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Eintransport
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 hover:text-[#0086FF] transition-all duration-300 font-semibold group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0086FF] transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-6 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-4 text-gray-700 hover:text-[#0086FF] transition-colors font-semibold text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Premium Hero Section */}
      <section
        id="home"
        className="relative min-h-screen pt-24 px-6 lg:px-8 flex items-center overflow-hidden"
      >
        {/* Enhanced Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#0086FF]/20 to-blue-300/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [360, 180, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0086FF]/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto text-center max-w-7xl relative justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* <motion.div
              className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-[#0086FF]/10 to-blue-100/50 rounded-full border border-[#0086FF]/20 backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Award className="w-5 h-5 text-[#0086FF] mr-2" />
              <span className="text-[#0086FF] font-semibold text-sm">Premium Transport Solutions</span>
            </motion.div> */}

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              <ShinyText
                text="Where's it going? We'll take it there."
                speed={3}
                className="bg-clip-text bg-gradient-to-r from-gray-900 via-[#0086FF] to-gray-900"
              />
            </h1>

            <div className="text-xl sm:text-2xl lg:text-4xl font-bold mb-12 h-20 flex items-center justify-center">
              <RotatingText
                texts={[
                  "Fast, Safe, and Hassle-Free.",
                  "Secure, Reliable, and Trusted.",
                  "Professional, Quick, and Affordable.",
                ]}
                className="text-[#0086FF] font-black"
                rotationInterval={6000}
                staggerDuration={0.05}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
              />
            </div>
          </motion.div>

          {/* Premium Location Selector */}
          <motion.div
            className="relative bg-white/80 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/50 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
              boxShadow:
                "0 25px 50px -12px rgba(0, 134, 255, 0.25), 0 0 0 1px rgba(255,255,255,0.3)",
            }}
          >
            <motion.div
              className="flex items-center justify-center mb-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <div className="bg-blue-600/90 gap-2 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg flex items-center">
                <Milestone />
                Packers & Movers - Booking
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  className="w-full p-8 border-2 border-gray-200 rounded-2xl bg-gradient-to-br from-white to-gray-50 focus:border-[#0086FF] focus:outline-none transition-all duration-500 text-left hover:border-[#0086FF] hover:shadow-xl group relative overflow-hidden"
                  onClick={() => setShowMap("from")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0086FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-gray-500 mb-1">
                          PICKUP LOCATION
                        </span>
                        <span
                          className={`block font-bold ${
                            fromLocation?.address
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {fromLocation?.address || "Select your pickup point"}
                        </span>
                        {fromLocation?.address && (
                          <span className="text-sm text-[#0086FF] font-medium">
                            Tap to modify location
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[#0086FF] group-hover:translate-x-2 transition-transform duration-300">
                      <LocateFixed className="w-6 h-6" />
                    </div>
                  </div>
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  className="w-full p-8 border-2 border-gray-200 rounded-2xl bg-gradient-to-br from-white to-gray-50 focus:border-blue-500 focus:outline-none transition-all duration-500 text-left hover:border-blue-500 hover:shadow-xl group relative overflow-hidden"
                  onClick={() => setShowMap("to")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-gray-500 mb-1">
                          DROP LOCATION
                        </span>
                        <span
                          className={`block font-bold ${
                            toLocation?.address
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {toLocation?.address || "Select your destination"}
                        </span>
                        {toLocation?.address && (
                          <span className="text-sm text-blue-600 font-medium">
                            Tap to modify location
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-blue-500 group-hover:translate-x-2 transition-transform duration-300">
                      <LocateFixed className="w-6 h-6" />
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Premium Action Button */}
            <div className="flex justify-center">
              <motion.button
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-5 rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-500 font-bold shadow-2xl flex items-center group relative overflow-hidden"
                onClick={handleLetsMove}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* <Zap className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" /> */}
                <span className="relative">Let's Move</span>
                <Truck className="h-4 w-4 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>

          {/* Premium Trust Indicators */}
          {/* <motion.div
            className="flex flex-wrap justify-center items-center gap-12 mt-16 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { icon: Shield, text: "100% Secure", color: "text-blue-500" },
              { icon: Clock, text: "On-Time Delivery", color: "text-[#0086FF]" },
              { icon: Star, text: "5-Star Rated", color: "text-yellow-500" },
              { icon: Users, text: "Expert Team", color: "text-purple-500" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/50 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className="font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </section>

      {/* Premium Services Section */}
      <section
        id="services"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-[#0086FF]/10 to-blue-100/50 rounded-full border border-[#0086FF]/20"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Award className="w-5 h-5 text-[#0086FF] mr-2" />
              <span className="text-[#0086FF] font-semibold">
                Our Services
              </span>
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8">
              Luxury <span className="text-[#0086FF]">Transport</span> Solutions
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience world-class moving services with our professional team
              and state-of-the-art equipment designed for premium comfort.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Packing & Moving",
                description:
                  "Service from start to finish. Our expert team handles everything with precision and care, ensuring your belongings arrive in perfect condition.",
                icon: "📦",
                gradient: "from-[#0086FF] to-blue-600",
                features: [
                  "Professional Packing Materials",
                  "Climate-Controlled Transport",
                  "White-Glove Unpacking",
                  "Comprehensive Insurance",
                  "Real-time GPS Tracking",
                  "24/7 Customer Support",
                ],
              },
              {
                title: "Executive Truck Services",
                description:
                  "Premium Fleet management for all your cargo needs. From small packages to large shipments, we deliver with excellence and reliability.",
                icon: "🚛",
                gradient: "from-indigo-500 to-purple-600",
                features: [
                  "Vehicle Fleet",
                  "Certified Professional Drivers",
                  "Advanced Route Optimization",
                  "Flexible Scheduling Options",
                  "Load Securing Technology",
                  "Express Delivery Available",
                ],
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="group relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-700 overflow-hidden"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative">
                  <div className="text-8xl mb-8 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>

                  <h3 className="text-3xl font-black mb-6 text-gray-900">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-5 h-5 text-[#0086FF] flex-shrink-0" />
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    className={`bg-gradient-to-r ${service.gradient} text-white px-10 py-4 rounded-2xl hover:shadow-2xl transition-all duration-500 font-bold text-lg flex items-center group-hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (index === 0) {
                        router.push("/packers-and-movers");
                      } else {
                        router.push("/goods-transport");
                      }
                    }}
                  >
                    {index === 0
                      ? "Book Move"
                      : "Start Shipping"}
                    <MoveRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium About Section */}
      <section
        id="about"
        className="bg-gradient-to-br from-[#0086FF]/5 via-blue-50/50 to-indigo-50/30 py-32 px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 mb-8 bg-white/80 backdrop-blur-sm rounded-full border border-[#0086FF]/20 shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Users className="w-5 h-5 text-[#0086FF] mr-2" />
              <span className="text-[#0086FF] font-semibold">
                Trusted by Millions
              </span>
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-10">
              Why Choose <span className="text-[#0086FF]">Eintransport</span>
            </h2>

            <div className="max-w-5xl mx-auto space-y-8">
              <p className="text-2xl text-gray-700 leading-relaxed">
                At Eintransport, we've revolutionized the moving industry by
                combining cutting-edge technology with personalized service. Our
                 approach ensures every move is executed with {" "}
                <span className="text-[#0086FF] font-bold bg-[#0086FF]/10 px-4 py-2 rounded-xl">
                  precision, care, and excellence
                </span>
                .
              </p>

              {/* <p className="text-2xl text-gray-700 leading-relaxed">
                From single items to complete relocations, we treat every project as our most important mission.
                Experience the difference of{" "}
                <span className="text-[#0086FF] font-bold bg-[#0086FF]/10 px-4 py-2 rounded-xl">
                  premium transport solutions
                </span>
                .
              </p> */}
            </div>

            {/* Premium Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
              {[
                { number: "1M+", label: "Successful Moves", icon: Users },
                {
                  number: "50K+",
                  label: "Customers",
                  icon: CheckCircle,
                },
                { number: "5", label: "Major Cities", icon: MapPin },
                { number: "24/7", label: "Elite Support", icon: Clock },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <stat.icon className="w-8 h-8 text-[#0086FF] mx-auto mb-4" />
                  <div className="text-4xl lg:text-5xl font-black text-[#0086FF] mb-3">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section id="testimonials" className="py-32 px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-[#0086FF]/10 to-blue-100/50 rounded-full border border-[#0086FF]/20"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Star className="w-5 h-5 text-[#0086FF] mr-2" />
              <span className="text-[#0086FF] font-semibold">
                Customer Stories
              </span>
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8">
              What Our <span className="text-[#0086FF]">Customers</span> Say
            </h2>
            <p className="text-2xl text-gray-600">
              Real experiences from our valued clients
            </p>
          </motion.div>

          <div className="relative overflow-hidden rounded-3xl">
            <motion.div
              className="flex gap-8"
              animate={{ x: [0, -100 * testimonials.length] }}
              transition={{
                duration: testimonials.length * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ width: `${testimonials.length * 200}%` }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-96 bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0086FF]/10 to-transparent rounded-full -mr-16 -mt-16"></div>

                  <div className="relative">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0086FF] to-blue-600 rounded-2xl flex items-center justify-center mr-4 text-white font-black text-xl shadow-lg">
                        {testimonial.initials}
                      </div>
                      <div>
                        <h4 className="font-black text-xl text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#0086FF] font-bold text-lg">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 italic leading-relaxed text-lg mb-6">
                      "{testimonial.text}"
                    </p>

                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium FAQ Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50/30 py-32 px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 mb-8 bg-white/80 backdrop-blur-sm rounded-full border border-[#0086FF]/20 shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="w-5 h-5 text-[#0086FF] mr-2" />
              <span className="text-[#0086FF] font-semibold">
                Got Questions?
              </span>
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <p className="text-2xl text-gray-600">
              Everything you need to know about our services
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-3xl shadow-xl border border-white/50 cursor-pointer group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => toggleFAQ(index)}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-xl lg:text-2xl text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0086FF] to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {openIndex === index ? (
                        <ChevronUp className="w-6 h-6 text-white" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.p
                      className="text-gray-700 leading-relaxed mt-6 text-lg"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer
        id="contact"
        className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-black mb-8 bg-gradient-to-r from-[#0086FF] to-blue-400 bg-clip-text text-transparent">
                Eintransport
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Your partner for luxury transportation services. Moving
                forward together towards excellence and innovation.
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
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    className="p-4 rounded-2xl bg-gray-800 hover:bg-[#0086FF] transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <link.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Services",
                items: [
                  "Packers & Movers",
                  "Executive Truck Service",
                  "Local Moving",
                  "Long Distance",
                  "Corporate Relocations",
                ],
              },
              {
                title: "Service Locations",
                items: [
                  "Bangalore",
                  "Chennai",
                  "Coimbatore",
                  "Kochi",
                  "Thiruvananthapuram",
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="font-black text-xl mb-8 text-[#0086FF]">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block text-lg font-medium"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="font-black text-xl mb-8 text-[#0086FF]">
                Contact Details
              </h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#0086FF] to-blue-600 rounded-2xl p-3">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="text-gray-300 text-lg font-medium">
                    +91 9043384332
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#0086FF] to-blue-600 rounded-2xl p-3">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-gray-300 text-lg font-medium">
                    eintransport.order@gmail.com
                  </span>
                </div>
                <div className="mt-8">
                  <h5 className="font-black text-[#0086FF] mb-4 text-lg">
                    Corporate Headquarters
                  </h5>
                  <div className="flex gap-4">
                    <div className="bg-gradient-to-br from-[#0086FF] to-blue-600 rounded-2xl p-3 h-12 mt-1">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      No. 1, 3rd Floor, Joseph K Building
                      <br />
                      Huskur, Electronics City,
                      <br />
                      Bangalore South,
                      <br />
                      Bangalore – 560100
                      <br />
                      Karnataka, India
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-gray-800 pt-10 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2025 Eintransport . All rights reserved. | Crafted
              with ❤️ for exceptional transportation experiences
            </p>
          </div>
        </div>
      </footer>

      {/* Premium Map Modal */}
      {showMap && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-3xl h-[600px] relative border border-gray-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GMap
              onLocationSelect={handleLocationSelect}
              onBack={() => setShowMap(null)}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
