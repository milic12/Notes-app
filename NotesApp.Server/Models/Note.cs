using System.ComponentModel.DataAnnotations;

namespace NotesApp.Server.Models
{
    public class Note
    {
        public int Id { get; set; }
        
        [Required]
        public string Info1 { get; set; } = string.Empty;
        
        [Required]
        public string Info2 { get; set; } = string.Empty;
    }
} 