var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/myapi', function(req, res, next) {
  res.status(200).json({'EmpId':100,'EmpName': 'Peter Kumar','Salary':90000})
});

router.post('/addbonus/:bonus', function(req, res, next) {
  console.log(req.params.bonus)
  var ns=90000+parseInt(req.params.bonus)
  res.status(200).json({'EmpId':100,'EmpName': 'Peter Kumar','Salary':'ns'})
});
module.exports = router;
