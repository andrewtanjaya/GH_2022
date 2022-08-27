import { signInWithGoogle } from '../../Firebase';

export default function SignInBtn() {
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}
