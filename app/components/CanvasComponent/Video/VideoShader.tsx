"use client";
import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { fragmentShader, vertexShader } from "../Shaders/videoShader";
import { useVideoTexture } from "@react-three/drei";
// import testVideo from "@/public/video/DogBoarding.webm";
// import testVideo from "@/public/videos/stockDogVideo.mov";

const VideoShader = () => {
  const mat = useRef(null);

  // useFrame(({ clock }) => {
  //   if (!mat.current) return;
  //   const elapsedTime = clock.getElapsedTime();
  //   // @ts-ignore
  //   mat.current.uniforms.iTime.value = elapsedTime;
  // });

  const dogVideo = useVideoTexture("/videos/dogs_petting_1_4k_webm.webm");
  // const dogVideo = useVideoTexture("/videos/dogs_petting_1_mp4.mp4");

  console.log(`dogvideo`, dogVideo);
  return (
    <shaderMaterial
      // transparent
      ref={mat}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        dogVideo: { value: dogVideo },
      }}
    />
  );
};

export default React.memo(VideoShader);
