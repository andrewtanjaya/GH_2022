import { updateToken } from "../../Database";
import { auth } from "../../Firebase";

export default function SignOutBtn({ currentUser }) {
  const signOut = () => {
    updateToken("", currentUser);
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("token", currentUser);
    auth.signOut();
  };
  return auth.currentUser && <button onClick={signOut}>Sign Out</button>;
}
