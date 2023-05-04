import './App.css';
import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
  },
});

function App() {
  const [newNote, setNewNote] = useState('');
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(notesSlice.actions.addNote(newNote));
      setNewNote('');
    }
  };

  return (
    <div>
      <h1>Simple Notetaking App with Redux</h1>
      <input type="text" value={newNote} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

function AppWithRedux() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWithRedux;