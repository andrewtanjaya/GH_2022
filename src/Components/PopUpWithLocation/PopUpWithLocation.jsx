import { useEffect } from 'react';
import { Popup } from 'react-leaflet';

function PopUpDescription({ event, user }) {
  if (event) {
    return <div>{event.description}</div>;
  }

  if (user) {
    if (user.uid === sessionStorage.getItem('uid')) {
      return <div>Your Current Location</div>;
    }
    return <div>{user.name}</div>;
  }
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

export default function PopUpWithLocation({
  user,
  event,
  position,
  acceptCallback,
  dismissCallback,
}) {
  return (
    <Popup>
      <PopUpDescription event={event} user={user} />
      <div>
        {event ? (
          <div>
            <ActionButton
              acceptCallback={acceptCallback}
              dismissCallback={dismissCallback}
              event={event}
            />
          </div>
        ) : (
          <></>
        )}
        <a
          href={`${process.env.REACT_APP_GOOGLE_MAP_URL}${position['lat']}+${position['lng']}`}
          target="_blank"
          rel="noreferrer"
        >
          See Location
        </a>
      </div>
    </Popup>
  );
}
