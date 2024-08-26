import { Html } from "@react-three/drei";
import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import PrismJSLoader from "../PrismJSLoader/PrismJSLoader";
import "prismjs/themes/prism-funky.css"; // Or your chosen funky theme

const fragmentShader = `
precision mediump float;

varying vec3 vPosition;

void main() {
    // Convert the position to spherical coordinates
    float u = atan(vPosition.z, vPosition.x) / (2.0 * 3.141592653589793) + 0.5;
    float v = asin(vPosition.y / length(vPosition)) / 3.141592653589793 + 0.5;
    
    vec3 finalColor = vec3(1.,1.,0.);

    gl_FragColor = vec4(finalColor, 1.0);
}`;

const CodeEditor = () => {
  const [content, setContent] = useState(fragmentShader); // State to hold the content of the div
  const codeRef = useRef(null); // Ref to access the code block
  const caretPosition = useRef(null); // To store caret position

  useEffect(() => {
    // Highlight the code when content changes
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [content]);

  const saveCaretPosition = () => {
    const selection = window.getSelection();
    console.log(`selection`, selection);
    if (selection.rangeCount > 0) {
      caretPosition.current = selection.getRangeAt(0);
    }
  };

  const restoreCaretPosition = () => {
    const selection = window.getSelection();
    if (caretPosition.current) {
      selection.removeAllRanges();
      selection.addRange(caretPosition.current);
    }
  };

  const saveContent = () => {
    Prism.highlightAll();
    // Additional save logic can go here if needed
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLPreElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Save caret position and line content
      const selection = window.getSelection();
      console.log(`selection`, selection);
      const range = selection?.getRangeAt(0);
      const currentLine = range?.startContainer?.parentElement;

      // Highlight the current line
      if (currentLine) {
        Prism.highlightElement(currentLine);
      }

      // Move to the next line by inserting a new line
      document.execCommand("insertHTML", false, "\n");

      // Update content state to keep track of the code
      if (codeRef.current) {
        setContent(codeRef.current.innerText);
      }
    }
  };

  useEffect(() => {
    // Restore caret position after content update
    restoreCaretPosition();
  }, [content]);

  useEffect(() => {
    // Add keydown listener to the document
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <PrismJSLoader />
      <div
        style={{
          display: "flex",
          background: "#000000",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          fontFamily: "'Fira Code', monospace",
          fontSize: "1rem",
          overflow: "hidden",
          color: "#fff", // General text color
          height: "20rem", // Fixed height for the editor container
          width: "40rem", // Fixed width for the editor container
        }}
      >
        {/* Code Editor */}
        <pre
          ref={codeRef}
          contentEditable
          className="language-glsl"
          style={{
            padding: "1rem",
            whiteSpace: "pre", // Enables word wrapping
            width: "100%",
            background: "transparent",
            lineHeight: "1.5rem",
            overflowY: "auto", // Enable vertical scrolling for the editor
            outline: "none",
            height: "100%", // Ensure the height matches the outer container
          }}
        >
          <code className="language-glsl">{content}</code>
        </pre>
      </div>
      <button
        onClick={saveContent}
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          cursor: "pointer",
          background: "#61dafb",
          border: "none",
          borderRadius: "4px",
          fontFamily: "'Fira Code', monospace",
          color: "#282c34",
        }}
      >
        Save Content
      </button>
    </>
  );
};

export default CodeEditor;
