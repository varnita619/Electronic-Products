const { request } = require("express");
var express = require("express");
var router = express.Router();
var pool = require("./pool");
var LocalStorage=require("node-localstorage").LocalStorage
localStorage=new LocalStorage('./scratch')

/* GET home page. */
router.get("/adminlogin", function (req, res, next) {
  res.render("adminlogin", { msg: "" });
});

router.post("/checklogin", function (req, res, next) {
  var pcount = 0;
  var scount = 0;

  pool.query("select count(*) as pc from products", function(error,result){
    console.log("product",result[0].pc)
    pcount=result   
  });

  pool.query("select count(*) as sc from suppliers", function(error,result){
    scount=result
  });


  pool.query(
    "select * from adminlogin where adminid=? and password=?",
    [req.body.adminid, req.body.password],
    function (error, result) {
      console.log('xxxxxxxx',result)
      if (error) {
        console.log(error);
        res.render("adminlogin", { msg: "Server Error" });
      } else {
        if (result.length == 0) {
          res.render("adminlogin", { msg: "Invalid UserId/Password" });
        } else {
         
          localStorage.setItem("ADMIN",result)  
          res.render("dashboard", {
            admin:result[0],
            productcount:pcount[0].pc,
            suppliercount:scount[0].sc,
          });
        }
      }
    }
  );
 });
  router.get("/logout", function (req, res, next) {
    localStorage.clear();
    res.render("adminlogin", { msg: "" });
});

module.exports = router;
