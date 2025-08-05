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
  X,
  Shield,
  Clock,
  Star,
  Truck,
  ChevronDown, ChevronUp 
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
  const { fromLocation, toLocation, setFromLocation, setToLocation } =useLocationContext();
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Original handleLocationSelect logic
  const handleLocationSelect = (locationData: any) => {
    if (showMap === "from") setFromLocation(locationData);
    else if (showMap === "to") setToLocation(locationData);
    setShowMap(null);
  };

  // Original handleLetsMove logic
  const handleLetsMove = () => {
    if (fromLocation || toLocation) {
      // Save to localStorage for transfer (or use context in next page)
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
    { name: "Testimonials", href: "#testimonials" }
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
]

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-2xl font-bold text-[#0086FF] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Eintransport
            </motion.div>

            {/* Desktop Navigation */}

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#0086FF] transition-colors font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-8">
              
              <motion.button
                className="bg-[#0086FF] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Quote
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-[#0086FF] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <button className="w-full mt-4 bg-[#0086FF] text-white py-2 rounded-full hover:bg-blue-700 transition-colors">
                  Get Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 pt-20 px-4 sm:px-6 flex items-center"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto text-center max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <ShinyText
                text="Where's it going? We'll take it there."
                speed={3}
                className="bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900"
              />
            </h1>

            <div className="text-1xl sm:text-2xl md:text-4xl font-semibold mb-8 h-16 flex items-center justify-center">
              <RotatingText
                texts={[
                  "Fast, Safe, and Hassle-Free.",
                  "Secure, Reliable, and Trusted.",
                  "Professional, Quick, and Affordable.",
                ]}
                className="text-[#0086FF] font-bold"
                rotationInterval={6000}
                staggerDuration={0.05}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
              />
            </div>

            
          </motion.div>

          {/* Enhanced Location Selector with Original Logic */}
          <motion.div
            className="bg-[#0086FF] backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-400 px-4 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                🚚 Packers & Movers - Quick Book
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                
                <button
                  className="w-full p-5 border-2 border-gray-200 rounded-2xl bg-white/95 backdrop-blur-sm focus:border-blue-500 focus:outline-none transition-all duration-300 text-lg text-left hover:border-blue-400 hover:shadow-lg group"
                  onClick={() => setShowMap("from")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <MapPin className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <span
                          className={`block ${
                            fromLocation?.address
                              ? "text-gray-900 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {fromLocation?.address ||
                            "Click to select pickup location"}
                        </span>
                        {fromLocation?.address && (
                          <span className="text-sm text-gray-400">
                            Tap to change location
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-blue-500 group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                
                <button
                  className="w-full p-5 border-2 border-gray-200 rounded-2xl bg-white/95 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 text-lg text-left hover:border-green-400 hover:shadow-lg group"
                  onClick={() => setShowMap("to")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <MapPin className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <span
                          className={`block ${
                            toLocation?.address
                              ? "text-gray-900 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {toLocation?.address ||
                            "Click to select drop location"}
                        </span>
                        {toLocation?.address && (
                          <span className="text-sm text-gray-400">
                            Tap to change location
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-green-500 group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <motion.button
                className="w-full sm:w-auto bg-gradient-to-r from-white to-white text-[#0086FF] px-10 py-2 rounded-2xl hover:from-gray-200 hover:to-gray-200 transition-all duration-300 text-lg font-bold shadow-lg flex items-center justify-center group"
                onClick={handleLetsMove}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowBigRight className="h-4 w-4 mr-3 group-hover:translate-x-1 transition-transform" />
                Let's Move
              </motion.button>
            </div>

            {/* Distance & Time Estimate (if both locations selected) */}
            {/* {fromLocation && toLocation && (
              <motion.div
                className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Route Selected</span>
                  </div>
                  <div className="text-gray-600">Estimated: 2-4 hours | ~45 km</div>
                </div>
              </motion.div>
            )} */}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mt-12 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>On-Time Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-indigo-500" />
              <span>Professional Team</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl  text-gray-800 font-bold mb-6">
              Our <span className="text-blue-600">Premium</span> Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience world-class moving services with our professional team
              and state-of-the-art equipment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Packing & Moving",
                description:
                  "We pack it, move, and set it smoothly. Whether you're shifting your home or office, we've got you covered from start to finish.",
                icon: "📦",
                features: [
                  "Professional Packing",
                  "Safe Transportation",
                  "Unpacking Service",
                  "Insurance Coverage",
                ],
              },
              {
                title: "Truck Services",
                description:
                  "Moving stuff? From small loads to big loads, we've got you covered from start to finish.",
                icon: "🚛",
                features: [
                  "Multiple Vehicle Sizes",
                  "Experienced Drivers",
                  "Real-time Tracking",
                  "Flexible Scheduling",
                ],
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center group-hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index === 0 ? "Book Your Move" : "Start Shipping"}
                  <MoveRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section
        id="about"
        className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl text-gray-600 font-bold mb-8">
              Why Do Millions Move With{" "}
              <span className="text-blue-600">Eintransport?</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                At Eintransport, we've helped millions of people and businesses
                move smoothly—from homes shifting to goods transport across
                cities. With a trusted team, reliable vehicles, and a focus on
                quick and safe service, we make every move{" "}
                <span className="text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded">
                  simple, fast, and stress-free
                </span>
                .
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Whether it's a single box or a full truckload, we've done it
                all, and{" "}
                <span className="text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded">
                  Are You Ready to Move? We Are.
                </span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {[
                { number: "1M+", label: "Happy Customers" },
                { number: "50K+", label: "Successful Moves" },
                { number: "5", label: "Cities Covered" },
                { number: "24/7", label: "Support Available" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-gray-600 sm:text-5xl font-bold mb-6">
              What Our <span className="text-blue-600">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real customers
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -100 * testimonials.length] }}
              transition={{
                duration: testimonials.length * 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ width: `${testimonials.length * 200}%` }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-96 bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-600 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl text-gray-600 sm:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Need more clarity? Our team is always here to help you out.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  )}
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.p
                    className="text-gray-700 leading-relaxed mt-4"
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

      {/* Enhanced Footer */}
      <footer
        id="contact"
        className="bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#0086FF]">
                Eintransport
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
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
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    className="p-3 rounded-full bg-gray-800 hover:bg-[#0086FF] transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <link.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Services",
                items: [
                  "Packers & Movers",
                  "Trucks Service",
                  "Local Moving",
                  "Long Distance Moving",
                  "Commercial Moving",
                ],
              },
              {
                title: "Branch",
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
                <h4 className="font-bold text-lg mb-6 text-[#0086FF]">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
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
              <h4 className="font-bold text-lg mb-6 text-[#0086FF]">
                Contact Info
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 rounded-full p-2">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-gray-400">+91 9043384332</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800 rounded-full p-2">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-gray-400">
                    eintransport.order@gmail.com
                  </span>
                </div>
                <div className="mt-6">
                  <h5 className="font-semibold text-[#0086FF] mb-3">
                    Registered Office
                  </h5>
                  <div className="flex gap-3">
                    <div className="bg-gray-800 rounded-full p-2 mt-1">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">
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

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Eintransport. All rights reserved. | Made with ❤️ for
              better transportation
            </p>
          </div>
        </div>
      </footer>

      {/* Original Map Modal Logic */}
      {showMap && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl h-[500px] relative">
            <GMap
              onLocationSelect={handleLocationSelect}
              onBack={() => setShowMap(null)}
            />
            
          </div>
        </div>
      )}
    </div>
  );
}
