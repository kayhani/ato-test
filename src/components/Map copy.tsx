"use client"

import { Container } from "@prisma/client";
//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '60vh',
    borderRadius: '15px 0px 0px 15px',
};


const containerPos = {lat:41.002198, lng: 29.130972}

//Default zoom level, can be adjusted
const defaultMapZoom = 15

//Map options
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: "satellite",
};

const Map = ({containers}:{containers?:Container[]}) => {
    
  return (
    <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={containerPos}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {containers?.map((con)=>(
                    <Marker key={con.id} position={{lat:parseFloat(con?.lat),lng: parseFloat(con?.lon)}} label={con?.address} />
                ))}
                
            </GoogleMap>
        </div>
  )
}

export default Map