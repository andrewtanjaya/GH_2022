import { updateToken } from '../../Database';
import { auth } from '../../Firebase';
import {IoCloseOutline} from 'react-icons/io5'
import './SignOutBtn.scss'

export default function SignOutBtn({ currentUser }) {
  const signOut = () => {
    updateToken('', currentUser[0]);
    sessionStorage.removeItem('longitude');
    sessionStorage.removeItem('latitude');
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('token', currentUser);
    auth.signOut();
  };
  return (
    auth.currentUser && (
      <div className="signout-btn">
        <IoCloseOutline color={"#ff4d4d"} size={'40px'} onClick={signOut} />
      </div>
    )
  );
}
