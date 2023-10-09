import React, { useContext, useEffect, useState } from "react";
import { NoteContext } from "../../Context/NoteContext";
import { UserContext } from "../../Context/UserContext";
import Note from "../Note/Note";
import styles from "./Search.module.css";
import { getNotes } from "../../utils/Note";

export default function SearchNotes() {
  const { notes, setNotes } = useContext(NoteContext);
  const { token } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (notes !== null) {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [notes, searchTerm]);

  useEffect(() => {
    getNotes({ token, update: setNotes });
  }, [token, setNotes]);

  return (
    <>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>Search
      </h2>
      <input
        type="text"
        placeholder="Search by title"
        className="form-control w-75 mx-auto mb-4"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      {searchTerm && filteredNotes.length > 0 ? (
        <div className={styles.notes}>
          {filteredNotes.map((note) => (
            <Note key={note._id} noteobj={note} />
          ))}
        </div>
      ) : searchTerm && filteredNotes.length === 0 ? (
        <h2 className="text-center">No notes found with this name</h2>
      ) : null}
    </>
  );
}