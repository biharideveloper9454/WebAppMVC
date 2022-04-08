using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAppMVC.Models;

namespace WebAppMVC.Controllers
{
    public class HomeController : Controller
    {
        SecondDBEntities context;

        public HomeController()
        {
            context= new SecondDBEntities();
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ShowData()
        {
            List<tbl_Employee> emp = new List<tbl_Employee>();
            emp = context.tbl_Employee.ToList();
            return Json(emp, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Create(tbl_Employee model)
        {
            var emp = new tbl_Employee()
            {
                FirstName=model.FirstName,
                LastName=model.LastName,
                Gender=model.Gender,
                Mobile=model.Mobile,
                Email=model.Email
            };
            context.tbl_Employee.Add(emp);
            context.SaveChanges();
            return Json(emp, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            var emp = context.tbl_Employee.SingleOrDefault(e => e.Id == id);
            context.tbl_Employee.Remove(emp);
            context.SaveChanges();
            return Json(emp, JsonRequestBehavior.AllowGet);
        }
       
       
        [HttpGet]
        public JsonResult Edit(int id)
        {
            var emps = context.tbl_Employee.SingleOrDefault(e => e.Id == id);
            return Json(emps, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Update(tbl_Employee model)
        {
            var emp = new tbl_Employee()
            {
                Id=model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Gender = model.Gender,
                Mobile = model.Mobile,
                Email = model.Email
            };
            context.Entry(emp).State = System.Data.EntityState.Modified;
            context.SaveChanges();
            return Json(emp, JsonRequestBehavior.AllowGet);
        }

       
    }
}