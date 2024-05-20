import { auth } from "./firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//   try {
//     console.log(email, password);
//     return createUserWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.log("error while registering the user: ", err);
//     console.error(err);
//   }
// };

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  console.log("google user: ", user);
  return user;
};

export const doSignInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("git-hub: ", token, user);
      return user;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const doSignOut = () => {
  return auth.signOut();
};
