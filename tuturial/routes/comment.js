let mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'flzx3qc',
  database : 'world'
});
connection.connect();
connection.query('SELECT 1', function(err, result, field){
    if(err){
        throw err;
    }
    console.log(result);
    connection.end(function(err){
        console.log('error in disconnect from mysql...');
    });
});