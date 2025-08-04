// "use client"

// import { useState, useEffect } from "react"
// import {
//   Truck,
//   Package,
//   Shield,
//   Clock,
//   Users,
//   Star,
//   Leaf,
//   Award,
//   Target,
//   ArrowRight,
//   Phone,
//   MessageCircle,
//   Menu,
//   X,
//   Mail,
//   MapPin,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   CheckCircle,
//   Globe,
//   TrendingUp,
//   Heart,
//   PlayCircle,
//   Sparkles,
//   ArrowUpRight,
//   Quote,
//   Calendar,
//   LocateIcon as Location,
// } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// const ModernLandingPage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [heroVisible, setHeroVisible] = useState(false)
//   const [activeService, setActiveService] = useState(0)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }

//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }

//     window.addEventListener("scroll", handleScroll)
//     window.addEventListener("mousemove", handleMouseMove)
//     setHeroVisible(true)

//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//       window.removeEventListener("mousemove", handleMouseMove)
//     }
//   }, [])

//   const services = [
//     {
//       title: "Packers & Movers",
//       description:
//         "Comprehensive relocation services with expert packing, secure transport, and careful handling of your belongings.",
//       features: ["Professional Packing", "Secure Transport", "Timely Delivery", "Insurance Coverage"],
//       icon: Package,
//       gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
//       iconBg: "from-violet-500 to-purple-600",
//     },
//     {
//       title: "Goods Transportation",
//       description:
//         "Full-service goods transport including loading, moving, and unloading for a seamless logistics experience.",
//       features: ["Loading & Unloading", "Real-time Tracking", "Flexible Scheduling", "Damage Protection"],
//       icon: Truck,
//       gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
//       iconBg: "from-blue-500 to-cyan-600",
//     },
//   ]

//   const values = [
//     {
//       icon: Leaf,
//       title: "Sustainability",
//       description:
//         "Committed to eco-friendly practices and reducing our carbon footprint through efficient route planning.",
//       color: "from-emerald-500 to-green-600",
//       bgGradient: "from-emerald-50 to-green-50",
//     },
//     {
//       icon: Users,
//       title: "Customer-First",
//       description:
//         "Your satisfaction is our priority. We provide personalized service and maintain open communication.",
//       color: "from-blue-500 to-indigo-600",
//       bgGradient: "from-blue-50 to-indigo-50",
//     },
//     {
//       icon: Award,
//       title: "Reliability",
//       description:
//         "Trusted by hundreds of customers for our consistent, dependable service and commitment to excellence.",
//       color: "from-purple-500 to-violet-600",
//       bgGradient: "from-purple-50 to-violet-50",
//     },
//     {
//       icon: Target,
//       title: "Efficiency",
//       description: "Optimized processes and cutting-edge technology ensure your goods reach their destination safely.",
//       color: "from-orange-500 to-red-600",
//       bgGradient: "from-orange-50 to-red-50",
//     },
//   ]

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Homeowner",
//       content:
//         "eintransport made our cross-country move seamless. Their team was professional, careful, and incredibly efficient.",
//       rating: 5,
//       image: "/placeholder.svg?height=60&width=60&text=SJ",
//       location: "New York",
//     },
//     {
//       name: "Michael Chen",
//       role: "Business Owner",
//       content:
//         "Outstanding service for our office relocation. They handled everything with precision and delivered on time.",
//       rating: 5,
//       image: "/placeholder.svg?height=60&width=60&text=MC",
//       location: "California",
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Family",
//       content:
//         "The best moving experience we've ever had. Stress-free, affordable, and they treated our belongings like their own.",
//       rating: 5,
//       image: "/placeholder.svg?height=60&width=60&text=ER",
//       location: "Texas",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {/* Cursor Follower */}
//       <div
//         className="fixed w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
//         style={{
//           left: mousePosition.x - 12,
//           top: mousePosition.y - 12,
//           transform: `scale(${isScrolled ? 0.5 : 1})`,
//         }}
//       />

//       {/* Header */}
//       <header
//         className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
//           isScrolled ? "bg-white/80 backdrop-blur-2xl shadow-2xl border-b border-gray-100/50" : "bg-transparent"
//         }`}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 md:h-20">
//             <div className="flex items-center space-x-3 group cursor-pointer">
//               <div className="relative">
//                 <div className="absolute -inset-3 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
//                 <Truck className="h-8 w-8 text-amber-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10" />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
//                 eintransport
//               </span>
//             </div>

