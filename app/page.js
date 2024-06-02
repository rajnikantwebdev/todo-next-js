"use client";
import { UserContext } from "@/utils/userContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Hero from "@/components/Hero";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  return (
    <section className="w-full min-h-screen">
      <Hero />
    </section>
  );
}
