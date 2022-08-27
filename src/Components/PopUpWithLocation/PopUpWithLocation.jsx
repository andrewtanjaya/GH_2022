import { Popup } from 'react-leaflet';

export default function PopUpWithLocation({
	ev,
	position,
	acceptCallback,
}) {
	return (
		<Popup>
			{ ev ? <div>{ev.description}</div> : <div>Your Current Location</div> }
			<div>
				{ ev ? <button type='submit' onClick={acceptCallback}>
					Accept
				</button> : <></>}
				<a
					href={`${process.env.REACT_APP_GOOGLE_MAP_URL}${position['lat']}+${position['lng']}`}
					target='_blank'
				>
					See Location
				</a>
			</div>
		</Popup>
	);
}
