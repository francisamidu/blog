import React from "react";

type HeadingProps = {
  heading: string;
};
const Heading = ({ heading }: HeadingProps) => {
  return (
    <h2 className="uppercase text-xs font-bold text-new-400 mb-4">{heading}</h2>
  );
};

export default Heading;
