using NotesApp.Server.Models;

namespace NotesApp.Server.Services
{
    public interface INoteService
    {
        IEnumerable<Note> GetAll();
        Note? GetById(int id);
        Note Create(Note note);
        Note? Update(int id, Note note);
        bool Delete(int id);
    }
} 