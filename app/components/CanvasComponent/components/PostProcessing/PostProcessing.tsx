import React from "react";
import GodRaysComponent from "./components/GodRays/GodRays";
import useStore from "@/app/store/useStore";

export interface PostProcessingProps {}

const PostProcessing: React.FC<PostProcessingProps> = () => {
  const Page = useStore((state) => state.Page); // Use global store to get Page
  return (
    <>
      <GodRaysComponent currentPage={Page} />
    </>
  );
};

export default PostProcessing;
