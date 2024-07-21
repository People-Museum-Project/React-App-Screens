import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function SignInWithGoogle() {
  const navigate = useNavigate();

  async function googleLogin() {
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
          navigate("/", { state: { userData } }); // Pass user data in state
      }
    });
  }
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../../google.png")} width={"60%"} />
      </div>
    </div>
  );
}
export default SignInWithGoogle;