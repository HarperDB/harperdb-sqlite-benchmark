const axios = require('axios');
const record_count = process.argv[2];

console.log('running harperdb: ', record_count, ' records');

const client1 = axios.create({
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic SERCX0FETUlOOnBhc3N3b3Jk'
  }
});

const client2 = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic SERCX0FETUlOOnBhc3N3b3Jk'
  }
});

const runTest = async () => {
  try {
    await client1.post('http://127.0.0.1:9925', { operation: 'sql', sql: 'delete from dev.dog' }).catch(e => console.log('could not delete all records'));
  } catch (e) {
    await client1.post('http://127.0.0.1:9925', { operation: 'create_schema', schema: 'dev' }).catch(e => console.log('could not create schema'));
    await client1.post('http://127.0.0.1:9925', { operation: 'create_table', schema: 'dev', table: 'dog', hash_attribute: 'id' }).catch(e => console.log('could not create table'));
  }

  const records = [];
  for(let i = 1; i <= record_count; i++) {
    records.push({ id: i, name: 'harper', age: i, breed: 'mutt' });
  }

  console.time('harperdb time');
  console.log(`inserting ${records.length} records`);
  client2
    .post('http://127.0.0.1:9925', { operation:'insert', schema:'dev', table:'dog', records: records })
    .then(() => {
      client1.post('http://127.0.0.1:9925', { operation: 'sql', sql: 'select count(*) from dev.dog' })
        .then(results => {
          console.log(`harperdb records: ${results.data[0]['COUNT(*)']}`);
          console.timeEnd('harperdb time');
        })
      .catch(e => console.log('error on request'))
    })
    .catch(e => console.log('error on insert'));
};

runTest();


