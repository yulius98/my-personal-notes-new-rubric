import React from "react";


function NoteActionButton({ variant, onClick, dataTestId, children }) {
  return (
    <button
      className={`note-item__${variant}-button`}
      type="button"
      onClick={onClick}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}

export default NoteActionButton;
