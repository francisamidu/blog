import React from "react";
import { TBlogCard } from "../types";

type BlogCardProps = {
  data: TBlogCard;
};
const BlogCard = ({
  data: { cover_image, excerpt, publishedAt, title, tags },
}: BlogCardProps) => {
  const newTags = tags.split(",");
  return (
    <div className="py-4 rounded-md bg-white max-w-[550px]">
      <h1 className="font-bold text-xl capitalize">{title}</h1>
      <p className="my-4 text-new-200">
        {excerpt.length > 175 ? `${excerpt.slice(0, 175)}....` : excerpt}
      </p>
      <div className="flex flex-row items-center justify-between">
        {newTags.map((tag, index) =>
          newTags.length - index !== 1 ? (
            <>
              <span
                className="uppercase text-xs font-bold text-new-400 bg-gray-100 py-0.5 px-2 rounded"
                key={index}
              >
                {tag}
              </span>
              <span className="mx-3 text-new-400">-</span>
            </>
          ) : (
            <span
              className="uppercase text-xs font-bold text-new-400 bg-gray-100 py-0.5 px-2 rounded"
              key={index}
            >
              {tag}
            </span>
          )
        )}
      </div>
      <p className="my-4 text-new-100 hover:cursor-pointer hover:text-new-400 transition-all duration-200">
        Read more
      </p>
    </div>
  );
};

export default BlogCard;
