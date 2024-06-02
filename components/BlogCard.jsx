import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function BlogCard() {
  return (
    <Card className="py-4 bg-secondColor rounded-xl hover:shadow-purple-300 shadow-inner cursor-pointer">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny text-thirdColor uppercase font-bold mb-2">
          Daily Mix
        </p>
        <h4 className="font-bold text-large text-purple-200">Frontend Radio</h4>
        <small className="text-default-500 text-purple-100">12 Tracks</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
  );
}
