import Image from "next/image";
import React from "react";

export const Post = ({ title, thumbnailUrl, id }: any) => {
  return (
    <div className="p-4 border rounded-xl">
      <div className="flex flex-row gap-4">
        <div className="flex-initial w-[150px]">
          <Image
            src={thumbnailUrl}
            alt=""
            height={150}
            width={150}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <p className="text-lg line-clamp-5 leading-[30px]">
            {id}: {title}
          </p>
        </div>
      </div>
    </div>
  );
};
