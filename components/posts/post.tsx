'use client';

import Image from 'next/image';
import React from 'react';

export const Post = ({ title, thumbnailUrl, id }: any) => {
  return (
    <div className="p-4">
      <p className="text-2xl font-semibold">
        {id}:{title}
      </p>
      <Image
        src={thumbnailUrl}
        alt={''}
        height={150}
        width={150}
      />
      {/* <p className="mt-2 text-gray-200">{post.body}</p> */}
    </div>
  );
};
