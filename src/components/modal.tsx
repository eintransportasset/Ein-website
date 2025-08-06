const options = [
    {
        value: "Dost",
        label: "Dost",
        metrix: {
            Length: "7 feet",
            Width: "4.8 feet",
            Height: "4.8 feet",
            "Max-load": "1 ton",
        },
    },
    {
        value: "Bada Dost",
        label: "Bada Dost",
        metrix: {
            Length: "8 feet",
            Width: "5 feet",
            Height: "4.8 feet",
            "Max-load": "1.5 tons",
        },
    },
    {
        value: "14 Feet",
        label: "14 Feet",
        metrix: {
            Length: "14 feet",
            Width: "6 feet",
            Height: "6.5 feet",
            "Max-load": "4 tons",
        },
    },
    {
        value: "17 Feet",
        label: "17 Feet",
        metrix: {
            Length: "17 feet",
            Width: "6 feet",
            Height: "6.5 feet",
            "Max-load": "5 tons",
        },
    },
    {
        value: "19 Feet",
        label: "19 Feet",
        metrix: {
            Length: "19 feet",
            Width: "7 feet",
            Height: "7 feet",
            "Max-load": "7 tons",
        },
    },
    {
        value: "22 Feet",
        label: "22 Feet",
        metrix: {
            Length: "22 feet",
            Width: "7.5 feet",
            Height: "7 feet",
            "Max-load": "10 tons",
        },
    },
    {
        value: "12 Tyre",
        label: "12 Tyre",
        metrix: {
            Length: "24 feet",
            Width: "7.3 feet",
            Height: "7 feet",
            "Max-load": "21 tons",
        },
    },
    {
        value: "14 Tyre",
        label: "14 Tyre",
        metrix: {
            Length: "28 feet",
            Width: "7.8 feet",
            Height: "7 feet",
            "Max-load": "25 tons",
        },
    },
    {
        value: "Container 20 Ft",
        label: "Container 20 Ft",
        metrix: {
            Length: "20 feet",
            Width: "8 feet",
            Height: "7 feet",
            "Max-load": "25 tons",
        },
    },
    {
        value: "Container 32 Ft",
        label: "Container 32 Ft",
        metrix: {
            Length: "32 feet",
            Width: "8 feet",
            Height: "8 feet",
            "Max-load": "14 tons",
        },
    },
    {
        value: "32 Feet Open",
        label: "32 Feet Open",
        metrix: {
            Length: "32 feet",
            Width: "8 feet",
            Height: "8 feet",
            "Max-load": "25 tons",
        },
    },
    {
        value: "40 Feet Open",
        label: "40 Feet Open",
        metrix: {
            Length: "40 feet",
            Width: "8 feet",
            Height: "8 feet",
            "Max-load": "32 tons",
        },
    },
];
import React from "react";
import { UseFormSetValue } from 'react-hook-form';
import type { FormData } from "@/app/trucks-service/page"; // ✅ Import instead of redefining



interface ModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selectValue?: UseFormSetValue<FormData>;
}
export default function Modal({ isOpen, setIsOpen, selectValue }: ModalProps) {

    const handleSelect = (value: string) => {
        console.log("Selected value:", value);
        if (selectValue) {
            selectValue("vehicle", value);
        }
        setIsOpen(false);
    };



    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/30 backdrop-blur-md"

                    onClick={() => setIsOpen(false)}>
                    <div className="relative p-6 w-full max-w-5xl max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl dark:bg-gray-700"
                        onClick={(e) => e.stopPropagation()}>

                        <div className=" mt-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className="cursor-pointer transform transition-all duration-300 hover:scale-105
                                             bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden
                                             border border-gray-200 dark:border-gray-600 hover:border-blue-500"
                                >
                                    <div className="p-3">
                                        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                                            {option.label}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                            {Object.entries(option.metrix).map(([key, value], index) => (
                                                <React.Fragment key={index}>
                                                    <div className="text-gray-500 font-medium">{key} :

                                                        <span className="text-gray-700 ml-1 dark:text-gray-300">{value}</span>
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-900 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}