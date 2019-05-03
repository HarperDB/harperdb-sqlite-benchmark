const http = require("http"),
  uuidv4 = require('uuid/v4');

let records = [];
const record_count = 5000;


create_schema(function(){
  create_table(function(){
    console.time("harperdb");
    insert_records(function(){

      query_records(function(){
        console.timeEnd("harperdb");
        drop_schema(function(){

        });

      });
    });

  });
});


function insert_records(callback){
  for(i = 1; i <= record_count; i++) {
    let record = {};
    record.id = uuidv4();
    record.name ="harper";
    record.age = i;
    record.breed = "mutt";
    records.push(record);

  }

  var post_options = {
    host: 'localhost',
    port: '9925',
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Basic SERCX0FETUlOOnBhc3N3b3Jk'
    }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      callback();
    });
  });

  let insertObj = {
    "operation":"insert",
    "schema":"dev",
    "table":"dog",
    "records": records

  }

  // post the data


  post_req.write(JSON.stringify(insertObj));
  post_req.end();


}


function create_schema(callback){


  var create_schema_options = {
    "method": "POST",
    "host": "localhost",
    "port": "9925",
    "path": "/",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Basic SERCX0FETUlOOnBhc3N3b3Jk"
    }
  };

  var req = http.request(create_schema_options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      callback();
    });
  });




  req.write(JSON.stringify({ operation: 'create_schema', schema: 'dev' }));
  req.end();

}


function query_records(callback){
  var create_table_options = {
    "method": "POST",
    "host": "localhost",
    "port": "9925",
    "path": "/",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Basic SERCX0FETUlOOnBhc3N3b3Jk"
    }
  };

  var req = http.request(create_table_options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      callback();
    });
  });

  req.write(JSON.stringify(
    {
      operation: 'sql',
      sql: 'select count(id) from dev.dog'
    }
  ));
  req.end();

}

function create_table(callback){
  var create_table_options = {
    "method": "POST",
    "host": "localhost",
    "port": "9925",
    "path": "/",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Basic SERCX0FETUlOOnBhc3N3b3Jk"
    }
  };

  var req = http.request(create_table_options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      callback();
    });
  });

  req.write(JSON.stringify({ operation: 'create_table',
    schema: 'dev',
    table: 'dog',
    hash_attribute: 'id' }));
  req.end();

}

function drop_schema(callback){
  var http = require("http");

  var drop_table_options = {
    "method": "POST",
    "host": "localhost",
    "port": "9925",
    "path": "/",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Basic SERCX0FETUlOOnBhc3N3b3Jk"
    }
  };

  var req = http.request(drop_table_options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      callback();
    });
  });

  req.write(JSON.stringify({ operation: 'drop_schema', schema: 'dev' }));
  req.end();
}

