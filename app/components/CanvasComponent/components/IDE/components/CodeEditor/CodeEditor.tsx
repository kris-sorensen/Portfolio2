import React, { useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

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
      onChange={onChange}
      height="100%"
      theme={dracula}
      extensions={extensions}
    />
  );
};

export default React.memo(CodeEditor);
