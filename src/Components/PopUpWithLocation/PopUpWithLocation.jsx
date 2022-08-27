import { useEffect } from "react";
import { Popup } from "react-leaflet";

export default function PopUpWithLocation({ user, ev, position, acceptCallback}) {
  return (
    <Popup>
      {ev  ? <div>{ev.description}</div> : user && user.name && user.uid === sessionStorage.getItem("uid") ? <div>Your Current Location</div> : <div><b>{user.name}</b> location</div>}
      <div>
        {ev ? (
          <button type="submit" onClick={acceptCallback}>
            Accept
          </button>
        ) : (
          <></>
        )}
        <a
          href={`${process.env.REACT_APP_GOOGLE_MAP_URL}${position["lat"]}+${position["lng"]}`}
          target="_blank"
        >
          See Location
        </a>
      </div>
    </Popup>
  );
}
