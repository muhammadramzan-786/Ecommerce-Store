import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../firebase";

import { useNavigate } from "react-router-dom";
import { useSignUp, useUserExist } from "./useUser";
import { useLogin } from "./useLogin";

export function useGoogleAuth() {
  const navigate = useNavigate();

  const { mutate: signUpUser,isPending: siUpLoading } = useSignUp();
  const { mutateAsync: checkUserExist, isPending: userExLoading, } = useUserExist();
  const { handleLogin, loading:loginLoading } = useLogin();

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Prepare user data
      const data = {
        name: user.displayName,
        email: user.email,
        password: user.uid,
        image: user.photoURL,
      };

      // 1️⃣ Check user exists
      const existsRes = await checkUserExist({ email: user.email });

      if (existsRes.data.exists) {
        // 2️⃣ Existing → Login
        const success = await handleLogin({
          email: user.email,
          password: user.uid,
        });
        if (success) navigate("/");
        return;
      }

      // 3️⃣ New → Signup → Login
      signUpUser(data, {
        onSuccess: async () => {
          const success = await handleLogin({
            email: user.email,
            password: user.uid,
          });

          if (success) navigate("/");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { googleLogin, siUpLoading, userExLoading, loginLoading };
}
