import { Popup } from 'react-leaflet';
import { IoLocationSharp } from 'react-icons/io5';
import './CurrentUserPopUp.scss';

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

function CurrentUserPopUp({ user, position }) {
  return (
    <Popup className="popup-container">
      <div className="popup-user-avatar">
        <img src={user.photoUrl} alt="user" className="popup-user-avatar-img" />
      </div>
      <div className="popup-user-name">{user.name}</div>
      <div className="popup-user-location">
        <IoLocationSharp />
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
      // return <div>Your Current Location</div>;
    }
    return <div>{user.name}</div>;
  }

  return (
    <Popup>
      <div className="popup-container">
        {/* <div>
          <img src={user.photoUrl} referrerpolicy="no-referrer" />
        </div> */}
      </div>
      {/* <PopUpDescription event={event} user={user} />
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
      </div> */}
    </Popup>
  );
}
