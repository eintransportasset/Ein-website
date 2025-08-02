"use client"

import { useState, useEffect } from "react"
import {
  Truck,
  Package,
  Shield,
  Clock,
  Users,
  Star,
  Leaf,
  Award,
  Target,
  ArrowRight,
  Phone,
  MessageCircle,
  Menu,
  X,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  Zap,
  Globe,
  TrendingUp,
  Heart,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    setHeroVisible(true)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    {
      title: "Packers & Movers",
      description:
        "Comprehensive relocation services with expert packing, secure transport, and careful handling of your belongings.",
      features: ["Professional Packing", "Secure Transport", "Timely Delivery", "Insurance Coverage"],
      icon: Package,
      gradient: "from-[#996414]/10 to-[#DFAC81]/20",
    },
    {
      title: "Goods Transportation",
      description:
        "Full-service goods transport including loading, moving, and unloading for a seamless logistics experience.",
      features: ["Loading & Unloading", "Real-time Tracking", "Flexible Scheduling", "Damage Protection"],
      icon: Truck,
      gradient: "from-[#DFAC81]/10 to-[#996414]/20",
    },
  ]

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Committed to eco-friendly practices and reducing our carbon footprint through efficient route planning and green logistics.",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "Customer-First",
      description:
        "Your satisfaction is our priority. We provide personalized service and maintain open communication throughout your journey.",
      color: "text-blue-600",
    },
    {
      icon: Award,
      title: "Reliability",
      description:
        "Trusted by hundreds of customers for our consistent, dependable service and commitment to excellence.",
      color: "text-purple-600",
    },
    {
      icon: Target,
      title: "Efficiency",
      description:
        "Optimized processes and cutting-edge technology ensure your goods reach their destination quickly and safely.",
      color: "text-orange-600",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "eintransport made our cross-country move seamless. Their team was professional, careful, and incredibly efficient.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=SJ",
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content:
        "Outstanding service for our office relocation. They handled everything with precision and delivered on time.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Family",
      content:
        "The best moving experience we've ever had. Stress-free, affordable, and they treated our belongings like their own.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60&text=ER",
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Truck className="h-8 w-8 text-[#996414] transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -inset-2 bg-[#996414]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                eintransport
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {["Services", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-700 hover:text-[#996414] transition-all duration-300 font-medium group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#996414] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            <div className="hidden gap-2 md:flex">
              <Link href={"/goods-transport"} className="relative bg-gradient-to-r from-[#996414] to-[#DFAC81] text-white px-8 py-3 rounded-full font-semibold overflow-hidden group transition-all duration-300  hover:from-amber-600 hover:to-amber-600 hover:shadow-2xl hover:shadow-[#996414]/25">
                <span className="relative z-10">Goods Transport</span>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-[#DFAC81] to-[#996414] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                {/* <span className="relative z-10">Get Quote</span> */}
              </Link>
              <Link href={"/packers-and-movers"} className="relative bg-gradient-to-r from-[#996414] to-[#DFAC81] text-white px-8 py-3 rounded-full font-semibold overflow-hidden group transition-all duration-300   hover:from-amber-600 hover:to-amber-600 hover:shadow-2xl hover:shadow-[#996414]/25">
                <span className="relative z-10">Packers and Movers</span>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-[#DFAC81] to-[#996414] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                {/* <span className="relative z-10">Get Quote</span> */}
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-gray-700 hover:text-[#996414] transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl m-4 p-6 border border-gray-100">
              <nav className="flex flex-col space-y-4">
                {["Services", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-[#996414] transition-colors duration-300 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="bg-gradient-to-r from-[#996414] to-[#DFAC81] text-white px-6 py-3 rounded-full font-semibold mt-4">
                  Get Quote
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-[#e2bfa3] to-[#e2bfa3] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 opacity-10 animate-bounce" style={{ animationDuration: "3s" }}>
            <Truck className="h-20 w-20 text-[#996414]" />
          </div>
          <div className="absolute bottom-40 left-10 opacity-10 animate-pulse" style={{ animationDelay: "1s" }}>
            <Package className="h-16 w-16 text-[#996414]" />
          </div>
          <div
            className="absolute top-1/2 right-1/4 opacity-10 animate-spin"
            style={{ animationDuration: "8s", animationDelay: "2s" }}
          >
            <Shield className="h-18 w-18 text-[#996414]" />
          </div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#996414]/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div
              className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
            >


              <h1 className="text-4xl md:text-6xl lg:text-7xl mt-10 font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Move Forward with
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#996414] to-[#DFAC81] bg-clip-text text-transparent animate-pulse">
                  Confidence
                </span>
              </h1>

              <div className="mb-2 mt-2">
                <span className="inline-block px-4 py-2 bg-[#996414]/10 text-[#996414] rounded-full text-sm font-semibold mb-4 animate-pulse">
                  ✨ Trusted by 500+ Happy Customers
                </span>
              </div>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience stress-free transportation and logistics with eintransport. We deliver sustainable,
                efficient, and reliable solutions for all your moving needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button className="group relative bg-gradient-to-r from-[#996414] to-[#DFAC81] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#996414]/30 hover:scale-105">
                  <span className="relative z-10 flex items-center">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DFAC81] to-[#996414] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="group border-2 border-[#996414] text-[#996414] px-8 py-4 rounded-full font-semibold hover:bg-[#996414] hover:text-white transition-all duration-300 flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              {[
                { number: "500+", label: "Successful Moves", icon: TrendingUp },
                { number: "24/7", label: "Customer Support", icon: Clock },
                { number: "100%", label: "Satisfaction Rate", icon: Heart },
                { number: "50+", label: "Cities Covered", icon: Globe },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#996414]/10 to-[#DFAC81]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-[#996414]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#996414] mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#996414]/10 text-[#996414] rounded-full text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Comprehensive
              </span>{" "}
              <span className="bg-gradient-to-r from-[#996414] to-[#DFAC81] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive transportation and logistics solutions designed to meet all your moving needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer ${activeService === index ? "ring-2 ring-[#996414]/50 shadow-2xl" : ""
                  }`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#996414]/10 to-[#DFAC81]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-12 h-12 text-[#996414]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 group/item">
                        <CheckCircle className="w-5 h-5 text-[#996414] group-hover/item:scale-110 transition-transform duration-200" />
                        <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full group/btn relative overflow-hidden border-2 border-[#996414] text-[#996414] py-3 rounded-full font-semibold hover:text-white transition-all duration-300">
                    <span className="relative z-10 flex items-center justify-center">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-[#996414] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Service Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Secure", desc: "Fully insured", color: "text-blue-600" },
              { icon: Clock, title: "On Time", desc: "Always punctual", color: "text-green-600" },
              { icon: Users, title: "Expert Team", desc: "Skilled professionals", color: "text-purple-600" },
              { icon: Star, title: "Premium", desc: "Top quality service", color: "text-orange-600" },
            ].map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[#996414]/10 text-[#996414] rounded-full text-sm font-semibold mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">About</span>{" "}
                <span className="bg-gradient-to-r from-[#996414] to-[#DFAC81] bg-clip-text text-transparent">
                  eintransport
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We&apos;re revolutionizing the transportation and logistics industry with our commitment to sustainability,
                reliability, and customer satisfaction. Our mission is to make moving stress-free while protecting our
                planet.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#996414]/10 to-[#DFAC81]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Company Info */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Why Choose eintransport?</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Sustainable Practices",
                      desc: "We prioritize environmental responsibility in every aspect of our operations.",
                      icon: Leaf,
                    },
                    {
                      title: "Advanced Technology",
                      desc: "Real-time tracking and digital management for complete transparency.",
                      icon: Zap,
                    },
                    {
                      title: "Expert Team",
                      desc: "Trained professionals who handle your belongings with utmost care.",
                      icon: Users,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#996414]/10 to-[#DFAC81]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-6 w-6 text-[#996414]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#996414]/5 to-[#DFAC81]/10 rounded-3xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-6 text-center">
                  {[
                    { number: "5+", label: "Years Experience" },
                    { number: "50+", label: "Cities Covered" },
                    { number: "95%", label: "On-Time Delivery" },
                    { number: "24/7", label: "Support Available" },
                  ].map((stat, index) => (
                    <div key={index} className="group">
                      <div className="text-3xl font-bold text-[#996414] mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#996414]/10 text-[#996414] rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">What Our</span>{" "}
              <span className="bg-gradient-to-r from-[#996414] to-[#DFAC81] bg-clip-text text-transparent">
                Customers Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{`"${testimonial.content}"`}</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#996414] to-[#DFAC81] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-32 h-32 border border-white/20 rounded-full animate-bounce"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 right-10 w-16 h-16 border border-white/40 rounded-full animate-spin"
            style={{ animationDuration: "8s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Move Forward?</h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get your free quote today and experience the eintransport difference. Our team is ready to make your next
              move seamless and stress-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-white text-[#996414] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#996414] transition-all duration-300">
                <Phone className="mr-2 h-5 w-5 inline" />
                Call Now
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Phone, title: "Instant Response", desc: "Get quotes within minutes" },
                { icon: MessageCircle, title: "Expert Consultation", desc: "Personalized moving solutions" },
                { icon: ArrowRight, title: "Quick Scheduling", desc: "Book your move today" },
              ].map((item, index) => (
                <div key={index} className="space-y-2 group">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-8 w-8 text-[#996414]" />
                <span className="text-2xl font-bold">eintransport</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Your trusted partner for sustainable and efficient transportation services. Moving forward together
                towards a better future.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <Icon
                    key={index}
                    className="h-5 w-5 text-gray-400 hover:text-[#996414] cursor-pointer transition-colors duration-300 hover:scale-110"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#996414]">Services</h3>
              <ul className="space-y-2 text-sm">
                {["Packers & Movers", "Goods Transportation", "Local Moving", "Long Distance", "Commercial Moving"].map(
                  (service) => (
                    <li key={service}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {service}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#996414]">Company</h3>
              <ul className="space-y-2 text-sm">
                {["About Us", "Our Team", "Careers", "Privacy Policy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#996414]">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 group">
                  <Phone className="h-4 w-4 text-[#996414] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Mail className="h-4 w-4 text-[#996414] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300">info@eintransport.com</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <MapPin className="h-4 w-4 text-[#996414] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300">
                    123 Transport Street
                    <br />
                    Logistics City, LC 12345
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">© 2024 eintransport. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
