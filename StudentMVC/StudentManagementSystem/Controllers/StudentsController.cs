using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StudentManagementSystem.Controllers
{
    public class StudentsController : Controller
    {
        //  DATA
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }


        // READ: List
        public IActionResult Index()
        {
            var students = _context.Students.ToList();
            return View(students);
        }


        // READ: Details
        public IActionResult Details(int id)
        {
            var student = _context.Students.FirstOrDefault(s => s.StudentId == id);
            return View(student);
        }


        // CREATE: Form
        public IActionResult Create()
        {
            return View();
        }

        // CREATE: Submit
        [HttpPost]
        public IActionResult Create(Student student)
        {
            if (ModelState.IsValid)
            {
                _context.Students.Add(student);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(student);
        }


        // UPDATE: Form
        public IActionResult Edit(int id)
        {
            var student = _context.Students.Find(id);
            return View(student);
        }


        // UPDATE: Submit
        [HttpPost]
        public IActionResult Edit(Student student)
        {
            if (ModelState.IsValid)
            {
                _context.Students.Update(student);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(student);
        }

    }
}
