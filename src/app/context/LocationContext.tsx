"use client";
import React, { createContext, useContext, useState } from "react";

type LocationField = {
  address: string;
  lat: number;
  lng: number;
  district?: string;
};

type LocationContextType = {
  fromLocation: LocationField | null;
  toLocation: LocationField | null;
  setFromLocation: (loc: LocationField | null) => void;
  setToLocation: (loc: LocationField | null) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocationContext = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("LocationContext not found");
  return ctx;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fromLocation, setFromLocation] = useState<LocationField | null>(null);
  const [toLocation, setToLocation] = useState<LocationField | null>(null);

  return (
    <LocationContext.Provider value={{ fromLocation, toLocation, setFromLocation, setToLocation }}>
      {children}
    </LocationContext.Provider>
  );
};