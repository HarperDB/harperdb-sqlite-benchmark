const sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('mydb.db'),
	express = require('express'),
	uuidv4 = require('uuid/v4');

const record_count = 5000;
db.serialize(function() {

     	
	
    db.run("DROP TABLE IF EXISTS dog");
    db.run("CREATE TABLE IF NOT EXISTS dog (\n" +
        " id data_type PRIMARY KEY,\n" +
        "   name data_type,\n" +
        "   breed data_type,\n" +
        " age data_type DEFAULT 0,\n" +
        " table_constraint\n" +
        ");");
	console.time("sqlite");
    var stmt = db.prepare("INSERT INTO dog(id,name, breed, age) VALUES (?, ?,?,?)");
    for(let i = 1; i <= record_count; i++){
        stmt.run(uuidv4(), "name_harperdb", "Mutt", i);


    }

	stmt.finalize();

    db.each("SELECT count(id) as c  FROM dog", function(err, row) {

       console.log("sqlite record count " + row.c );
	  
       console.timeEnd("sqlite");	
	
    });
	
   

});


db.close(function() {


});
