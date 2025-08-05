import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md w-full animate__animated animate__fadeIn animate__duration-1000">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInDown animate__delay-500">404 - Not Found</h2>
        <p className="text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-1000">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 animate__animated animate__bounceIn animate__delay-1500"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}