//             <nav className="hidden md:flex items-center space-x-8">
//               {["Services", "About", "Contact"].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className="relative text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium group py-2"
//                 >
//                   {item}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
//                 </a>
//               ))}
//             </nav>

//             <div className="hidden md:flex gap-3">
//               <Link
//                 href="/goods-transport"
//                 className="relative group overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/25 hover:scale-105"
//               >
//                 <span className="relative z-10 flex items-center">
//                   Goods Transport
//                   <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </Link>
//               <Link
//                 href="/packers-and-movers"
//                 className="relative group overflow-hidden border-2 border-amber-500 text-amber-600 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-amber-500 hover:text-white hover:shadow-2xl hover:shadow-amber-500/25"
//               >
//                 <span className="relative z-10 flex items-center">
//                   Packers & Movers
//                   <Package className="ml-2 h-4 w-4" />
//                 </span>
//               </Link>
//             </div>

//             <button
//               className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors duration-300 relative"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               <div className="relative w-6 h-6">
//                 <Menu
//                   className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
//                     isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
//                   }`}
//                 />
//                 <X
//                   className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
//                     isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
//                   }`}
//                 />
//               </div>
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           <div
//             className={`md:hidden transition-all duration-500 overflow-hidden ${
//               isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//             }`}
//           >
//             <div className="bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl m-4 p-6 border border-gray-100/50">
//               <nav className="flex flex-col space-y-4">
//                 {["Services", "About", "Contact"].map((item) => (
//                   <a
//                     key={item}
//                     href={`#${item.toLowerCase()}`}
//                     className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium py-2 px-4 rounded-xl hover:bg-amber-50"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item}
//                   </a>
//                 ))}
//                 <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
//                   <Link
//                     href="/goods-transport"
//                     className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold text-center"
//                   >
//                     Goods Transport
//                   </Link>
//                   <Link
//                     href="/packers-and-movers"
//                     className="border-2 border-amber-500 text-amber-600 px-6 py-3 rounded-2xl font-semibold text-center"
//                   >
//                     Packers & Movers
//                   </Link>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-amber-50/30 to-orange-50/30 overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0 overflow-hidden">
//           {/* Floating Shapes */}
//           <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
//           <div
//             className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"
//             style={{ animationDelay: "2s" }}
//           ></div>

//           {/* Floating Icons */}
//           <div className="absolute top-32 right-32 opacity-10 animate-float">
//             <Truck className="h-16 w-16 text-amber-600" />
//           </div>
//           <div className="absolute bottom-40 left-16 opacity-10 animate-float" style={{ animationDelay: "1s" }}>
//             <Package className="h-12 w-12 text-orange-600" />
//           </div>
//           <div className="absolute top-1/2 right-1/4 opacity-10 animate-float" style={{ animationDelay: "2s" }}>
//             <Shield className="h-14 w-14 text-blue-600" />
//           </div>

//           {/* Grid Pattern */}
//           <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/20 to-transparent opacity-40"></div>
//         </div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="max-w-6xl mx-auto mt-20 lg:mt-14">
//             <div className="grid lg:grid-cols-2 gap-12 items-center ">
//               {/* Left Content */}
//               <div
//                 className={`transition-all duration-1000 ${
//                   heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
//                 }`}
//               >
//                 {/* <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-semibold mb-6 border border-amber-200/50">
//                   <Sparkles className="w-4 h-4 mr-2" />✨ Trusted by 500+ Happy Customers
//                 </div> */}

//                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//                   <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
//                     Move Forward
//                   </span>
//                   <br />
//                   <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
//                     with Confidence
//                   </span>
//                 </h1>

//                 <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
//                   Experience stress-free transportation and logistics with eintransport. We deliver sustainable,
//                   efficient, and reliable solutions for all your moving needs.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 mb-12">
//                   <button className="group relative bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105">
//                     <span className="relative z-10 flex items-center justify-center">
//                       Get Started Today
//                       <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
//                     </span>
//                     <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </button>

