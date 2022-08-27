import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

import './UserMarkerIcon.scss';

export default function UserMarkerIcon({ url }) {
  console.log(url);
  const iconMarkup = (url) =>
    renderToStaticMarkup(
      <div className="marker-user-icon-marker">
        <img
          src={url}
          className="marker-user-icon-img"
          referrerPolicy="no-referrer"
          alt="user"
        />
      </div>,
    );

  return divIcon({
    html: iconMarkup(url),
  });
}
