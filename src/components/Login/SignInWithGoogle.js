//src/components/Login/SignInWithGoogle.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { getUser, addUser } from '../../utils';

function SignInWithGoogle() {
  const navigate = useNavigate();

  async function googleLogin() {
    console.log('googleLogin');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
          const userData = {
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              uid: user.uid
          }
          // getUser 
          console.log('getUser');
          const response = await getUser(user.uid);
          if (!response) {
            console.log('addUser');
            await addUser(user.displayName, user.photoURL, null, null, user.uid, user.email);
          }
          navigate("/", { state: { userData } }); // Pass user data in state
      }
    });
  }
  return (
    <div>
      <p className="continue-p"></p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../../google.png")} width={"20%"} />
      </div>
    </div>
  );
}
export default SignInWithGoogle;