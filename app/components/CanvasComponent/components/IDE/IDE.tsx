import { Html } from "@react-three/drei";
import React, { useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const extensions = [javascript({ jsx: true })];

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
  // const [content, setContent] = useState(fragmentShader);
  const content = useRef(fragmentShader);

  const handleEditorChange = (value: string) => {
    content.current = value;
    // setContent(value); // Update content when changes are made in the editor
  };

  const saveContent = () => {
    console.log(`content`, content);
    console.log(`save`);
  };

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
            fontFamily: "'Fira Code', monospace",
            overflow: "hidden",
            height: "20rem",
          }}
        >
          <CodeMirror
            value={content.current}
            onChange={handleEditorChange}
            height="100%"
            theme={dracula}
            extensions={[javascript({ jsx: true })]}
          />
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
