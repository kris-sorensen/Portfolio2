import { Center, Html } from "@react-three/drei";
import React, { useRef, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const extensions = [javascript({ jsx: true })];

// Function to create a new shader template with dynamic name
const createDefaultShader = (index) => `
// NAME: {Shader ${index + 1}}
precision mediump float;

varying vec3 vPosition;

void main() {
    // Convert the position to spherical coordinates
    float u = atan(vPosition.z, vPosition.x) / (2.0 * 3.141592653589793) + 0.5;
    float v = asin(vPosition.y / length(vPosition)) / 3.141592653589793 + 0.5;
    
    vec3 finalColor = vec3(1.,1.,0.);

    gl_FragColor = vec4(finalColor, 1.0);
}`;

// Function to extract the shader name from the content or generate a default name
const extractShaderName = (shader, index) => {
  const nameMatch = shader.match(/\/\/\s*NAME:\s*{([^}]*)}/);
  return nameMatch && nameMatch[1].trim() !== ""
    ? nameMatch[1]
    : `Shader ${index + 1}`; // Generate default name like Shader 1, Shader 2, etc.
};

const IDE = () => {
  const editorRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [savedShaders, setSavedShaders] = useState([createDefaultShader(0)]);
  const [editorContent, setEditorContent] = useState(savedShaders[0]);
  const [shaderNames, setShaderNames] = useState([
    extractShaderName(savedShaders[0], 0),
  ]);

  const saveContent = () => {
    const updatedShaders = [...savedShaders];
    updatedShaders[index] = editorContent; // Save the content in savedShaders array
    setSavedShaders(updatedShaders);

    const newShaderName = extractShaderName(editorContent, index);
    const updatedNames = [...shaderNames];
    updatedNames[index] = newShaderName; // Update the name at the current index
    setShaderNames(updatedNames);

    // Save shaders to local storage
    localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));

    console.log("Content saved:", editorContent);
  };

  const handleNew = () => {
    const newShader = createDefaultShader(savedShaders.length);
    const updatedShaders = [...savedShaders, newShader];
    setSavedShaders(updatedShaders);

    const newShaderName = extractShaderName(newShader, savedShaders.length);
    setShaderNames([...shaderNames, newShaderName]);

    setIndex(updatedShaders.length - 1); // Set index to the new shader

    // Save shaders to local storage
    localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));
  };

  const handleDelete = () => {
    if (savedShaders.length > 1) {
      const updatedShaders = savedShaders.filter((_, idx) => idx !== index);
      const updatedNames = shaderNames.filter((_, idx) => idx !== index);

      setSavedShaders(updatedShaders);
      setShaderNames(updatedNames);

      const newIndex =
        index >= updatedShaders.length ? updatedShaders.length - 1 : index;
      setIndex(newIndex);

      setEditorContent(updatedShaders[newIndex]);

      // Save shaders to local storage
      localStorage.setItem("savedShaders", JSON.stringify(updatedShaders));
    } else {
      alert("You need to have at least one shader.");
    }
  };

  const handleShaderSelect = (e) => {
    setIndex(parseInt(e.target.value)); // Navigate to the selected shader by updating the index
  };

  const handleEditorChange = (value) => {
    setEditorContent(value); // Update state with the latest editor content
  };

  // Load shaders from local storage when the component mounts
  useEffect(() => {
    const storedShaders = JSON.parse(localStorage.getItem("savedShaders"));
    if (storedShaders && storedShaders.length > 0) {
      setSavedShaders(storedShaders);
      setShaderNames(
        storedShaders.map((shader, idx) => extractShaderName(shader, idx))
      );
      setIndex(storedShaders.length - 1); // Set to the last shader
      setEditorContent(storedShaders[storedShaders.length - 1]); // Show the last shader on load
    }
  }, []);

  // Update the editor content when the index changes
  useEffect(() => {
    setEditorContent(savedShaders[index]);
  }, [index, savedShaders]);

  return (
    <group position={[0, 0, 2]}>
      <Html
        occlude="blending"
        transform
        style={{ pointerEvents: "auto" }} // Enable pointer events for the HTML wrapper
      >
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
          <CodeMirror
            ref={editorRef}
            value={editorContent}
            onChange={handleEditorChange}
            height="100%"
            theme={dracula}
            extensions={extensions}
          />
        </div>
        <div
          style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}
        >
          <button
            onClick={saveContent}
            style={{
              marginRight: ".5rem",
              padding: "0.5rem",
              cursor: "pointer",
              background: "#fb61c0",
              border: "none",
              borderRadius: "4px",
              fontFamily: "'Fira Code', monospace",
              color: "#222",
            }}
          >
            Save
          </button>
          <button
            onClick={handleNew}
            style={{
              marginRight: ".5rem",
              padding: "0.5rem",
              cursor: "pointer",
              background: "#61a4fb",
              border: "none",
              borderRadius: "4px",
              fontFamily: "'Fira Code', monospace",
              color: "#010101",
            }}
          >
            New
          </button>
          <button
            onClick={handleDelete}
            style={{
              marginRight: ".5rem",
              padding: "0.5rem",
              cursor: "pointer",
              background: "#ff5c5c",
              border: "none",
              borderRadius: "4px",
              fontFamily: "'Fira Code', monospace",
              color: "#010101",
            }}
          >
            Delete
          </button>
          <button
            onClick={saveContent}
            style={{
              marginRight: ".5rem",
              padding: "0.5rem",
              cursor: "pointer",
              background: "#61fbb8",
              border: "none",
              borderRadius: "4px",
              fontFamily: "'Fira Code', monospace",
              color: "#010101",
            }}
          >
            Balloon
          </button>
          <select
            value={index}
            onChange={handleShaderSelect}
            style={{
              marginRight: ".5rem",
              padding: "0.5rem",
              borderRadius: "4px",
              color: "#010101",
              fontFamily: "'Fira Code', monospace",
            }}
          >
            {shaderNames.map((name, idx) => (
              <option key={idx} value={idx}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </Html>
    </group>
  );
};

export default IDE;