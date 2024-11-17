"use client"

import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { Container } from '@prisma/client';

const Map = ({container}:{container?:Container[]}) => {
  
console.log(container);
  // Cihaz konum ve bilgileri
  const deviceData = {
    id: container?.id,
    latitude: parseFloat(container?.lat),
    longitude: parseFloat(container?.lon),
    alarm: container?.alarm,
    capacity: container?.capacity,
    temperature: container?.temp,
    imei: container?.imei,
  };

  // Haritanın merkezini ve markerın durumunu tanımlıyoruz
  const [center, setCenter] = useState({
    lat: deviceData.latitude,
    lng: deviceData.longitude,
  });
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Harita seçenekleri
  const mapContainerStyle = { width: "100%", height: "500px" };
  const mapOptions = { zoom: 15, center };


  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions} center={center}>
      <Marker
        position={{ lat: deviceData.latitude, lng: deviceData.longitude }}
        onClick={() => setSelectedDevice(deviceData)}
      />
      {selectedDevice && (
        <InfoWindow
          position={{ lat: selectedDevice.latitude, lng: selectedDevice.longitude }}
          onCloseClick={() => setSelectedDevice(null)}
        >
          <div>
            <h2>Cihaz Bilgileri</h2>
            <p><strong>ID:</strong> {selectedDevice.id}</p>
            <p><strong>IMEI:</strong> {selectedDevice.imei}</p>
            <p><strong>Sıcaklık:</strong> {selectedDevice.temperature}°C</p>
            <p><strong>Kapasite:</strong> {selectedDevice.capacity}%</p>
            <p><strong>Alarm:</strong> {selectedDevice.alarm}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map