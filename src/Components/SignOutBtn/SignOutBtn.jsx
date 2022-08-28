import { updateToken } from '../../Database';
import { auth } from '../../Firebase';
import { MdClose } from 'react-icons/md';
import './SignOutBtn.scss';
import { Tooltip } from 'antd';

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
      <Tooltip title="Sign Out">
        <div className="signout-btn">
          <MdClose color={'#ff4d4d'} size={'40px'} onClick={signOut} />
        </div>
      </Tooltip>
    )
  );
}
