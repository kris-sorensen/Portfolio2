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

  useEffect(() => {
    // Check if codeRef is not null before applying syntax highlighting
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [content]);

  const handleInput = () => {
    setContent(codeRef.current.innerText); // Update the content with the edited text
  };

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
          {/* Code Editor */}
          <pre
            ref={codeRef}
            contentEditable
            onInput={handleInput} // Update content on input
            className="language-glsl"
            style={{
              padding: "1rem",
              whiteSpace: "pre-wrap", // Enables word wrapping
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
          onClick={() => Prism.highlightAll()}
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
