import React from "react"

interface LoadingProps {
  message?: string
}

const Loading: React.FC<LoadingProps> = ({ message = "Confirming your order, please wait..." }) => {
  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-[#0086FF] border-blue-600/30 rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-700">{message}</p>
      </div>
    </div>
  )
}

export default Loading