const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/mydb.db');
const uuidv4 = require('uuid/v4');
const record_count = process.argv[2];

console.log('running sqlite: ', record_count, ' records');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS dog (id data_type PRIMARY KEY, name data_type, breed data_type, age data_type DEFAULT 0, table_constraint);');
  db.run('DELETE FROM dog');

  console.time('sqlite time');

  const dogs = [];

  for(let i = 1; i <= record_count; i++){
      dogs.push(`('${uuidv4()}', 'name_harperdb', 'Mutt', ${i})`);
  }

  dogs.join(',');
  const sql = `INSERT INTO dog(id, name, breed, age) VALUES ${dogs}`;

  db.run(sql);

  db.all('SELECT count(*) FROM dog', [], (err, rows) => {
    console.log('sqlite records: ' + rows[0]['count(*)'] );
    console.timeEnd('sqlite time');
  });
});

db.close();