//                   <button className="group border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-2xl font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center">
//                     <PlayCircle className="mr-2 h-5 w-5" />
//                     Watch Demo
//                   </button>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                   {[
//                     { number: "500+", label: "Successful Moves", icon: TrendingUp },
//                     { number: "24/7", label: "Customer Support", icon: Clock },
//                     { number: "100%", label: "Satisfaction Rate", icon: Heart },
//                     { number: "50+", label: "Cities Covered", icon: Globe },
//                   ].map((stat, index) => (
//                     <div key={index} className="text-center group">
//                       <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-amber-200/50">
//                         <stat.icon className="h-6 w-6 text-amber-600" />
//                       </div>
//                       <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">{stat.number}</div>
//                       <div className="text-sm text-gray-600">{stat.label}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Content - Hero Image */}
//               <div
//                 className={`relative transition-all duration-1000 delay-300 ${
//                   heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
//                 }`}
//               >
//                 <div className="relative">
//                   <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
//                   <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
//                     <Image
//                       src="/assets/home.jpg"
//                       alt="Modern Transport Services"
//                       width={600}
//                       height={500}
//                       className="w-full h-auto rounded-2xl"
//                     />

//                     {/* Floating Cards */}
//                     <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 animate-float">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
//                           <CheckCircle className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-semibold text-gray-900">On-Time Delivery</div>
//                           <div className="text-xs text-gray-600">99.9% Success Rate</div>
//                         </div>
//                       </div>
//                     </div>

//                     <div
//                       className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 animate-float"
//                       style={{ animationDelay: "1s" }}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
//                           <Shield className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-semibold text-gray-900">Fully Insured</div>
//                           <div className="text-xs text-gray-600">Complete Protection</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="py-20 bg-gradient-to-br from-white to-gray-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-semibold mb-6 border border-amber-200/50">
//               <Package className="w-4 h-4 mr-2" />
//               Our Services
//             </div>
//             <h2 className="text-3xl md:text-5xl font-bold mb-4">
//               <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 Comprehensive
//               </span>{" "}
//               <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
//                 Solutions
//               </span>
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Discover our comprehensive transportation and logistics solutions designed to meet all your moving needs
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 mb-16">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-white/50 ${
//                   activeService === index ? "ring-2 ring-amber-500/50 shadow-2xl" : ""
//                 }`}
//                 onMouseEnter={() => setActiveService(index)}
//               >
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                 ></div>

//                 <div className="relative z-10">
//                   <div className="text-center mb-6">
//                     <div
//                       className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
//                     >
//                       <service.icon className="w-10 h-10 text-white" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
//                     <p className="text-gray-600 leading-relaxed">{service.description}</p>
//                   </div>

//                   <div className="space-y-3 mb-6">
//                     {service.features.map((feature, idx) => (
//                       <div key={idx} className="flex items-center space-x-3 group/item">
//                         <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
//                           <CheckCircle className="w-3 h-3 text-white" />
//                         </div>
//                         <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-200">
//                           {feature}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <button className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25">
//                     <span className="relative z-10 flex items-center justify-center">
//                       Learn More
//                       <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Service Features Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { icon: Shield, title: "Secure", desc: "Fully insured", gradient: "from-blue-500 to-indigo-600" },
//               { icon: Clock, title: "On Time", desc: "Always punctual", gradient: "from-emerald-500 to-green-600" },
//               {
//                 icon: Users,
//                 title: "Expert Team",
//                 desc: "Skilled professionals",
//                 gradient: "from-purple-500 to-violet-600",
//               },
//               { icon: Star, title: "Premium", desc: "Top quality service", gradient: "from-orange-500 to-red-600" },
//             ].map((item, index) => (
//               <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
//                 <div
//                   className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300`}
//                 >
//                   <item.icon className="h-8 w-8 text-white" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
//                 <p className="text-sm text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-16">
//               <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-semibold mb-6 border border-amber-200/50">
//                 <Users className="w-4 h-4 mr-2" />
//                 About Us
//               </div>
//               <h2 className="text-3xl md:text-5xl font-bold mb-4">
//                 <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">About</span>{" "}
//                 <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
//                   eintransport
//                 </span>
//               </h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//                 We're revolutionizing the transportation and logistics industry with our commitment to sustainability,
//                 reliability, and customer satisfaction.
//               </p>
//             </div>

