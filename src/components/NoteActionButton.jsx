import React from 'react';
import PropTypes from 'prop-types';

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

NoteActionButton.propTypes = {
  variant: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NoteActionButton;