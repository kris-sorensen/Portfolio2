import React, { useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view"; // Import EditorView to create a custom theme

const neonPink = "#ff6cb5";
const neonBlue = "#00f2de";
const neonGreen = "#39ff14";
const neonYellow = "#ffff33";
const neonPurple = "#a349a4";

const customTheme = EditorView.theme(
  {
    "&": {
      color: neonPink, // Default text color (neon blue)
      backgroundColor: "#000000", // Pure black background
    },
    ".cm-content": {
      caretColor: neonPink, // Cursor color (neon pink)
    },
    ".cm-gutters": {
      backgroundColor: "#000000", // Line numbers background (black)
      color: "#ffffff", // Line numbers color (white)
      border: "none", // No border for the gutters
    },
    ".cm-lineNumbers .cm-gutterElement": {
      color: "#ffffff", // White line numbers
    },
    ".cm-activeLine": {
      backgroundColor: "#151515", // Slightly darker black for the active line
    },
    ".cm-selectionBackground": {
      backgroundColor: neonGreen, // Neon pink selection background
    },
    ".cm-cursor": {
      borderLeft: `2px solid ${neonYellow}`, // Neon pink cursor
    },
    ".cm-matchingBracket": {
      backgroundColor: neonBlue, // Neon blue for matching brackets
      outline: `1px solid ${neonPurple}`, // Neon pink outline for matching brackets
    },
    ".cm-gutterElement": {
      padding: "0 4px",
    },
  },
  { dark: true }
); // Set `dark: true` for a dark theme

const extensions = [javascript({ jsx: true })];

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef(null);

  return (
    <CodeMirror
      ref={editorRef}
      value={value}
      indentWithTab
      autoFocus={true}
      onChange={onChange}
      theme={customTheme} // Apply your custom theme here
      extensions={extensions}
      width={`100%`}
      height={`500px`}
    />
  );
};

export default React.memo(CodeEditor);
