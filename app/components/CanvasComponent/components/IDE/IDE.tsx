// todo:: If code errors out when applying to balloon or saving
// todo: undo redo saves every line change?
// todo: fix undo redo. It should undo to default setting if none is saved?
// todo: pass in time to fragment shader and other possibly needed stuff. From fragment shader?
// todo: add vertex shader
// todo: uniform area where you can select what uniforms to add ?
// todo: area where you can select pre-made shader effects code? lazy load

import { Html, Lightformer } from "@react-three/drei";
import React, { useState, useEffect, useCallback } from "react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import IDEControls from "./components/IDEControls/IDEControls";
import { createDefaultShader, extractShaderName } from "./util/shaderUtils";
import { useThree } from "@react-three/fiber";

const IDE: React.FC<{ addBalloon: (fragmentShader: string) => void }> = ({
  addBalloon,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [savedShaders, setSavedShaders] = useState<string[]>(() => {
    const storedShaders = JSON.parse(
      localStorage.getItem("savedShaders") || "[]"
    );
    return storedShaders.length > 0 ? storedShaders : [createDefaultShader(0)];
  });
  const [editorContent, setEditorContent] = useState<string>(savedShaders[0]);

  const { viewport } = useThree();

  const shaderNames = savedShaders.map((shader, idx) =>
    extractShaderName(shader)
  );

  const saveContent = useCallback(() => {
    const shaderName = extractShaderName(editorContent);

    // Check if the shader name is still default or empty
    if (!shaderName || shaderName.startsWith("Shader ")) {
      alert("Please select a unique name for your shader before saving.");
      return;
    }

    const updatedShaders = [...savedShaders];
    updatedShaders[index] = editorContent;
    setSavedShaders(updatedShaders);
    localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));
  }, [index, editorContent, savedShaders]);

  const handleNew = useCallback(() => {
    const newShader = createDefaultShader(savedShaders.length);
    const updatedShaders = [...savedShaders, newShader];
    setSavedShaders(updatedShaders);
    setIndex(updatedShaders.length - 1);
    localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));
  }, [savedShaders]);

  const handleDelete = useCallback(() => {
    if (savedShaders.length > 1) {
      const updatedShaders = savedShaders.filter((_, idx) => idx !== index);
      setSavedShaders(updatedShaders);
      const newIndex =
        index >= updatedShaders.length ? updatedShaders.length - 1 : index;
      setIndex(newIndex);
      setEditorContent(updatedShaders[newIndex]);
      localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));
    }
  }, [index, savedShaders]);

  const handleShaderSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setIndex(parseInt(e.target.value));
    },
    []
  );

  const handleEditorChange = useCallback((value: string) => {
    setEditorContent(value);
  }, []);

  const createBalloon = useCallback(() => {
    addBalloon(editorContent);
  }, [addBalloon, editorContent]);

  useEffect(() => {
    setEditorContent(savedShaders[index]);
  }, [index, savedShaders]);

  return (
    <group
      position={[0, 0, (-viewport.width * 2) / 2 + 0.02]}
      scale={[1, 0.8, 1]}
    >
      {/* RectAreaLight positioned behind the IDE */}
      <Lightformer
        position={[0, 0, -0.01]}
        form="rect" // circle | ring | rect (optional, default = rect)
        intensity={1} // power level (optional = 1)
        color="white" // (optional = white)
        scale={[3.75, 1.65, 1]} // Scale it any way you prefer (optional = [1, 1])
        target={[0, 0, 0]} // Target position (optional = undefined)
      />
      <Html transform distanceFactor={1} occlude="blending">
        <div
          style={{
            overflow: "scroll",
          }}
        >
          <div>
            <div
              style={{
                width: `${1400}px`,
                height: `${500}px`,
              }}
            >
              <CodeEditor value={editorContent} onChange={handleEditorChange} />
            </div>
            <IDEControls
              saveContent={saveContent}
              handleNew={handleNew}
              handleDelete={handleDelete}
              createBalloon={createBalloon}
              shaderNames={shaderNames}
              handleShaderSelect={handleShaderSelect}
              index={index}
            />
          </div>
        </div>
      </Html>
    </group>
  );
};

export default IDE;
