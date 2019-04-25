const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/mydb.db');
const uuidv4 = require('uuid/v4');
const record_count = 5000;

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS dog');
  db.run('CREATE TABLE IF NOT EXISTS dog (id data_type PRIMARY KEY, name data_type, breed data_type, age data_type DEFAULT 0, table_constraint);');

  console.time('sqlite');

  var stmt = db.prepare('INSERT INTO dog(id, name, breed, age) VALUES (?, ?, ?, ?)');
  for(let i = 1; i <= record_count; i++){
      stmt.run(uuidv4(), 'name_harperdb', 'Mutt', i);
  }

  stmt.finalize();

  db.each('SELECT count(id) as c  FROM dog', (err, row) => {
     console.log('sqlite record count ' + row.c );
     console.timeEnd('sqlite');
  });
});

db.close(function() {});
