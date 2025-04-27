using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NotesApp.Server.DTOs;
using NotesApp.Server.Models;
using NotesApp.Server.Services;

namespace NotesApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;
        private readonly IMapper _mapper;
        private readonly ILogger<NotesController> _logger;

        public NotesController(INoteService noteService, IMapper mapper, ILogger<NotesController> logger)
        {
            _noteService = noteService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<NoteDto>> GetAll()
        {
            var notes = _noteService.GetAll();
            var noteDtos = _mapper.Map<IEnumerable<NoteDto>>(notes);
            return Ok(noteDtos);
        }

        [HttpGet("{id}", Name = "GetNoteById")]
        public ActionResult<NoteDto> GetById(int id)
        {
            var note = _noteService.GetById(id);
            if (note == null)
                return NotFound();

            var noteDto = _mapper.Map<NoteDto>(note);
            return Ok(noteDto);
        }

        [HttpPost]
        public ActionResult<NoteDto> Create(CreateNoteDto createNoteDto)
        {
            var note = _mapper.Map<Note>(createNoteDto);
            var createdNote = _noteService.Create(note);
            var noteDto = _mapper.Map<NoteDto>(createdNote);

            return CreatedAtRoute("GetNoteById", new { id = noteDto.Id }, noteDto);
        }

        [HttpPut("{id}")]
        public ActionResult<NoteDto> Update(int id, UpdateNoteDto updateNoteDto)
        {
            var note = _mapper.Map<Note>(updateNoteDto);
            var updatedNote = _noteService.Update(id, note);
            if (updatedNote == null)
                return NotFound();

            var noteDto = _mapper.Map<NoteDto>(updatedNote);
            return Ok(noteDto);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var result = _noteService.Delete(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
} 