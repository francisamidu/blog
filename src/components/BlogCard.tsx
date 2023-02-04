import React from "react";
import { TBlogCard } from "../types";
import { Tag } from ".";
import dayjs from "dayjs";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

type BlogCardProps = {
  data: TBlogCard;
};
const BlogCard = ({
  data: { excerpt, publishedAt, title, slug, tags },
}: BlogCardProps) => {
  const newTags = tags.split(",");
  return (
    <div className="py-4 rounded-md bg-white max-w-[550px]">
      <h1 className="font-bold text-xl capitalize">{title}</h1>
      <span className="text-gray-500 text-sm">
        Posted on {dayjs(publishedAt).format("MMM DD")}
      </span>
      <p className="my-4 text-new-200">
        {excerpt.length > 175 ? `${excerpt.slice(0, 175)}....` : excerpt}
      </p>
      <div className="flex flex-row items-center justify-start">
        {newTags.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </div>
      <Link href={slug} className="my-4 w-fit">
        <span className="text-[#040e25] hover:cursor-pointer hover:text-new-400 transition-all duration-200">
          Read more
        </span>
        <ArrowRightIcon color="#040e25" size={20} />
      </Link>
    </div>
  );
};

export default BlogCard;
