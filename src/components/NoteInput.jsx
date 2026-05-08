import React from 'react';


class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      remainingChars: 50,
      isWarning: false,
      bodyError:''
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    let value = event.target.value

    if (value.length > 50) {
      value = value.slice(0,50)
    }

    const remaining = 50 - value.length
    this.setState({
      title: value,
      remainingChars: remaining,
      isWarning: remaining < 10
    })
    console.warn('[TODO] Handle title change', event.target.value);
  }

  onBodyChangeEventHandler(event) {
    
    this.setState ({
      body: event.target.value,
      bodyError:''
    })
    console.warn('[TODO] Handle body change', event.target.value);
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    if (this.state.body.length < 10) {
      this.setState({ bodyError: 'Catatan minimal harus 10 karakter.' });
      return;
    }

    this.props.addNote({
      title: this.state.title,
      body: this.state.body
    });

    this.setState({
      title: '',
      body: '',
      remainingChars: 50,
      isWarning: false,
      bodyError: ''
    });
    console.warn('[TODO] Submit note', this.state);
  }

  render() {
    
    const { remainingChars, isWarning, bodyError } = this.state;
    

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {bodyError && (
          <p
            className="note-input__feedback--error"
            data-testid="note-input-body-error"
          >
            {bodyError}
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          
          <p
            className="note-input__title__char-limit"
            data-testid="note-input-title-remaining"
            style={{ color: isWarning ? 'red' : 'inherit' }}
          >
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
