using System;
using System.Collections.Generic;
using System.Configuration;
using Sample_CRUD.Models;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sample_CRUD.Controllers
{
    public class HomeController : Controller
    {
        SampleCRUDEntities db = new SampleCRUDEntities();
        public ActionResult Index()
        {
            ViewBag.Students = db.tbl_Student.ToList();
            var cmbGender = db.tbl_Gender.OrderBy(m => m.Description);
            ViewBag.cmbGender = new SelectList(cmbGender, "GenderID", "Description");

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        //Student
        public ActionResult GetStudents()
        {
            try
            {
                var list = db.tbl_Student.ToList();
                List<object> objlist = new List<object>();
                foreach (var item in list)
                {
                    var obj = new
                    {
                        StudentID = item.StudentID,
                        FirstName = item.FirstName,
                        MiddleName = item.MiddleName,
                        LastName = item.LastName,
                        YearLevel = item.YearLevel,
                    };
                    objlist.Add(obj);
                }
                return Json(new { data = objlist }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult SaveStudent(tbl_Student student)
        {
            try
            {
                if (student.StudentID == 0)
                {
                    db.tbl_Student.Add(student);
                }
                else
                {
                    var qry = db.tbl_Student.Where(x => x.StudentID == student.StudentID).SingleOrDefault();
                    qry.FirstName = student.FirstName;
                    qry.MiddleName = student.MiddleName;
                    qry.LastName = student.LastName;
                    qry.GenderID = student.GenderID;
                    qry.YearLevel = student.YearLevel;
                    qry.Province = student.Province;
                    qry.City = student.City;
                    qry.Purok = student.Purok;
                    qry.Street = student.Street;
                }
                db.SaveChanges();
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }    
        }
        public ActionResult DeleteStudent(int id)
        {
            var qry = db.tbl_Student.Where(x => x.StudentID == id).SingleOrDefault();
            db.tbl_Student.Remove(qry);
            db.SaveChanges();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateStudent(int id)
        {
            var qry = db.tbl_Student.Where(x => x.StudentID == id).SingleOrDefault();
            return Json(new { data = qry }, JsonRequestBehavior.AllowGet);
        }

    }
}