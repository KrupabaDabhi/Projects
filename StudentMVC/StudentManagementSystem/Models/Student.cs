using System;

namespace StudentManagementSystem.Models
{
    public class Student
    {
        public int StudentId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Course { get; set; }

        public DateTime EnrollmentDate { get; set; }
    }
}
