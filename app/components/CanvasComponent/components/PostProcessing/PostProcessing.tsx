import React from "react";
import GodRaysComponent from "./components/GodRays/GodRays";

export interface PostProcessingProps {}

const PostProcessing: React.FC<PostProcessingProps> = () => {
  return (
    <>
      <GodRaysComponent />
    </>
  );
};

export default PostProcessing;
