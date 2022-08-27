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
        <Img
          src={[url, './asset/event.png']}
          className="marker-user-icon-img"
          // unloader={<img src="./asset/event.png"></img>}
          // loader={
          //   // <ThreeDots
          //   //   height="40"
          //   //   width="40"
          //   //   radius="4"
          //   //   color="white"
          //   //   ariaLabel="three-dots-loading"
          //   //   wrapperStyle={{}}
          //   //   wrapperClassName=""
          //   //   visible={true}
          //   // />
          // }
        />
      </div>,
    );

  return divIcon({
    html: iconMarkup(url),
  });
}
