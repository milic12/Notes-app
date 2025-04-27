using AutoMapper;
using NotesApp.Server.DTOs;
using NotesApp.Server.Models;

namespace NotesApp.Server.MappingProfiles
{
    public class NoteProfile : Profile
    {
        public NoteProfile()
        {
            CreateMap<Note, NoteDto>();
            CreateMap<CreateNoteDto, Note>();
            CreateMap<UpdateNoteDto, Note>();
        }
    }
} 