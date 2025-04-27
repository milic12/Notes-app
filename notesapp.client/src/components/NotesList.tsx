import { Link } from "react-router-dom";
import {
  useGetNotesQuery,
  useDeleteNoteMutation,
} from "../redux/services/notesApi";

const NotesList = () => {
  const { data: notes, isLoading, isError, error } = useGetNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id).unwrap();
    } catch (error) {
      console.error("Failed to delete the note:", error);
    }
  };

  console.log("notes", notes);
  console.log("error details", error);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading notes</div>;

  return (
    <div className="notes-list">
      <div className="header-actions">
        <Link to="/create" className="btn btn-primary">
          Add New Note
        </Link>
      </div>

      <h2>All Notes : </h2>
      {notes && notes.length > 0 ? (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>Note #{note.id}</h3>
              <p>
                <strong>Info 1:</strong> {note.info1}
              </p>
              <p>
                <strong>Info 2:</strong> {note.info2}
              </p>
              <div className="note-actions">
                <Link to={`/edit/${note.id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No notes found. Create note</p>
      )}
    </div>
  );
};

export default NotesList;
