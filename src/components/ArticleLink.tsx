import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

type ArticleLinkProps = {
  path: string;
  title: string;
};
const ArticleLink = (data: ArticleLinkProps) => {
  const { path, title } = data;
  return (
    <Link href={path} className="text-new-100 flex flex-row items-center">
      <ArrowRightIcon size={18} className="text-inherit" />
      <span className="font-bold ml-3 capitalize my-1 text-sm">{title}</span>
    </Link>
  );
};

export default ArticleLink;
