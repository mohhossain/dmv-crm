import React from "react";
import convertDate from "./dateConverter.js";
function Note({ note }) {
  return (
    <div>
      <div key={note.id} id="job-note">
        <p>{note?.note}</p>
        <p>{note?.user?.name}</p>
        <p>{convertDate(note?.createdAt)}</p>
      </div>
    </div>
  );
}

export default Note;
