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

const IDE = () => {
  const [content, setContent] = useState(fragmentShader); // State to hold the content of the div
  const codeRef = useRef(null); // Ref to access the code block
  const lineNumberRef = useRef(null); // Ref to access the line numbers div
  const caretPosition = useRef(null); // To store caret position

  useEffect(() => {
    // Highlight the code when content changes
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [content]);

  const saveCaretPosition = () => {
    const selection = window.getSelection();
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter behavior
      saveCaretPosition(); // Save the current caret position

      // Insert a new line at the caret position
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const newLine = document.createTextNode("\n");
      range.insertNode(newLine);

      // Move the cursor after the new line
      range.setStartAfter(newLine);
      range.setEndAfter(newLine);
      selection.removeAllRanges();
      selection.addRange(range);

      // Update the content state
      setContent(codeRef.current.innerText);

      saveContent(); // Call saveContent
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

  const handleScroll = () => {
    if (lineNumberRef.current && codeRef.current) {
      lineNumberRef.current.scrollTop = codeRef.current.scrollTop;
    }
  };

  // Splitting the code into lines for numbering
  const codeLines = content.split("\n");

  return (
    <group position={[-8, 4, -2]}>
      <Html
        occlude="blending"
        transform
        style={{ pointerEvents: "auto" }} // Enable pointer events for the HTML wrapper
      >
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
          {/* Line Numbers */}
          <div
            ref={lineNumberRef}
            style={{
              background: "#333842",
              color: "#848DA0",
              padding: "1rem",
              textAlign: "right",
              userSelect: "none",
              lineHeight: "1.5rem",
              paddingRight: "1rem",
              height: "100%",
              overflow: "hidden", // No independent scrolling for line numbers
            }}
          >
            {codeLines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Editor */}
          <pre
            ref={codeRef}
            contentEditable
            onScroll={handleScroll} // Sync scrolling between editor and line numbers
            className="language-glsl"
            style={{
              padding: "1rem",
              whiteSpace: "pre", // Disable word wrapping for proper line numbering
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
      </Html>
    </group>
  );
};

export default IDE;
