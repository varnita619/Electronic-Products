var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
var LocalStorage=require("node-localstorage").LocalStorage
localStorage=new LocalStorage('./scratch')


/* GET home page. */
router.get("/productview", function (req, res, next) {
  if(localStorage.getItem("ADMIN"))
   res.render("product", { msg: "" });
  else
  res.render("adminlogin", { msg: "" });

  
});

router.post("/submitrecord", upload.single("picture"), function (req, res) {
  //console.log(req.body)
  //console.log(req.file)
  pool.query(
    "insert into products( productname,productrate,productstock,offerprice,offertype,description,status,picture)values(?,?,?,?,?,?,?,?)",
    [
      req.body.productname,
      req.body.productrate,
      req.body.productstock,
      req.body.offerprice,
      req.body.offertype,
      req.body.description,
      req.body.status,
      req.file.filename,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.render("product", { msg: "Fail to Submit Record" });
      } else {
        res.render("product", { msg: "Record Submitted..." });
      }
    }
  );
});

router.get("/displayall", function (req, res, next) {
  if(!localStorage.getItem("ADMIN"))
   res.render("adminlogin", { msg: "" });

  pool.query("select * from products", function (error, result) {
    if (error) {
      console.log(error);
      res.render("productdisplayall", { Data: "Server Error" });
    } else {
      console.log(result);
      res.render("productdisplayall", { Data: result });
    }
  });
});

router.get("/displaybyid", function (req, res, next) {
  pool.query(
    "select * from products where productid=?",
    [req.query.pid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.render("productbyid", { Data: "Server Error" });
      } else {
        console.log(result);
        res.render("productbyid", { Data: result[0] });
      }
    }
  );
});

router.get("/editdeleterecord", function (req, res, next) {
  if(!localStorage.getItem("ADMIN"))
   res.render("adminlogin", { msg: "" });
  if (req.query.btn == "Edit") {
    pool.query(
      "update products set productname=?,productrate=?,productstock=?,offerprice=?,offertype=?,description=?,status=? where productid=?",
      [
        req.query.productname,
        req.query.productrate,
        req.query.productstock,
        req.query.offerprice,
        req.query.offertype,
        req.query.description,
        req.query.status,
        req.query.productid,
      ],
      function (error, result) {
        if (error) {
          res.redirect("/product/displayall");
        } else {
          res.redirect("/product/displayall");
        }
      }
    );
  } else if (req.query.btn == "Delete") {
    pool.query(
      "delete from products where productid=?",
      [req.query.productid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.redirect("/product/displayall");
        } else {
          console.log(result);
          res.redirect("/product/displayall");
        }
      }
    );
  }
});

router.post("/editpicture", upload.single("picture"), function (req, res) {
  pool.query(
    "update products set picture=? where productid=?",
    [req.file.originalname, req.body.productid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/product/displayall");
      } else {
        res.redirect("/product/displayall");
      }
    }
  );
});

module.exports = router;