//             {/* Values Grid */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//               {values.map((value, index) => (
//                 <div
//                   key={index}
//                   className={`group bg-gradient-to-br ${value.bgGradient} border border-white/50 rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
//                 >
//                   <div
//                     className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
//                   >
//                     <value.icon className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
//                   <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Company Stats */}
//             <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-xl border border-amber-100/50">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//                 {[
//                   { number: "5+", label: "Years Experience", icon: Calendar },
//                   { number: "50+", label: "Cities Covered", icon: Location },
//                   { number: "95%", label: "On-Time Delivery", icon: Clock },
//                   { number: "24/7", label: "Support Available", icon: Phone },
//                 ].map((stat, index) => (
//                   <div key={index} className="group">
//                     <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                       <stat.icon className="h-6 w-6 text-white" />
//                     </div>
//                     <div className="text-3xl font-bold text-amber-600 mb-2 group-hover:scale-110 transition-transform duration-300">
//                       {stat.number}
//                     </div>
//                     <div className="text-sm text-gray-600">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-semibold mb-6 border border-amber-200/50">
//               <Quote className="w-4 h-4 mr-2" />
//               Testimonials
//             </div>
//             <h2 className="text-3xl md:text-5xl font-bold mb-4">
//               <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">What Our</span>{" "}
//               <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
//                 Customers Say
//               </span>
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50"
//               >
//                 <div className="flex items-center mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-6 leading-relaxed italic">{`"${testimonial.content}"`}</p>
//                 <div className="flex items-center">
//                   <div className="relative">
//                     <Image
//                       src={testimonial.image || "/placeholder.svg"}
//                       alt={testimonial.name}
//                       className="w-12 h-12 rounded-2xl mr-4 shadow-lg"
//                       width={48}
//                       height={48}
//                     />
//                     <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
//                     <p className="text-sm text-gray-600">
//                       {testimonial.role} • {testimonial.location}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-30"></div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Move Forward?</h2>
//             <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
//               Get your free quote today and experience the eintransport difference. Our team is ready to make your next
//               move seamless and stress-free.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
//               <button className="group bg-white text-amber-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
//                 <span className="flex items-center">
//                   Get Free Quote
//                   <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
//                 </span>
//               </button>
//               <button className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300">
//                 <Phone className="mr-2 h-5 w-5 inline" />
//                 Call Now
//               </button>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8 text-center">
//               {[
//                 { icon: Phone, title: "Instant Response", desc: "Get quotes within minutes" },
//                 { icon: MessageCircle, title: "Expert Consultation", desc: "Personalized moving solutions" },
//                 { icon: Calendar, title: "Quick Scheduling", desc: "Book your move today" },
//               ].map((item, index) => (
//                 <div key={index} className="space-y-2 group">
//                   <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 border border-white/30">
//                     <item.icon className="h-6 w-6" />
//                   </div>
//                   <h3 className="font-semibold">{item.title}</h3>
//                   <p className="text-sm opacity-80">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer id="contact" className="bg-gray-900 text-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
//                   <Truck className="h-6 w-6 text-white" />
//                 </div>
//                 <span className="text-2xl font-bold">eintransport</span>
//               </div>
//               <p className="text-sm text-gray-300 leading-relaxed">
//                 Your trusted partner for sustainable and efficient transportation services. Moving forward together
//                 towards a better future.
//               </p>
//               <div className="flex space-x-4">
//                 {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
//                   <div
//                     key={index}
//                     className="w-10 h-10 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-amber-500 hover:to-orange-600 cursor-pointer transition-all duration-300 hover:scale-110"
//                   >
//                     <Icon className="h-5 w-5" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-amber-400">Services</h3>
//               <ul className="space-y-2 text-sm">
//                 {["Packers & Movers", "Goods Transportation", "Local Moving", "Long Distance", "Commercial Moving"].map(
//                   (service) => (
//                     <li key={service}>
//                       <a
//                         href="#"
//                         className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
//                       >
//                         {service}
//                       </a>
//                     </li>
//                   ),
//                 )}
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-amber-400">Company</h3>
//               <ul className="space-y-2 text-sm">
//                 {["About Us", "Our Team", "Careers", "Privacy Policy", "Terms of Service"].map((item) => (
//                   <li key={item}>
//                     <a
//                       href="#"
//                       className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact Info</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-center space-x-3 group">
//                   <div className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-600 transition-all duration-300">
//                     <Phone className="h-4 w-4" />
//                   </div>
//                   <span className="text-gray-300">+1 (555) 123-4567</span>
//                 </div>
//                 <div className="flex items-center space-x-3 group">
//                   <div className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-600 transition-all duration-300">
//                     <Mail className="h-4 w-4" />
//                   </div>
//                   <span className="text-gray-300">info@eintransport.com</span>
//                 </div>
//                 <div className="flex items-start space-x-3 group">
//                   <div className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-600 transition-all duration-300 mt-0.5">
//                     <MapPin className="h-4 w-4" />
//                   </div>
//                   <span className="text-gray-300">
//                     123 Transport Street
//                     <br />
//                     Logistics City, LC 12345
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-sm text-gray-400 mb-4 md:mb-0">© 2024 eintransport. All rights reserved.</p>
//             <div className="flex space-x-6 text-sm">
//               {["Privacy", "Terms", "Cookies"].map((item) => (
//                 <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
//                   {item}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default ModernLandingPage


