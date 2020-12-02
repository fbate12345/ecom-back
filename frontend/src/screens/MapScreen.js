import React, { useEffect, useRef, useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  Marker,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import Axios from '../../node_modules/axios/index';
import LoadingBox from '../components/LoadingBox';
import { useDispatch } from 'react-redux';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';
const defaultLocation = { lat: 45.516, lng: -73.56 };
export default function MapScreen() {
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const placeRef = useRef(null);
  const libs = ['places'];
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({ lat: position.coords.lat, lng: position.coords.lng });
        setLocation({ lat: position.coords.lat, lng: position.coords.lng });
      });
    }
  };
  useEffect(() => {
    const fecth = async () => {
      const { data } = await Axios.get('/api/config/google');
      setGoogleApiKey(data);
      getUserLocation();
    };
    fecth();
  }, []);
  const onLoadMap = (map) => {
    mapRef.current = map;
  };
  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onIdle = () => {
    if (mapRef.current.center) {
      setLocation({
        lat: mapRef.current.center.lat(),
        lng: mapRef.current.center.lng(),
      });
    }
  };
  const dispatch = useDispatch();
  const onConfirm = () => {
    console.log('address confirmed');
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          vicinity: places[0].vicinity,
          name: places[0].name,
          googleAddressId: places[0].id,
        },
      });
      alert('location saved successfully');
    } else {
      alert('Please enter your address');
    }
  };
  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="sample-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoadMap}
          onIdle={onIdle}
        >
          <StandaloneSearchBox onLoad={onLoadPlaces}>
            <div className="map-input-box">
              <input type="text" placeholder="Type your address"></input>
              <button type="button" className="primary" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox></LoadingBox>
  );
}
