import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
const googleMap_APIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
};

function GMap() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMap_APIKEY || '',
    });
console.log("googleMap_APIKEY", isLoaded);
    const [center, setCenter] = useState({
        lat: 11.004556,
        lng: 76.961632,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    //   useEffect(() => {
    //     // Automatically fetch current location when the component mounts
    //     fetchCurrentLocation();

    //     // Clean up when the component unmounts
    //     window.onbeforeunload = () => {
    //       backer(false);
    //     };

    //     return () => {
    //       window.onbeforeunload = null;
    //     };
    //   }, []);

    const fetchCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    alert(`Error fetching location: ${error.message}`);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    }, []);

    
    const initializeAutocomplete = useCallback(() => {
    const input = document.getElementById('auto-complete-input') as HTMLInputElement;
  
    if (!input) {
      console.warn('Autocomplete initialization delayed. Retrying...');
      setTimeout(initializeAutocomplete, 100); // Retry after 100ms
      return;
    }
  
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: 'in' },
      fields: ['address_components', 'geometry', 'name'],
    });
  
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
  
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCenter({ lat, lng });

      } else {
        console.error('No geometry found for the selected place.');
      }
    });
  }, []);



    useEffect(() => {
        if (isLoaded) {
            initializeAutocomplete();
        }
    }, [isLoaded]);
    const geocodePlace = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();
        const latLng = { lat, lng };

        geocoder.geocode({ location: latLng }, (results: any, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    let district = '';

                    results[0].address_components.forEach((component: { types: string[], long_name: string }) => {
                        if (
                            component.types.includes('administrative_area_level_3') ||
                            component.types.includes('political')
                        ) {
                            district = component.long_name;
                        }
                    });

                    console.log('District:', district, results[0].formatted_address, latLng);

                    //   placeSetter(results[0].formatted_address, district.toLowerCase());
                    //   coordinateSetter(latLng)
                    //   backer(false);
                } else {
                    console.error('No results found for the given coordinates.');
                }
            } else {
                console.error('Geocoder failed due to:', status);
            }
        });
    };
    const finalizeSelection = () => {
        geocodePlace(center.lat, center.lng);
    };

    return isLoaded ? (
        <div className="absolute w-full h-full z-10">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onMapLoad}
                // onUnmount={onMapUnmount}
                // onDragEnd={onMapDragEnd}
                options={{
                    disableDefaultUI: true,
                }}
            >

                <div className="absolute z-10 w-full">
                    {/* <OrderPageHeader title="Select Location" onBack={() => backer(false)} /> */}
                    <div className="px-2">
                        <input
                            type="text"
                            id="auto-complete-input"
                            placeholder="Search Location"
                            className="w-full p-2 px-3 rounded-lg border border-blue-400 outline-none text-sm"
                        />
                    </div>
                </div>
                {/* Add this div for the centered MapPin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <MapPin className="w-8 h-8 text-red-500" strokeWidth={2} />
                </div>
                <div className="absolute z-10 p-2 flex flex-col justify-center w-full top-[75%]">
                    <p className="alert alert-warning p-2 text-xs">
                        ** Zoom in as close as possible for better accuracy **
                    </p>
                    <button
                        className="btn btn-outline-brown p-1 flex-1"
                        onClick={finalizeSelection}
                    >
                        Select this Location
                    </button>
                    <button
                        className="btn btn-outline-success mt-2"
                        onClick={fetchCurrentLocation}
                    >
                        Use current Location
                    </button>
                </div>
            </GoogleMap>
        </div>
    ) : null;
}

export default React.memo(GMap);



{/* Header
        <div className="absolute z-10 w-full">
          <OrderPageHeader title="Select Location" onBack={() => backer(false)} />
          <div className="px-2">
            <input
              type="text"
              id="auto-complete-input"
              placeholder="Search Location"
              className="w-full p-2 px-3 rounded-lg border border-blue-400 outline-none text-sm"
            />
          </div>
        </div>

        {/* Center Marker */}
// <div className="absolute z-10 text-4xl top-[50%] flex justify-center w-full">
//   <FontAwesomeIcon icon={faLocationDot} className="text-red-600" />
// </div>

