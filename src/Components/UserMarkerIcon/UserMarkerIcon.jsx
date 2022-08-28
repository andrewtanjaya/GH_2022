import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { NOTIFICATION_RADIUS } from '../../Constants';
import { Tooltip } from 'antd';

import './UserMarkerIcon.scss';

export default function UserMarkerIcon({ url, isCurrentUser, isEvent }) {
  if (isCurrentUser) {
    const currentUserMarkup = () =>
      renderToStaticMarkup(<div className="current-user-icon-marker"></div>);

    return divIcon({
      html: currentUserMarkup(),
      className: '',
    });
  }

  if (isEvent) {
    const currentUserMarkup = () =>
      renderToStaticMarkup(
        <div className="event-icon">
          <img
            src={url}
            className="event-icon-img"
            referrerPolicy="no-referrer"
            alt="event"
          />
        </div>,
      );

    return divIcon({
      html: currentUserMarkup(),
      className: '',
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
    className: '',
  });
}
