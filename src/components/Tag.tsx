import React from "react";

type TagProps = {
  tag: string;
  onClick?: (tag: string | any) => void;
};
const Tag = ({ tag, onClick }: TagProps) => {
  const handleClick = onClick ? onClick : () => {};
  return (
    <span
      className="capitalize text-sm text-new-100 bg-blue-200 py-1.5 px-3 rounded-lg mr-2 mb-2 hover:cursor-pointer"
      onClick={handleClick}
    >
      {tag}
    </span>
  );
};

export default Tag;
