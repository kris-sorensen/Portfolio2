import React, { useState, useEffect, useCallback } from "react";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import IDEControls from "./components/IDEControls/IDEControls";
import { createDefaultShader, extractShaderName } from "./util/shaderUtils";

const IDE: React.FC<{ addBalloon: (fragmentShader: string) => void }> = ({
  addBalloon,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [savedShaders, setSavedShaders] = useState<string[]>([
    createDefaultShader(0),
  ]);
  const [editorContent, setEditorContent] = useState<string>(savedShaders[0]);
  const [isVisible, setVisible] = useState(true); // State to control the visibility of everything

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedShaders = JSON.parse(
        localStorage.getItem("savedShaders") || "[]"
      );
      if (storedShaders.length > 0) {
        setSavedShaders(storedShaders);
        setEditorContent(storedShaders[0]);
      }
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
    if (typeof window !== "undefined") {
      localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));
    }
  }, [index, editorContent, savedShaders]);

  const handleNew = useCallback(() => {
    const newShader = createDefaultShader(savedShaders.length);
    const updatedShaders = [...savedShaders, newShader];
    setSavedShaders(updatedShaders);
    setIndex(updatedShaders.length - 1);
    if (typeof window !== "undefined") {
      localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));
    }
  }, [savedShaders]);

  const handleDelete = useCallback(() => {
    if (savedShaders.length > 1) {
      const updatedShaders = savedShaders.filter((_, idx) => idx !== index);
      setSavedShaders(updatedShaders);
      const newIndex =
        index >= updatedShaders.length ? updatedShaders.length - 1 : index;
      setIndex(newIndex);
      setEditorContent(updatedShaders[newIndex]);
      if (typeof window !== "undefined") {
        localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));
      }
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

  const toggleVisibility = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    setEditorContent(savedShaders[index]);
  }, [index, savedShaders]);

  return (
    <div
      style={{
        display: isVisible ? "flex" : "none",
        opacity: 0.95,
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        background: isVisible
          ? "linear-gradient(to right, #000000, #434343)" // Gradient background
          : "none", // No background when hidden
        transition: "background 0.5s ease", // Smooth transition for background
        position: "relative", // For positioning the close button
      }}
    >
      {/* X Button to hide everything */}
      <button
        onClick={toggleVisibility}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "0.5rem 1rem",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 10, // Keep the button above everything
        }}
      >
        X
      </button>

      {/* Container for the editor and controls */}
      <div
        style={{
          display: isVisible ? "block" : "none", // Hide everything when not visible
          width: "100%",
          maxWidth: "800px", // Maximum width of the container
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
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
    </div>
  );
};

export default IDE;
