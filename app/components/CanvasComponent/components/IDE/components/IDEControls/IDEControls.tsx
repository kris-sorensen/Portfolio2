import React from "react";

interface IDEControlsProps {
  saveContent: () => void;
  handleNew: () => void;
  handleDelete: () => void;
  createBalloon: () => void;
  shaderNames: string[];
  handleShaderSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  index: number;
}

const IDEControls: React.FC<IDEControlsProps> = ({
  saveContent,
  handleNew,
  handleDelete,
  createBalloon,
  shaderNames,
  handleShaderSelect,
  index,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", background: "black" }}>
      <button onClick={saveContent} style={buttonStyle}>
        Save
      </button>
      <button onClick={handleNew} style={buttonStyle}>
        New
      </button>
      <button onClick={handleDelete} style={buttonStyle}>
        Delete
      </button>
      <button onClick={createBalloon} style={buttonStyle}>
        Balloon
      </button>
      <select value={index} onChange={handleShaderSelect} style={selectStyle}>
        {shaderNames.map((name, idx) => (
          <option key={idx} value={idx}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

const buttonStyle = {
  marginRight: ".5rem",
  padding: "0.5rem",
  cursor: "pointer",
  background: "#fb61c0",
  border: "none",
  borderRadius: "4px",
  fontFamily: "'Fira Code', monospace",
  color: "#222",
};

const selectStyle = {
  marginRight: ".5rem",
  padding: "0.5rem",
  borderRadius: "4px",
  color: "#010101",
  fontFamily: "'Fira Code', monospace",
};

export default React.memo(IDEControls);
