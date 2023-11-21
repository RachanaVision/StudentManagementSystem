using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentManagementSystem.DL
{

    public class StudentDL
    {
        private StudentsManagementSystemEntities db = new StudentsManagementSystemEntities();
        public List<State> GetStates()
        {
            var statelist = db.States.ToList();
            return statelist;
        }

        public List<City> GetCityByState(int stateid)
        {
            var city = db.Cities.Where(x => x.StateId == stateid).ToList();
            return city;
        }

        public List<Student> GetAllStudents()
        {
            var studentlist = db.Students.ToList();
            return studentlist;
        }

        public void InsertRecord(Student student)
        {
            db.Students.Add(student);
            db.SaveChanges();
        }

        public void DeleteRecord(int id)
        {
            Student student = db.Students.Find(id);
            db.Students.Remove(student);
            db.SaveChanges();
        }

        public Student GetStudentById(int id) 
        {
            Student student = db.Students.Find(id);
            return student;
        }
    }
}