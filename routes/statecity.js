var express = require('express')
var router = express.Router();
var pool = require('./pool')

router.get("/fetchstate", function (req, res, next) {
    pool.query("select * from states",function(error,result){
     if(error)
     {
         res.status(500).json([])
     }
     else
     {
        res.status(200).json(result)

     }


    })
  });

  router.get("/fetchcity", function (req, res, next) {
    pool.query("select * from cities where stateid=?",[req.query.stateid],function(error,result){
     if(error)
     {
         res.status(500).json([])
     }
     else
     {
        res.status(200).json(result)

     }


    })
  });


  module.exports = router;