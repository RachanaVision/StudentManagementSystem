using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using StudentManagementSystem;
using StudentManagementSystem.DL;

namespace StudentManagementSystem.Controllers
{
    public class StudentController : Controller
    {
        private StudentDL studentDL = new StudentDL();  

        public ActionResult Index()
        {           
            return View();
        }
        
        public JsonResult GetAllRecords()
        {
            var list = studentDL.GetAllStudents();
            return Json(list,JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetStates(Student student) 
        { 
            var states = studentDL.GetStates();
            return Json(states, JsonRequestBehavior.AllowGet);  
        }

        [HttpPost]
        public ActionResult GetCityByState(int stateid)
        {
            var cities = studentDL.GetCityByState(stateid);           
            return Json(cities,JsonRequestBehavior.AllowGet);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Student student)
        {
            studentDL.InsertRecord(student);
            return View();
        }
        public ActionResult DeleteRecord(int id)
        {
            studentDL.DeleteRecord(id);           
            return RedirectToAction("Index");
        }       

    }
}
