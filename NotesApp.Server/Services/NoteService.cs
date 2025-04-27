using NotesApp.Server.Models;

namespace NotesApp.Server.Services
{
    public class NoteService : INoteService
    {
        private static readonly List<Note> _notes = new();
        private static int _nextId = 1;

        public IEnumerable<Note> GetAll()
        {
            return _notes;
        }

        public Note? GetById(int id)
        {
            return _notes.FirstOrDefault(n => n.Id == id);
        }

        public Note Create(Note note)
        {
            note.Id = _nextId++;
            _notes.Add(note);
            return note;
        }

        public Note? Update(int id, Note updatedNote)
        {
            var note = GetById(id);
            if (note == null)
                return null;

            note.Info1 = updatedNote.Info1;
            note.Info2 = updatedNote.Info2;
            
            return note;
        }

        public bool Delete(int id)
        {
            var note = GetById(id);
            if (note == null)
                return false;

            _notes.Remove(note);
            return true;
        }
    }
} 