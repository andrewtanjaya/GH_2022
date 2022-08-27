import { useState } from 'react';

import { Img } from 'react-image';

import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import './UserMarkerIcon.scss';

export default function UserMarkerIcon({ url }) {
  console.log(url);
  const iconMarkup = (url) =>
    renderToStaticMarkup(
      <div className="marker-user-icon-marker">
        <Img
          src={[url + './', './asset/event.png']}
          className="marker-user-icon-img"
        />
      </div>,
    );

  return divIcon({
    html: iconMarkup(url),
  });
}
