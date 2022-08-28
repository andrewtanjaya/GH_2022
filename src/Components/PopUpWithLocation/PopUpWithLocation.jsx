import { Popup } from 'react-leaflet';
import { IoLocationSharp } from 'react-icons/io5';
import './CurrentUserPopUp.scss';
import './EventPopUp.scss';
import { Button, Tooltip } from 'antd';
import getEventIcon from '../../Utils/GetEventIcon';
import { useEffect, useState } from 'react';

function generateGoogleMapUrl({ position }) {
  return `${process.env.REACT_APP_GOOGLE_MAP_URL}${position['lat']}+${position['lng']}`;
}

function ActionButton({ acceptCallback, dismissCallback, event }) {
  if (event.uid !== sessionStorage.getItem('uid')) {
    return (
      <div>
        <button type="submit" onClick={acceptCallback}>
          Accept
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button type="submit" onClick={dismissCallback}>
          Dismiss
        </button>
      </div>
    );
  }
}

function CurrentUserPopUp({ user, position }) {
  return (
    <Popup>
      <div className="popup-container">
        <div className="popup-user-avatar">
          <img
            src={user.photoUrl}
            alt="user"
            className="popup-user-avatar-img"
          />
        </div>
        <div className="popup-user-name">Hi {user.name} !</div>
        <Tooltip title="View Location">
          <Button
            className="popup-user-location-btn"
            icon={<IoLocationSharp />}
            size="small"
            href={generateGoogleMapUrl({ position })}
            target="_blank"
          />
        </Tooltip>
      </div>
    </Popup>
  );
}

function OtherUserPopUp({ user }) {
  return (
    <Popup>
      <div className="popup-container">
        <div className="popup-user-avatar">
          <img
            src={user.photoUrl}
            alt="user"
            className="popup-user-avatar-img"
          />
        </div>
        <div className="popup-user-name">{user.name}</div>
      </div>
    </Popup>
  );
}

function EventPopUp({ event, user, acceptCallback, dismissCallback }) {
  const [acceptedEvent, setAcceptedEvent] = useState();

  useEffect(() => {
    for (user of event.accepted_uids) {
      if (user.uid === sessionStorage.getItem('uid')) setAcceptedEvent(true);
    }
  }, [event]);

  return (
    <Popup>
      <div className="popup-container popup-event">
        <div className="popup-header">
          <div className="popup-event-avatar">
            <img
              src={getEventIcon(event.type)}
              alt="user"
              className="popup-event-avatar-img"
            />
          </div>

          <div className="popup-event-accepted-avatar-container">
            {event.accepted_uids.map((user) => {
              return (
                <img
                  src={user.photoUrl}
                  alt="accepted-user"
                  className="popup-event-avatar-img  popup-event-accepted-avatar"
                />
              );
            })}
          </div>
        </div>
        <div className="popup-content">
          <div className="popup-event-title">{event.title}</div>
          <div className="popup-event-description">{event.description}</div>
        </div>

        <div className="popup-footer">
          <Tooltip title="View Location">
            <Button
              icon={<IoLocationSharp />}
              size="small"
              className="location-button"
              href={generateGoogleMapUrl({
                position: {
                  lat: event.latitude,
                  lng: event.longitude,
                },
              })}
              target="_blank"
            />
          </Tooltip>
          {event.uid !== sessionStorage.getItem('uid') ? (
            acceptedEvent ? (
              <Button
                type="primary"
                shape="round"
                size={'small'}
                onClick={acceptCallback}
              >
                Accepted
              </Button>
            ) : (
              <Button
                type="primary"
                shape="round"
                size={'small'}
                onClick={acceptCallback}
              >
                Accept
              </Button>
            )
          ) : event.uid === sessionStorage.getItem('uid') ? (
            <>
              <Button
                type="primary"
                shape="round"
                size={'small'}
                onClick={dismissCallback}
                danger
              >
                Dismiss
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Popup>
  );
}

export default function PopUpWithLocation({
  user,
  event,
  position,
  acceptCallback,
  dismissCallback,
}) {
  if (user) {
    if (user.uid === sessionStorage.getItem('uid')) {
      return <CurrentUserPopUp user={user} position={position} />;
    }
    return <OtherUserPopUp user={user} />;
  }

  if (event) {
    return (
      <EventPopUp
        user={user}
        event={event}
        acceptCallback={acceptCallback}
        dismissCallback={dismissCallback}
      />
    );
  }
}
