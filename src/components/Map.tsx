"use client"
import { Container } from "@prisma/client";
//Map component Component from library
import {GoogleMap, Marker } from "@react-google-maps/api";


//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '60vh',
    borderRadius: '15px 0px 0px 15px',
};


//Default zoom level, can be adjusted
const defaultMapZoom = 15

//Map options
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: "satellite",
};

const containerPos = {lat:38.468258, lng: 27.160710};


const Map = ({data}:{data?:Container[]}) => {

  return (
    <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={containerPos}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {data?.map((con)=>(
                    <Marker key={con.id} position={{lat:parseFloat(con?.lat),lng: parseFloat(con?.lon)}} label={con?.address} />
                ))}

            </GoogleMap>
        </div>
    )
}

export default Map