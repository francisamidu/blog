import React from "react";
import { useMdxComponentsContext } from "../context/mdxContext";

const Prerequisites: React.FC = () => {
  const { prerequisites } = useMdxComponentsContext();
  return (
    <>
      <h2>Prerequisites</h2>
      <ol>
        {prerequisites.map((prerequisite, index) => (
          <li key={index}>{prerequisite}</li>
        ))}
      </ol>
    </>
  );
};

export default Prerequisites;