// import { useState } from "react"

// export default function Component() {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   const testimonials = [
//     {
//       name: "John Doe",
//       initials: "JD",
//       role: "Verified Customer",
//       text: "Exceptional service! The team was professional, efficient, and took great care of our belongings. The move was completed on time and within budget. Highly recommended!",
//     },
//     {
//       name: "Sarah Miller",
//       initials: "SM",
//       role: "Verified Customer",
//       text: "Amazing experience from start to finish. The customer service was outstanding and the movers were careful with all our items. Will definitely use again!",
//     },
//     {
//       name: "Mike Johnson",
//       initials: "MJ",
//       role: "Business Owner",
//       text: "We've used Eintransport for our office relocations multiple times. They're reliable, professional, and always deliver on their promises. Excellent service!",
//     },
//     {
//       name: "Emily Davis",
//       initials: "ED",
//       role: "Homeowner",
//       text: "Moving across the country seemed daunting, but Eintransport made it seamless. Great communication throughout the process and everything arrived safely.",
//     },
//     {
//       name: "Robert Wilson",
//       initials: "RW",
//       role: "Verified Customer",
//       text: "Outstanding value for money. The team was punctual, careful, and went above and beyond to ensure our satisfaction. Couldn't be happier with the service.",
//     },
//   ]

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % testimonials.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
//   }

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index)
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header - keep existing */}
//       <header className="bg-blue-600 text-white py-2 px-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="text-sm">Eintransport</div>
//           <nav className="hidden md:flex space-x-6 text-sm">
//             <a href="#" className="hover:text-blue-200">
//               Home
//             </a>
//             <a href="#" className="hover:text-blue-200">
//               Services
//             </a>
//             <a href="#" className="hover:text-blue-200">
//               About
//             </a>
//             <a href="#" className="hover:text-blue-200">
//               Contact
//             </a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section - keep existing */}
//       <section className="bg-gray-50 py-16 px-4">
//         <div className="container mx-auto text-center max-w-4xl">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             {"Where's it going? We'll take it there."}
//           </h1>
//           <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-8">Fast, Safe, and Hassle-Free.</p>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Professional moving services you can trust. Get your free quote today.
//           </p>
//           <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//             Get a Quote
//           </button>
//         </div>
//       </section>

//       {/* Our Secure Service - keep existing */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-4">
//             Our Secure <span className="text-blue-600">Service</span>
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8 mt-12">
//             <div className="text-center">
//               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Packing & Moving</h3>
//               <p className="text-gray-600 mb-6">
//                 Professional packing and safe transportation of your belongings with full insurance coverage.
//               </p>
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//                 Learn More
//               </button>
//             </div>
//             <div className="text-center">
//               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Transfer</h3>
//               <p className="text-gray-600 mb-6">
//                 Quick and efficient transfer services for your immediate moving needs with tracking support.
//               </p>
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Do Millions Move With Eintransport - keep existing */}
//       <section className="bg-gray-50 py-16 px-4">
//         <div className="container mx-auto max-w-4xl text-center">
//           <h2 className="text-3xl font-bold mb-8">
//             Why Do Millions Move With <span className="text-blue-600">Eintransport?</span>
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             At Eintransport, {"we're"} the trusted choice for millions of families and businesses moving across the
//             country. With over 20 years of experience in the moving industry, our team of trusted movers, reliable
//             vehicles and a focus on quick and safety, we make every move simple, fast, and stress-free. Whether {"it's"}{" "}
//             a single box or a full household, we can serve it all and{" "}
//             <span className="text-blue-600 font-semibold">Are You Ready to Move? We Are.</span>
//           </p>
//         </div>
//       </section>

