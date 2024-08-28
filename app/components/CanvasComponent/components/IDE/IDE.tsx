// todo:: If code errors out when applying to balloon or saving
// todo: undo redo saves every line change?
// todo: fix undo redo. It should undo to default setting if none is saved?
// todo: pass in time to fragment shader and other possibly needed stuff. From fragment shader?
// todo: add vertex shader
// todo: uniform area where you can select what uniforms to add ?
// todo: area where you can select pre-made shader effects code? lazy load

import { Html } from "@react-three/drei";
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
    <group position={[0, 0.1, -viewport.width / 2 + 0.01]}>
      <Html style={{ pointerEvents: "auto" }} transform distanceFactor={1}>
        <div
          style={{
            display: "flex",
            background: "#010101",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontFamily: "'Fira Code', monospace",
            overflow: "hidden",
            height: "20rem",
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
      </Html>
    </group>
  );
};

export default IDE;
