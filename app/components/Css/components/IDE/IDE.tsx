import React, { useState, useEffect, useCallback } from "react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import IDEControls from "./components/IDEControls/IDEControls";
import { createDefaultShader, extractShaderName } from "./util/shaderUtils";

interface IDEProps {
  addBalloon: (fragmentShader: string) => void;
  toggleVisibility: () => void;
  isVisible: boolean;
}

const IDE: React.FC<IDEProps> = ({
  addBalloon,
  toggleVisibility,
  isVisible,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [savedShaders, setSavedShaders] = useState<string[]>([
    createDefaultShader(0),
  ]);
  const [editorContent, setEditorContent] = useState<string>(savedShaders[0]);

  useEffect(() => {
    const storedShaders = JSON.parse(
      localStorage.getItem("savedShaders") || "[]"
    );
    if (storedShaders.length > 0) {
      setSavedShaders(storedShaders);
      setEditorContent(storedShaders[0]);
    }
  }, []);

  const shaderNames = savedShaders.map((shader, idx) =>
    extractShaderName(shader)
  );

  const saveContent = useCallback(() => {
    const shaderName = extractShaderName(editorContent);
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

  return (
    <div
      style={{
        display: isVisible ? "flex" : "none",
        opacity: 0.95,
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.993)",
        transition: "background 0.5s ease",
        position: "fixed", // Ensure it stays fixed in the viewport
        top: 0,
        left: 0,
        zIndex: 9, // High z-index to make sure it's on top of other content
      }}
    >
      <button
        onClick={toggleVisibility}
        style={{
          position: "absolute",
          top: "8rem",
          right: "8rem",
          padding: "0.5rem 1rem",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 9, // Ensure the button is on top of everything else
        }}
      >
        X
      </button>

      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div
          style={{
            width: "100%",
            height: `100%`,
            maxHeight: "40rem",
            marginBottom: "1rem",
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
  );
};

export default IDE;
