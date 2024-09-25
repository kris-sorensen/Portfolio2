import * as THREE from "three";

declare module "three" {
  interface ShaderChunk {
    mountainShape: string;
    starMaker: string;
    random: string;
    random2: string;
    meteor: string;
    meteorstorm: string;
  }
}
