var express = require("express");
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */

router.get("/supplierview", function (req, res, next) {
  res.render("supplier",{msg:''});
});

router.post("/addrecord",upload.any(),function(req,res){
//console.log(req.body)
//console.log(req.file)
pool.query("insert into suppliers(suppliername,suppliergender,supplieraddress,state,city,mobileno,firmname,firmlogo,picture)values(?,?,?,?,?,?,?,?,?)",[req.body.suppliername,req.body.suppliergender,req.body.supplieraddress,req.body.state,req.body.city,req.body.mobileno,req.body.firmname,req.files[0].originalname,req.files[1].originalname],function(error,result)

{
  if(error)
  { console.log(error)
    res.render("supplier",{msg:"Fail to Submit Record"});

  }
  else
  {
    res.render("supplier",{msg:"Record Submitted..."});

  }


})


});

router.get("/displaysupplier", function (req, res, next) {

  pool.query("select S.*,(Select ST.statename from states ST where ST.stateid=S.state)as statename,(Select CT.cityname from cities CT where CT.cityid=S.city)as cityname from suppliers S", function (error, result) {
    if (error) {
      console.log(error)
      res.render("supplierdisplayall", { Data: "Server Error" });
    }
    else {
      console.log(result)
      res.render("supplierdisplayall", { Data: result })
    }
  });

});

router.get("/displaybyid", function (req, res, next) {

  pool.query("select S.*,(Select ST.statename from states ST where ST.stateid=S.state)as statename,(Select CT.cityname from cities CT where CT.cityid=S.city)as cityname from suppliers S where supplierid=?",[req.query.sid], function (error, result) {
    if (error) {
      console.log(error)
      res.render("supplierbyid", { Data: "Server Error" });
    }
    else {
      console.log(result)
      res.render("supplierbyid", { Data: result[0] })
    }
  });

});

router.get("/editdeleterecord", function (req, res, next) {
  if(req.query.btn=="Edit")
  {
    pool.query("update suppliers set suppliername=?,suppliergender=?,supplieraddress=?,state=?,city=?,mobileno=?,firmname=? where supplierid=?",
    [
      req.query.suppliername,
      req.query.suppliergender,
      req.query.supplieraddress,
      req.query.state,
      req.query.city,
      req.query.mobileno,
      req.query.firmname,
      req.query.supplierid,
    ],function(error,result)

{
  if(error)
  { res.redirect("/supplier/displaysupplier")

  }
  else
  {
    res.redirect("/supplier/displaysupplier")

  }


})

 
  }
  else if(req.query.btn=="Delete")
  {

  pool.query("delete from suppliers where supplierid=?",[req.query.supplierid], function (error, result) {
    if (error) {
      console.log(error)
      res.redirect("/supplier/displaysupplier")
    }
    else {
      console.log(result)
      res.redirect("/supplier/displaysupplier")
    }
  });
  }
});

router.post("/editpicture",upload.any(),function(req,res){
  pool.query("update suppliers set firmlogo=?,picture=? where supplierid=?",[req.files[0].originalname,req.files[1].originalname,req.body.supplierid],function(error,result){
    if(error)
    {
      console.log(error)
      res.redirect("/supplier/displaysupplier")

    }
    else
    {
      res.redirect("/supplier/displaysupplier")

    }

  })

});


module.exports = router;
