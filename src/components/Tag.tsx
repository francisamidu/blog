import React, { useEffect, useState } from "react";
import { Minus, Slash } from "lucide-react";
import { useRouter } from "next/router";

type TagProps = {
  tag: string;
  onClick?: (tag: string | any) => void;
};
const Tag = ({ tag, onClick }: TagProps) => {
  const handleClick = onClick ? onClick : () => {};
  const [showClear, setShowClear] = useState(false);
  const router = useRouter();
  const handleClear = () => {
    if (router.query["filterby"]) {
      const baseURL = document.URL.split("?")[0];
      router.replace(baseURL);
    }
  };
  useEffect(() => {
    if (router.query["filterby"]) {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  }, [router.query]);
  return (
    <>
      {tag === "Clear" ? (
        <p
          className={`capitalize text-sm text-new-100 bg-blue-200 py-1.5 px-3 rounded-lg mr-2 mb-2 hover:cursor-pointer flex flex-row items-center ${
            showClear ? "block" : "hidden"
          }`}
          onClick={handleClear}
        >
          <span className="mr-2">{tag}</span>
          <Slash size={16} />
        </p>
      ) : (
        <span
          className="capitalize text-sm text-new-100 bg-blue-200 py-1.5 px-3 rounded-lg mr-2 my-1 hover:cursor-pointer"
          onClick={handleClick}
        >
          {tag}
        </span>
      )}
    </>
  );
};

export default Tag;
