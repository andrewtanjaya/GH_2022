import {
  FAINT,
  ROBBERY,
  CAR_ACCIDENT,
  FIRE_BREAKOUT,
  FAINT_ICON,
  ROBBERY_ICON,
  CAR_ACCIDENT_ICON,
  FIRE_BREAKOUT_ICON,
  CUSTOM_ICON,
} from '../Constants';

export default function getEventIcon({ type }) {
  if (type === FAINT) return FAINT_ICON;
  if (type === ROBBERY) return ROBBERY_ICON;
  if (type === CAR_ACCIDENT) return CAR_ACCIDENT_ICON;
  if (type === FIRE_BREAKOUT) return FIRE_BREAKOUT_ICON;
  return CUSTOM_ICON;
}
