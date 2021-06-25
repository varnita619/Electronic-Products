var mysql=require("mysql");
var pool=mysql.createPool(
    { host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:'electronicsproduct',
    connectionLimit:100,
    multipleStatements:true})
    
    module.exports=pool