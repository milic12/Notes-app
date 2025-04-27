using System.ComponentModel.DataAnnotations;

namespace NotesApp.Server.DTOs
{
    public class CreateNoteDto
    {
        [Required(ErrorMessage = "Info1 is required")]
        public string Info1 { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Info2 is required")]
        public string Info2 { get; set; } = string.Empty;
    }
} 