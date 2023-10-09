import { useContext } from "react";
import { showDelete, showUpdate } from "../../utils/Note";
import style from "./Note.module.css";
import { UserContext } from "../../Context/UserContext";
import { NoteContext } from "../../Context/NoteContext";

export default function Note({noteobj}) {
  const {token} = useContext(UserContext);
  const {setNotes} = useContext(NoteContext);
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">{noteobj.title}</h2>
          <p className={`mb-0 mt-2`}>{noteobj.content}</p>
        </div>

        <div className="note-footer">
          <i onClick={()=> showUpdate({prevTitle:noteobj.title , prevContent:noteobj.content, noteId:noteobj._id , token , update:setNotes})} className="fa-solid fa-pen-to-square pointer me-2"></i>

          <i onClick={()=> showDelete({noteId:noteobj._id , token, update:setNotes })} className="bi bi-archive-fill pointer"></i>
        </div>
      </div>
    </>
  );
}
