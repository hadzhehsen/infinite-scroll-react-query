"use client";

import React from "react";

export const Post = ({ title }: any) => {
  return (
    <div className="p-4">
      <p className="text-2xl font-semibold">{title}</p>
      {/* <p className="mt-2 text-gray-200">{post.body}</p> */}
    </div>
  );
};
