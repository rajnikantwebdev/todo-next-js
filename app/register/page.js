import React from "react";
import UserFormAuthentication from "@/components/UserForm";
import Image from "next/image";

function page() {
  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-violet-600 to-yellow-50">
      <UserFormAuthentication />
      <div className="flex-1 h-screen bg-mainColor items-center flex justify-center">
        <Image
          src={"/space.svg"}
          width={400}
          height={400}
          alt="Next todo app"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default page;
