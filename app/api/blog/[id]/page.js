import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  console.log(params);
  return <div>params</div>;
};

export default Page;