//       {/* What Our Customers Say - NEW CAROUSEL */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             What Our <span className="text-blue-600">Customers</span> Say
//           </h2>

//           <div className="relative">
//             {/* Carousel Container */}
//             <div className="overflow-hidden rounded-lg">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//               >
//                 {testimonials.map((testimonial, index) => (
//                   <div key={index} className="w-full flex-shrink-0 px-4">
//                     <div className="bg-white p-8 rounded-lg shadow-lg border max-w-4xl mx-auto">
//                       <div className="flex items-center mb-6">
//                         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
//                           <span className="text-blue-600 font-bold text-lg">{testimonial.initials}</span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-lg">{testimonial.name}</h4>
//                           <p className="text-gray-500">{testimonial.role}</p>
//                         </div>
//                       </div>
//                       <p className="text-gray-600 italic text-lg leading-relaxed">"{testimonial.text}"</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
//               aria-label="Previous testimonial"
//             >
//               <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>

//             <button
//               onClick={nextSlide}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
//               aria-label="Next testimonial"
//             >
//               <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>

//           {/* Dots Indicator */}
//           <div className="flex justify-center mt-8 space-x-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-colors ${
//                   index === currentSlide ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section - keep existing */}
//       <section className="bg-gray-50 py-16 px-4">
//         <div className="container mx-auto max-w-4xl">
//           <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions?</h2>
//           <p className="text-center text-gray-600 mb-12">Find answers to common questions about our moving services</p>
//           <div className="space-y-6">
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="font-semibold mb-2">What regions do you serve?</h3>
//               <p className="text-gray-600">
//                 We provide moving services nationwide, covering all major cities and rural areas across the country.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="font-semibold mb-2">How do I get a quote for my move?</h3>
//               <p className="text-gray-600">
//                 You can get a free quote by clicking the {'"Get a Quote"'} button above or calling our customer service
//                 team.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="font-semibold mb-2">Do you provide packing materials?</h3>
//               <p className="text-gray-600">
//                 Yes, we provide all necessary packing materials including boxes, bubble wrap, and protective covers.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="font-semibold mb-2">Are my belongings insured during the move?</h3>
//               <p className="text-gray-600">
//                 All moves include basic coverage, and we offer additional insurance options for valuable items.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer - keep existing */}
//       <footer className="bg-gray-900 text-white py-12 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Eintransport</h3>
//               <p className="text-gray-400 text-sm">
//                 Your trusted moving partner for over 20 years. Fast, safe, and hassle-free moving services.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Services</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Local Moving
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Long Distance
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Packing Services
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Storage
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Contact
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white">
//                     Reviews
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Contact Info</h4>
//               <div className="space-y-2 text-sm text-gray-400">
//                 <p>📞 1-800-MOVE-NOW</p>
//                 <p>✉️ info@eintransport.com</p>
//                 <p>📍 123 Moving St, City, State 12345</p>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
//             <p>&copy; 2024 Eintransport. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

"use client"

import { ArrowBigRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const testimonials = [
    {
      name: "John Doe",
      initials: "JD",
      role: "Verified Customer",
      text: "Exceptional service! The team was professional, efficient, and took great care of our belongings. The move was completed on time and within budget. Highly recommended!",
    },
    {
      name: "Sarah Miller",
      initials: "SM",
      role: "Verified Customer",
      text: "Amazing experience from start to finish. The customer service was outstanding and the movers were careful with all our items. Will definitely use again!",
    },
    {
      name: "Mike Johnson",
      initials: "MJ",
      role: "Business Owner",
      text: "We've used Eintransport for our office relocations multiple times. They're reliable, professional, and always deliver on their promises. Excellent service!",
    },
    {
      name: "Emily Davis",
      initials: "ED",
      role: "Homeowner",
      text: "Moving across the country seemed daunting, but Eintransport made it seamless. Great communication throughout the process and everything arrived safely.",
    },
    {
      name: "Robert Wilson",
      initials: "RW",
      role: "Verified Customer",
      text: "Outstanding value for money. The team was punctual, careful, and went above and beyond to ensure our satisfaction. Couldn't be happier with the service.",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
      }, 1000) // Change slide every 4 seconds

      return () => clearInterval(interval)
    }
  }, [isPaused, testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - keep existing */}
      <header className="bg-[#F0F0F0] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl text-[#0086FF]">Eintransport</div>

        </div>
      </header>

      {/* Hero Section - keep existing */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {"Where's it going? We'll take it there."}
          </h1>
          <p className="text-[48px] md:text-[48px] text-blue-700 font-semibold mb-8">Fast, Safe, and Hassle-Free.</p>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional moving services you can trust. Get your free quote today.
          </p>
          <div className="block text-center justify-center flex-row">
            <p className="text-center justify-center mx-auto flex w-fit p-2 text-gray-600 bg-[#d8edff] ">
              Pakers & Movers
            </p>
            <br ></br>
            <section className="">
              <input placeholder="Pickup Location"></input>
              <input placeholder="Drop Location"></input>

            </section>
            <br></br>
            <button className="flex mx-auto p-2 bg-[#0086FF] text-white text-md">
              {/* <Image src="/assets/right.png" className="text-white" alt="Right arrow" width={24} height={24} color="white" />   */}
              <ArrowBigRight className="h-5 w-5 mr-2" />
              <span className="text-white font-semibold flex items-center">
                Let's Move
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Our Secure Service - keep existing */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Secure <span className="text-blue-600">Service</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 ">Packing & Moving</h3>
              <p className="text-gray-600 mb-6">
                Professional packing and safe transportation of your belongings with full insurance coverage.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transfer</h3>
              <p className="text-gray-600 mb-6">
                Quick and efficient transfer services for your immediate moving needs with tracking support.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Do Millions Move With Eintransport - keep existing */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">
            Why Do Millions Move With <span className="text-blue-600">Eintransport?</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At Eintransport, {"we're"} the trusted choice for millions of families and businesses moving across the
            country. With over 20 years of experience in the moving industry, our team of trusted movers, reliable
            vehicles and a focus on quick and safety, we make every move simple, fast, and stress-free. Whether {"it's"}{" "}
            a single box or a full household, we can serve it all and{" "}
            <span className="text-blue-600 font-semibold">Are You Ready to Move? We Are.</span>
          </p>
        </div>
      </section>

      {/* What Our Customers Say - NEW CAROUSEL */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our <span className="text-blue-600">Customers</span> Say
          </h2>

          <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white p-8 rounded-lg shadow-lg border max-w-4xl mx-auto">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                          <span className="text-blue-600 font-bold text-lg">{testimonial.initials}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - keep existing */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions?</h2>
          <p className="text-center text-gray-600 mb-12">Find answers to common questions about our moving services</p>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">What regions do you serve?</h3>
              <p className="text-gray-600">
                We provide moving services nationwide, covering all major cities and rural areas across the country.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">How do I get a quote for my move?</h3>
              <p className="text-gray-600">
                You can get a free quote by clicking the {'"Get a Quote"'} button above or calling our customer service
                team.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Do you provide packing materials?</h3>
              <p className="text-gray-600">
                Yes, we provide all necessary packing materials including boxes, bubble wrap, and protective covers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Are my belongings insured during the move?</h3>
              <p className="text-gray-600">
                All moves include basic coverage, and we offer additional insurance options for valuable items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - keep existing */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Eintransport</h3>
              <p className="text-gray-400 text-sm">
                Your trusted moving partner for over 20 years. Fast, safe, and hassle-free moving services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Local Moving
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Long Distance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Packing Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Storage
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 1-800-MOVE-NOW</p>
                <p>✉️ info@eintransport.com</p>
                <p>📍 123 Moving St, City, State 12345</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Eintransport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
