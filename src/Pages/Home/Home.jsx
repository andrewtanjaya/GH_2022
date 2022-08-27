import React, { useState, useEffect } from 'react';
import './Home.scss';
import { useMapEvents } from 'react-leaflet/hooks';

import { MapContainer, TileLayer, Circle } from 'react-leaflet';

import SignOutBtn from '../../Components/SignOutBtn/SignOutBtn';

import AddMarker from '../../Utils/AddMarker';

import GetCurrentLocation from '../../Utils/GetCurrentPosition';

import { eventRef, onMessageListener, usersRef } from '../../Firebase';
import {
  NOTIFICATION_RADIUS,
  PAGE_MODE_OFFLINE,
  PAGE_MODE_ONLINE,
} from '../../Constants';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { query, where } from 'firebase/firestore';
import { updatePosition } from '../../Database';
import { getDistanceFromLatLonInM } from '../../Utils/Helper';
import SOSForm from '../../Components/SOSForm/SOSForm';
import { Space, message, notification } from 'antd';

function LocationMarker({ eventMarker, user }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());

      sessionStorage.setItem('longitude', e.latlng.lng);
      sessionStorage.setItem('latitude', e.latlng.lat);
      updatePosition(sessionStorage.getItem('uid'), e.latlng);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  const fillGreenOptions = { color: '#20ff9c' };

  return position === null ? (
    <></>
  ) : (
    <>
      <Circle
        center={position}
        pathOptions={fillGreenOptions}
        radius={NOTIFICATION_RADIUS}
      />
      <AddMarker
        user={user}
        event={eventMarker}
        position={position}
        isCurrentUser={true}
      />
    </>
  );
}
export default function Home() {
  const [mode, setMode] = useState(PAGE_MODE_ONLINE);

  const [notif, setNotification] = useState({ title: '', body: '' });
  const [show, setShow] = useState(false);
  const [deviceTokens, setDeviceTokens] = useState([]);
  const [cachedUser, setCachedUser] = useState({});
  const [nearbyUser, setNearbyUser] = useState([]);
  const [nearbyToken, setNearbyToken] = useState([]);
  const [network, setNetwork] = useState(1);

  const q = query(usersRef, where('uid', '==', sessionStorage.getItem('uid')));
  const [currentUser, loading, error] = useCollectionData(q, {
    idField: 'uid',
  });
  const [events, loadingEvents, errorEvents] = useCollectionData(eventRef, {
    idField: 'uid',
  });
  const [allUser, loadingAllUser, errorAllUser] = useCollectionData(usersRef, {
    idField: 'uid',
  });

  useEffect(() => {
    window.addEventListener('online', () => networkOnline());
    window.addEventListener('offline', () => errorNetwork());
  }, []);

  const networkOnline = () => {
    setMode(PAGE_MODE_ONLINE);
    if (network !== 1) {
      message.loading('Reconnecting..', 2);
      setNetwork(1);
    }
  };

  const errorNetwork = () => {
    setMode(PAGE_MODE_OFFLINE);
    if (network !== 0) {
      message.error('No Internet Connection', 3);
      setNetwork(0);
    }
  };

  useEffect(() => {
    if (allUser && currentUser) {
      setNearbyUser(allUser.filter(isBetweenRadiusAndNotCurrentUser));
      setNearbyToken(
        nearbyUser.map((user) => {
          return user.token;
        }),
      );
    }
  }, [allUser]);

  const isBetweenRadiusAndNotCurrentUser = (u) => {
    return (
      getDistanceFromLatLonInM(
        u.latitude,
        u.longitude,
        currentUser[0].latitude,
        currentUser[0].longitude,
      ) <= NOTIFICATION_RADIUS && u.uid !== currentUser[0].uid
    );
  };

  useEffect(() => {
    if (error) {
      setMode(PAGE_MODE_OFFLINE);
      setCachedUser(localStorage.getItem('user'));
    }
  }, [error]);

  useEffect(() => {
    if (currentUser) localStorage.setItem('user', currentUser);
  }, [currentUser]);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));

  useEffect(() => {
    if (notif && notif.title !== '') {
      openNotification();
      setNotification({ title: '', body: '' });
    }
  }, [notif]);

  const openNotification = () => {
    notification.open({
      message: notif.title,
      description: notif.body,
    });
  };
  return (
    <div>
      <div className="action-panel">
        <Space></Space>
        <SignOutBtn currentUser={currentUser} />
        <SOSForm nearbyTokens={nearbyToken} />
      </div>

      <MapContainer
        id="map"
        center={[-6.17511, 106.865036]}
        zoom={24}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {loading ? (
          <></>
        ) : (
          <>
            <LocationMarker user={currentUser ? currentUser[0] : null} />
          </>
        )}

        {loadingAllUser ? (
          <></>
        ) : (
          nearbyUser.map((u) => {
            return (
              <AddMarker
                key={u.uid}
                user={u}
                position={{
                  lat: u.latitude,
                  lng: u.longitude,
                }}
              />
            );
          })
        )}
        {loadingEvents ? (
          <></>
        ) : (
          events.map((event) => {
            return event ? (
              <AddMarker
                key={event.uid}
                event={event}
                position={{
                  lat: event.latitude,
                  lng: event.longitude,
                }}
              />
            ) : (
              <></>
            );
          })
        )}
      </MapContainer>

      <button onClick={GetCurrentLocation}>Get Current Location</button>
    </div>
  );
}
