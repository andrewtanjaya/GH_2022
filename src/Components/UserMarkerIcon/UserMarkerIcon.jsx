import { useState } from 'react';

import { Img } from 'react-image';

import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

import { ThreeDots } from 'react-loader-spinner';

import './UserMarkerIcon.scss';

export default function UserMarkerIcon({ url }) {
  console.log(url);
  const iconMarkup = (url) =>
    renderToStaticMarkup(
      <div className="marker-user-icon-marker">
                <img
          src={url}
          className="marker-user-icon-img"
          referrerpolicy="no-referrer"
        />
      </div>,
    );

  return divIcon({
    html: iconMarkup(url),
  });
}
