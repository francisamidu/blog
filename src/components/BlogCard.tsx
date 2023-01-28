import React from "react";
import { TBlogCard } from "../types";
import dayjs from "dayjs";

type BlogCardProps = {
  data: TBlogCard;
};
const BlogCard = ({
  data: { cover_image, excerpt, publishedAt, title },
}: BlogCardProps) => {
  return (
    <div className="p-4 rounded-md bg-white hover:cursor-pointer">
      <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  );
};

export default BlogCard;
