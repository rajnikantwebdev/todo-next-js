"use client";
import { UserContext } from "@/utils/userContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  return <div>{user?.email}todo home page</div>;
}
