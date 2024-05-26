// @ts-nocheck
import * as THREE from "three";
import { useRef } from "react";
import { useFrame, GroupProps } from "@react-three/fiber";
import { Image as GalImage, useScroll } from "@react-three/drei";

// todo: Pass Texture into GalImage. as an overlay or to give a certain look to the image

type ExtendedMaterial = THREE.Material & {
  grayscale: number;
};

type Props = GroupProps & {
  url: string;
  scale: number[];
  position: number[];
};

export default function GalleryImage(props: Props) {
  const ref = useRef<unknown>(null);
  const group = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.z = THREE.MathUtils.damp(
        group.current.position.z,
        Math.max(0, data.delta * 50),
        4,
        delta
      );
      group.current.position.z = THREE.MathUtils.damp(
        group.current.position.z,
        Math.max(0, data.delta * 50),
        4,
        delta
      );
    }
    if (ref.current) {
      ref.current.material.grayscale = THREE.MathUtils.damp(
        ref.current.material.grayscale,
        Math.max(0, 1 - data.delta * 2000),
        4,
        delta
      );
    }
  });

  return (
    <group ref={group}>
      <GalImage ref={ref} {...props} />
    </group>
  );
}
