import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note.jsx';
import './App.css';

const App = () => {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  

  const deleteNote = (id) => {
    axios.delete(`https://keeperappbackend-itaz.onrender.com/notes/${id}`).then((res) => {
      console.log(res.data);
      setNotes(notes.filter(note => note._id !== id));
    })
    .catch((err) => {
      console.log(err)
    });
  };


  const addNote = (e) => {
    e.preventDefault();
    const newNote = { title, content };
    setNotes([...notes, newNote]);
  
    axios.post('https://keeperappbackend-itaz.onrender.com/notes', newNote)
      .then(res => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setNotes(notes.filter(note => note !== newNote));
      });
  };

  useEffect(() => {
    axios
    .get('https://keeperappbackend-itaz.onrender.com/notes')
    .then((res) => {
      setNotes(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    setCurrentYear(new Date().getFullYear());
  },[]);
  return (
    <div>
      <header>
        <h1>Keeper App</h1>
      </header>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title'/>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder='Take a note...'/>
        <button type="submit">Add</button>
      </form>
      <div>
      {
        notes.map(note => {
          console.log(note._id);
          return (
            <Note key={note._id} title={note.title} content={note.content} delete={() => deleteNote(note._id)}/>
          );
        })
      }
    </div>
    <footer>Copyright © {currentYear}</footer>
    </div>
  );
}

export default App;