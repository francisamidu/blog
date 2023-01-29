import React from "react";

type TagProps = {
  tag: string;
  onClick?: () => void;
};
const Tag = ({ tag, onClick }: TagProps) => {
  const handleClick = onClick ? onClick : () => {};
  return (
    <span
      className="uppercase text-xs font-bold text-new-100 bg-blue-200 py-1 px-3 rounded mr-2 hover:cursor-pointer"
      onClick={handleClick}
    >
      {tag}
    </span>
  );
};

export default Tag;
