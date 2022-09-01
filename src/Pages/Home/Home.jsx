import React, { useState, useEffect } from 'react';
import './Home.scss';
import { useMapEvents } from 'react-leaflet/hooks';

import { MapContainer, TileLayer, Circle, Marker } from 'react-leaflet';
import { divIcon } from 'leaflet';

import SignOutBtn from '../../Components/SignOutBtn/SignOutBtn';

import AddMarker from '../../Utils/AddMarker';

import { auth, eventRef, fetchToken, onMessageListener, usersRef } from '../../Firebase';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import {
  NOTIFICATION_RADIUS,
  PAGE_MODE_OFFLINE,
  PAGE_MODE_ONLINE,
} from '../../Constants';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { query, where } from 'firebase/firestore';
import { updatePosition, updateToken } from '../../Database';
import { getDistanceFromLatLonInM } from '../../Utils/Helper';
import SOSForm from '../../Components/SOSForm/SOSForm';
import { Space, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    fetchToken();
    map.locate();
  }, []);

  const fillGreenOptions = { color: 'rgba(32, 255, 156, 0.5)' };
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
        currentUser={user}
      />
    </>
  );
}
export default function Home() {
  const [mode, setMode] = useState(PAGE_MODE_ONLINE);

  const [notif, setNotification] = useState({ title: '', body: '' });
  const [show, setShow] = useState(false);
  const [cachedUser, setCachedUser] = useState({});
  const [nearbyUser, setNearbyUser] = useState([]);
  const [nearbyEvent, setNearbyEvent] = useState([]);
  const [nearbyToken, setNearbyToken] = useState([]);
  const [network, setNetwork] = useState(1);
  const navigate = useNavigate();

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
    console.log("page load")
    window.addEventListener('online', () => networkOnline());
    window.addEventListener('offline', () => errorNetwork());
    if(sessionStorage.getItem('uid') == null) {
      sessionStorage.removeItem('longitude');
      sessionStorage.removeItem('latitude');
      sessionStorage.removeItem('uid');
      sessionStorage.removeItem('token', currentUser);
      auth.signOut();
      navigate('/login')
    }
    
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
      setNearbyUser(
        allUser.filter((u) => {
          return isBetweenRadius(u) && u.uid !== currentUser[0].uid;
        }),
      );
    }
  }, [allUser]);

  useEffect(()=>{
    if(nearbyUser){
      let tok = nearbyUser.map((user) => {
        return user.token;
      });
      tok = tok.filter((u) => {
        return u !== '';
      });
      setNearbyToken(tok);
    }
  }, [nearbyUser])

  useEffect(() => {
    if (events && currentUser) {
      setNearbyEvent(events.filter(isBetweenRadius));
    }
  }, [events]);

  const isBetweenRadius = (u) => {
    return (
      getDistanceFromLatLonInM(
        u.latitude,
        u.longitude,
        currentUser[0].latitude,
        currentUser[0].longitude,
      ) <= NOTIFICATION_RADIUS
    );
  };

  useEffect(() => {
    if (error) {
      setMode(PAGE_MODE_OFFLINE);
      setCachedUser(localStorage.getItem('user'));
    }
  }, [error]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', currentUser);
      if(sessionStorage.getItem("token") != null){
        console.log("update tioken")
        updateToken(sessionStorage.getItem("token"), currentUser[0]);
      }
    }
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

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 32,
        color: 'white',
      }}
      spin
    />
  );

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
        <SOSForm nearbyTokens={nearbyToken} />
        <SignOutBtn className="signout-btn" currentUser={currentUser} />
        {loading || loadingEvents || loadingAllUser ? (
          <div className="loading-popup">
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <></>
        )}
      </div>

      <MapContainer
        id="map"
        center={[-6.17511, 106.865036]}
        zoom={24}
        minZoom={10}
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
          nearbyEvent.map((event) => {
            return event ? (
              <AddMarker
                currentUser={currentUser}
                key={event.uid}
                event={event}
                position={{
                  lat: event.latitude,
                  lng: event.longitude,
                }}
                isEvent={true}
              />
            ) : (
              <></>
            );
          })
        )}
      </MapContainer>
    </div>
  );
}
