import React from "react";

type TagProps = {
  tag: string;
  onClick?: () => void;
};
const Tag = ({ tag, onClick }: TagProps) => {
  const handleClick = onClick ? onClick : () => {};
  return (
    <span
      className="capitalize text-new-100 bg-blue-200 py-1 px-3 rounded-md mr-2 mb-2 hover:cursor-pointer"
      onClick={handleClick}
    >
      {tag}
    </span>
  );
};

export default Tag;
