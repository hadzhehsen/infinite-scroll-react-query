import Image from "next/image";
import React from "react";

export const Post = ({ title, image }: any) => {
  return (
    <div className="p-4 border rounded-xl">
      <div className="flex flex-col gap-4">
        <div className="flex-initial">
          <div className="relative h-[250px] w-full overflow-hidden rounded-[12px] border-[1px] border-[#2F2F2F]">
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
              className="h-full w-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg line-clamp-2 leading-[30px]">{title}</h3>
        </div>
      </div>
    </div>
  );
};
