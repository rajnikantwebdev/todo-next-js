"use client";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firesbase-authentication/firebaseConfig";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("onAuthStateChanged");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("onstate changed");
        router.push("/");
      } else {
        console.log("user logged out");
      }
    });
  }, [auth]);

  return <>todo home page</>;
}
