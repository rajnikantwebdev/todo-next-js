import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ data }) {
  return (
    <Card className="py-4 px-2 w-72 bg-secondColor rounded-xl hover:shadow-purple-300 shadow-inner cursor-pointer">
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <p className="text-tiny text-thirdColor uppercase font-bold mb-2">
          {data?.title > 60
            ? data?.title.trim().slice(0, 60) + "..."
            : data?.title.trim()}
        </p>
        <h4 className="font-bold text-normal text-purple-200">
          {data?.author}
        </h4>
        <small className="text-default-500 text-purple-100 mb-8">
          {new Date(data?.createdAt).toLocaleDateString()}
        </small>
      </CardHeader>
      <CardBody className=" w-full relative h-48">
        <Image
          src={data?.img}
          layout="fill"
          objectFit="cover"
          alt="picture"
          className="rounded-xl"
        />
      </CardBody>
      <CardFooter className="mt-4">
        <Link
          href={`/blog/${data?._id}`}
          className="bg-thirdColor py-1 px-2 text-white rounded-lg"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
}
