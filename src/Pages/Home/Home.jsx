import React, { useState, useEffect } from 'react';
import './Home.scss';
import { useMapEvents } from 'react-leaflet/hooks';

import { MapContainer, TileLayer } from 'react-leaflet';

import SignOutBtn from '../../Components/SignOutBtn/SignOutBtn';

import AddMarker from '../../Utils/AddMarker';

import GetCurrentLocation from '../../Utils/GetCurrentPosition';

import { auth, eventRef, onMessageListener, usersRef } from '../../Firebase';
import { NOTIFICATION_RADIUS, PAGE_MODE_OFFLINE, PAGE_MODE_ONLINE } from '../../Constants';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import SOSBtn from '../../Components/SOSBtn/SOSBtn';
import { Event } from '../../Model/Event';
import EventMarker from '../../Components/EventMarker/EventMarker';
import { updatePosition } from '../../Database';
import { getDistanceFromLatLonInM, sendPush } from '../../Utils/Helper';

function LocationMarker({ eventMarker, user }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());

      updatePosition(sessionStorage.getItem('uid'), e.latlng);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  return position === null ? (
    <></>
  ) : (
    <AddMarker user={user} event={eventMarker} position={position} />
  );
}
export default function Home() {
  const [mode, setMode] = useState(PAGE_MODE_ONLINE);

  const [notification, setNotification] = useState({ title: '', body: '' });
  const [show, setShow] = useState(false);
  const [deviceTokens, setDeviceTokens] = useState([]);
  const [cachedUser, setCachedUser] = useState({});
  const [nearbyUser, setNearbyUser] = useState([])
  const [nearbyToken, setNearbyToken] = useState([])

  const [mockEvent, setMockEvent] = useState(
    new Event(
      sessionStorage.getItem('uid'),
      'SOS',
      'SOS nih butuh bantuan!',
      0,
      0,
      [],
    ),
  );
  // TODO
  // !! cache fetched user here !!
  // get user [logged in user] from db, if success set data to LocalStorage + set to Online Mode
  // if failed, get data from localstorage and set data to state + set to Offline Mode

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
    if (allUser && currentUser) {
      setNearbyUser(allUser.filter(isBetweenRadiusAndNotCurrentUser));
	  setNearbyToken(nearbyUser.map((user)=>{return user.token}))
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

  return (
    <div>
      {mode === PAGE_MODE_OFFLINE ? (
        <p>Your are offline</p>
      ) : (
        <p>Your are online</p>
      )}
      <div>
        <p>Notif Title : {notification.title}</p>
        <p>Notif Body : {notification.body}</p>
      </div>

      {loading ? (
        <pre>loading please wait...</pre>
      ) : error ? (
        <pre>{cachedUser}</pre>
      ) : (
        <pre>{JSON.stringify(currentUser)}</pre>
      )}

      <button onClick={()=>{sendPush(nearbyToken)}}>Send Notif</button>

      <SOSBtn myEvent={mockEvent} />

      <SignOutBtn currentUser={currentUser} />

      <MapContainer
        id="map"
        center={[-6.17511, 106.865036]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {loading ? (
          <></>
        ) : (
          <LocationMarker user={currentUser ? currentUser[0] : null} />
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
