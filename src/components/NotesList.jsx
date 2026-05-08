import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list' }) {
  
  const hasNotes = Array.isArray(notes) && notes.length > 0; 

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan tersedia.
        </p>
      </div>
    );
  }

  const groupedNotes = notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const key = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(note);
    return groups;
  }, {});

  return (
    <div className="notes-list" data-testid={dataTestId}>
      
      {Object.entries(groupedNotes).map(([monthYear, groupNotes]) => (
        <section key={monthYear} className="notes-group">
          <h3 className="notes-group__title">{monthYear} ({groupNotes.length})</h3>
          
          {groupNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={onDelete}
              onArchive={onArchive}
            />
          ))}
        </section>
      ))}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
};

export default NotesList;
