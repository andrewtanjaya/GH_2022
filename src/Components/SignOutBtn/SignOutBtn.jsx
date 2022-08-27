import { updateToken } from "../../Database";
import { auth } from "../../Firebase";

export default function SignOutBtn({ currentUser }) {
  const signOut = () => {
	console.log("user otw logout : " , currentUser)
    updateToken("", currentUser[0]);
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("token", currentUser);
    auth.signOut();
  };
  return auth.currentUser && <button onClick={signOut}>Sign Out</button>;
}
