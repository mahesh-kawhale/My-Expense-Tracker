import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom"; // userNaigate hook to navigate direct to expense tracker page after sign
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css";
// Auth component
export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    try {
      // signin with google
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userId: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      //  JSON.stringfy: convert objcet to string
      // save userdata to localstorage in form of key and value
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      console.log(error.message);
    }
  };

  // if authenticated then goes to directly to home page (using Navigate hook)
  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="signin-container">
    <div className="signin-page">
      <p>Sign In with Google</p>

      <button className="signinbtn" onClick={signInWithGoogle}>
        sign in{" "}
      </button>
    </div>

    </div>
  );
};
