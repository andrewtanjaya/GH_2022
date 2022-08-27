import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

import './UserMarkerIcon.scss';

export default function UserMarkerIcon({ url, isCurrentUser }) {
  if (isCurrentUser) {
    const currentUserMarkup = () =>
      renderToStaticMarkup(<div className="current-user-icon-marker"></div>);

    return divIcon({
      html: currentUserMarkup(),
    });
  }

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
