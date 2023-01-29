import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/router";

type ArticleLinkProps = {
  path: string;
  title: string;
};
const ArticleLink = (data: ArticleLinkProps) => {
  const { path, title } = data;
  const router = useRouter();
  const handleClick = () => {
    router.push(path);
  };
  return (
    <div
      className="text-new-100 flex flex-row items-center hover:cursor-pointer w-fit -ml-8"
      onClick={handleClick}
    >
      <ArrowRightIcon size={18} className="text-inherit" />
      <span className="ml-3 capitalize my-1">{title}</span>
    </div>
  );
};

export default ArticleLink;
