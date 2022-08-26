import { Popup } from 'react-leaflet';

export default function PopUpWithLocation({
	description,
	position,
	acceptCallback,
}) {
	return (
		<Popup>
			<div>{description.toString()}</div>
			<div>
				<button type='sumit' onClick={acceptCallback}>
					Accept
				</button>
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
