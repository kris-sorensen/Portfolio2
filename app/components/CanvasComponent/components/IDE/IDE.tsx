import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useState, useRef, useEffect } from "react";

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
  const contentEditableRef = useRef(null); // Ref to access the contentEditable div
  const lineNumberRef = useRef(null); // Ref to access the line numbers div
  const { gl, controls } = useThree(); // Access the Three.js renderer and controls

  const handleButtonClick = () => {
    if (contentEditableRef.current) {
      setContent(contentEditableRef.current.innerText); // Update state with the content of the div
    }
  };

  // Synchronize scroll between line numbers and code editor
  const handleScroll = () => {
    if (lineNumberRef.current && contentEditableRef.current) {
      lineNumberRef.current.scrollTop = contentEditableRef.current.scrollTop;
    }
  };

  // Disable scene zoom when scrolling inside the editor
  const handleMouseEnter = () => {
    if (controls) {
      controls.enableZoom = false;
    }
  };

  // Re-enable scene zoom when mouse leaves the editor
  const handleMouseLeave = () => {
    if (controls) {
      controls.enableZoom = true;
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
        <div
          style={{
            display: "flex",
            background: "#282c34",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontFamily: "monospace",
            fontSize: "1rem",
            overflow: "hidden",
            height: "20rem", // Fixed height for the editor container
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
          <div
            ref={contentEditableRef}
            contentEditable
            onScroll={handleScroll} // Sync scrolling
            onMouseEnter={handleMouseEnter} // Disable zoom
            onMouseLeave={handleMouseLeave} // Re-enable zoom
            style={{
              padding: "1rem",
              color: "#abb2bf",
              whiteSpace: "pre-wrap", // Enables word wrapping
              width: "100%",
              background: "transparent",
              lineHeight: "1.5rem",
              overflowY: "auto", // Enable vertical scrolling for the editor
              outline: "none",
              height: "100%", // Ensure the height matches the outer container
            }}
          >
            {content}
          </div>
        </div>
        <button
          onClick={handleButtonClick}
          style={{
            marginTop: "1rem",
            padding: "0.5rem",
            cursor: "pointer",
            background: "#61dafb",
            border: "none",
            borderRadius: "4px",
            fontFamily: "monospace",
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
