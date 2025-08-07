// // // D:\Freelance\eintransport\Ein-website\src\components\map.tsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { MapPin, LocateFixed, X } from 'lucide-react';

// Move libraries array outside component to prevent re-creation
const GOOGLE_MAPS_LIBRARIES: ('places')[] = ['places'];

// Get API key with fallback and validation
const getGoogleMapsApiKey = () => {
    if (typeof window !== 'undefined') {
        // Client-side
        return process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    }
    return process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
};

const googleMap_APIKEY = getGoogleMapsApiKey();

const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
};

interface LocationData {
    lat: number;
    lng: number;
    address: string;
    district: string;
}

interface GMapProps {
    onLocationSelect?: (locationData: LocationData) => void;
    onBack?: (value: boolean) => void;
}

function GMap({ onLocationSelect, onBack }: GMapProps) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMap_APIKEY || '',
        libraries: GOOGLE_MAPS_LIBRARIES,
        preventGoogleFontsLoading: true,
    });

    // Add mounted state to prevent hydration issues
    const [isMounted, setIsMounted] = useState(false);

    const [center, setCenter] = useState({
        lat: 11.004556,
        lng: 76.961632,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
    const [isGeocoding, setIsGeocoding] = useState(false);

    // Handle mounting for SSR
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Extract district helper function (regular function, not useCallback since it doesn't use state)
    const extractDistrict = (addressComponents: google.maps.GeocoderAddressComponent[]): string => {
        let district = '';
        addressComponents.forEach((component) => {
            if (
                component.types.includes('administrative_area_level_3') ||
                component.types.includes('locality') ||
                (component.types.includes('political') && component.types.includes('sublocality'))
            ) {
                district = component.long_name;
            }
        });
        return district;
    };

    // Geocode function - MUST be declared before functions that use it
    const geocodePlace = useCallback(async (lat: number, lng: number) => {
        if (!window.google || !window.google.maps || isGeocoding) {
            return;
        }

        setIsGeocoding(true);

        try {
            const geocoder = new window.google.maps.Geocoder();
            const latLng = { lat, lng };

            geocoder.geocode({ location: latLng }, (results, status) => {
                setIsGeocoding(false);

                if (status === 'OK' && results && results[0]) {
                    const district = extractDistrict(results[0].address_components);

                    const locationData: LocationData = {
                        lat,
                        lng,
                        address: results[0].formatted_address,
                        district
                    };

                    setSelectedLocation(locationData);
                } else {
                    console.error('Geocoder failed:', status);
                    const locationData: LocationData = {
                        lat,
                        lng,
                        address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
                        district: 'Unknown'
                    };
                    setSelectedLocation(locationData);
                }
            });
        } catch (error) {
            setIsGeocoding(false);
            console.error('Geocoding error:', error);
        }
    }, [isGeocoding]);

    // Now we can declare functions that depend on geocodePlace
    
    // Handle map click to get lat/lng
    const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setCenter({ lat, lng });
            geocodePlace(lat, lng);
        }
    }, [geocodePlace]);

    // Debounced drag end handler
    const onMapDragEnd = useCallback(() => {
        if (map && !isGeocoding) {
            const newCenter = map.getCenter();
            if (newCenter) {
                const lat = newCenter.lat();
                const lng = newCenter.lng();
                setCenter({ lat, lng });

                const timeoutId = setTimeout(() => {
                    geocodePlace(lat, lng);
                }, 500);

                return () => clearTimeout(timeoutId);
            }
        }
    }, [map, isGeocoding, geocodePlace]);

    // Handle place selection from autocomplete
    const handlePlaceSelection = useCallback((place: any) => {
        if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setCenter({ lat, lng });

            if (place.formatted_address) {
                const locationData: LocationData = {
                    lat,
                    lng,
                    address: place.formatted_address,
                    district: extractDistrict(place.address_components || [])
                };
                setSelectedLocation(locationData);
            } else {
                geocodePlace(lat, lng);
            }
        } else {
            console.error('No geometry found for the selected place.');
        }
    }, [geocodePlace]);

    // Fetch current location
    const fetchCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCenter = { lat: latitude, lng: longitude };
                    setCenter(newCenter);
                    geocodePlace(latitude, longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert(`Error fetching location: ${error.message}`);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 600000 // 10 minutes
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }, [geocodePlace]);

    const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    }, []);

    // Simplified autocomplete initialization
    const initializeAutocomplete = useCallback(() => {
        const input = document.getElementById('auto-complete-input') as HTMLInputElement;

        if (!window.google || !window.google.maps || !window.google.maps.places) {
            console.warn('Google Maps Places library not loaded yet. Retrying...');
            setTimeout(initializeAutocomplete, 200);
            return;
        }

        if (!input) {
            console.warn('Autocomplete input not found. Retrying...');
            setTimeout(initializeAutocomplete, 200);
            return;
        }

        try {
            // Use the stable old Autocomplete API
            const autocomplete = new window.google.maps.places.Autocomplete(input, {
                componentRestrictions: { country: 'in' },
                fields: ['address_components', 'geometry', 'name', 'formatted_address'],
                types: ['establishment', 'geocode'] // Add types for better results
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                handlePlaceSelection(place);
            });

        } catch (error) {
            console.error('Error initializing autocomplete:', error);
            setTimeout(initializeAutocomplete, 500);
        }
    }, [handlePlaceSelection]);

    useEffect(() => {
        if (isLoaded && isMounted) {
            // Add delay to ensure DOM is ready
            const timer = setTimeout(() => {
                initializeAutocomplete();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isLoaded, isMounted, initializeAutocomplete]);

    const finalizeSelection = useCallback(() => {
        if (selectedLocation && onLocationSelect) {
            onLocationSelect(selectedLocation);
        } else {
            // If no location is selected yet, geocode the current center
            geocodePlace(center.lat, center.lng);
        }
    }, [selectedLocation, onLocationSelect, geocodePlace, center]);

    // Map options memoized to prevent re-creation
    const mapOptions = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: 'greedy' as const,
        zoomControl: true,
        zoomControlOptions: {
            position: window.google?.maps?.ControlPosition?.TOP_RIGHT || 3
        },
        streetViewControl: false,
        fullscreenControl: false,
    }), []);

    // Don't render until mounted (prevents hydration issues)
    if (!isMounted) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Initializing...</p>
                </div>
            </div>
        );
    }

    // Handle loading error with more specific messages
    if (loadError) {
        console.error('Google Maps Load Error:', loadError);
        return (
            <div className="flex items-center justify-center h-full border rounded-lg">
                <div className="text-center p-4 max-w-md">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">
                        Failed to load Google Maps
                    </h3>

                    {!googleMap_APIKEY ? (
                        <div className="bg-red-50 border border-red-200 rounded p-3 text-sm mb-3">
                            <p className="font-medium text-red-800 mb-2">Missing API Key</p>
                            <p className="text-red-700">Please add your Google Maps API key to your environment variables:</p>
                            <code className="block bg-red-100 p-2 mt-2 text-xs rounded">
                                NEXT_PUBLIC_GOOGLE_MAP_API_KEY=your_api_key_here
                            </code>
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-200 rounded p-3 text-sm mb-3">
                            <p className="font-medium text-red-800 mb-2">API Configuration Error</p>
                            <p className="text-red-700 mb-2">Please check:</p>
                            <ul className="list-disc list-inside text-red-700 text-left space-y-1">
                                <li>API key is valid and not expired</li>
                                <li>Maps JavaScript API is enabled</li>
                                <li>Places API is enabled</li>
                                <li>Geocoding API is enabled</li>
                                <li>Billing is set up in Google Cloud Console</li>
                                <li>Domain is added to API key restrictions</li>
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                    >
                        Retry
                    </button>

                    <p className="text-xs text-gray-500 mt-2">
                        Error: {loadError.message}
                    </p>
                </div>
            </div>
        );
    }

    return isLoaded ? (
        <div className="absolute inset-0 w-full h-full bg-transparent">
            {/* Optional dark overlay for contrast */}
            <div className="absolute inset-0 bg-white/20"></div>

            <div className="relative w-full h-full max-w-3xl mx-auto rounded-lg shadow-2xl bg-white/80 backdrop-blur-md">
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%", background: "transparent" }}
                    center={center}
                    zoom={15}
                    onLoad={onMapLoad}
                    onClick={onMapClick}
                    onDragEnd={onMapDragEnd}
                    options={mapOptions}
                >
                    {/* Search Input */}
                    <div className="absolute z-10 w-11/12 px-4 pt-4">
                        <input
                            type="text"
                            id="auto-complete-input"
                            placeholder=" Search Location"
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none 
                                 text-sm text-gray-800 shadow-lg bg-white/95 backdrop-blur-sm
                                 focus:ring-2 focus:ring-blue-400 focus:border-transparent
                                 transition-all duration-200"
                        />
                    </div>

                    {/* Center Marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                        <MapPin className="w-8 h-8 text-blue-600 drop-shadow-lg animate-bounce" strokeWidth={2} />
                    </div>

                    {/* Location info and controls */}
                    <div className="absolute z-10 bottom-0 left-0 right-0 p-2 space-y-2 mx-15">
                        {/* First row: Selected address (80%) + Current location icon (20%) */}
                        <div className="flex gap-2 justify-end items-end">
                            {selectedLocation && (
                                <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100 flex-1">
                                    <p className="text-xs font-semibold text-gray-800 mb-1">Selected Location</p>
                                    <p className="text-xs text-gray-600 break-words leading-tight">
                                        {selectedLocation.address}
                                    </p>
                                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                                        <span>District: {selectedLocation.district || 'N/A'}</span>
                                        <span>{selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</span>
                                    </div>
                                </div>
                            )}
                            <button
                                className="bg-blue-600 hover:cursor-pointer hover:bg-white hover:text-black text-white p-2 rounded-lg transition-all duration-200 shadow-md flex items-center justify-center w-12 h-12"
                                onClick={fetchCurrentLocation}
                                title="Use Current Location"
                            >
                                <LocateFixed className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Second row: Select location button (80%) + Cancel button (20%) */}
                        <div className="flex gap-2">
                            <button
                                className={`font-medium py-2.5 px-2 rounded-lg transition-all duration-200 text-sm flex-1
                                      ${selectedLocation
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                onClick={finalizeSelection}
                                disabled={!selectedLocation || isGeocoding}
                            >
                                {isGeocoding ? '🔄 Getting Location...' : '✓ Select this Location'}
                            </button>
                            {onBack && (
                                <button
                                    className="bg-red-600 hover:cursor-pointer hover:bg-white hover:text-black text-white p-2 rounded-lg transition-all duration-200 shadow-md flex items-center justify-center w-12 h-12"
                                    onClick={() => onBack(false)}
                                    title="Cancel"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </GoogleMap>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-full">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Loading Google Maps...</p>
            </div>
        </div>
    );
}

export default React.memo(GMap);
