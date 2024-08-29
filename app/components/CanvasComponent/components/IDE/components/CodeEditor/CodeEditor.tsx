import React, { useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { useThree } from "@react-three/fiber";

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
      theme={dracula}
      extensions={extensions}
      height={`${window.innerHeight / 3}px`}
      // minHeight="20rem"
      // maxHeight={`${window.innerHeight / 3}px`}
      width={`${window.innerWidth / 2}px`}
      // minWidth =
      // maxWidth={`${window.innerWidth / 2}px`}
    />
  );
};

export default React.memo(CodeEditor);
