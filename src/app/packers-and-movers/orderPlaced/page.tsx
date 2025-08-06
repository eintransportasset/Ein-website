"use client";

import React from 'react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'


export default function OrderConfirmation() {
    useEffect(() => {
        if (localStorage.getItem("fromLocation") || localStorage.getItem("toLocation")) {
            localStorage?.removeItem("fromLocation")
            localStorage?.removeItem("toLocation")

        }
        // localStorage?.removeItem("fromLocation")
        // localStorage?.removeItem("toLocation")


    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-200 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Thank you for your order. We will process it shortly.
                    </p>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                        <Link
                            href="/"
                            className="inline-block bg-[#0086FF] text-white px-6 py-3 rounded-full
                                    hover:bg-blue-700 transition-colors duration-200"
                        >
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}