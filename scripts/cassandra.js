const cassandra = require('cassandra-driver');
const uuidv4 = require('uuid/v4');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'harperdb' });
const record_count = 5000;

const runTest = async () => {
  console.time('cassandra time');
  client.execute('TRUNCATE dogs');
  await addDogs();
  await getDogs();
  console.timeEnd('cassandra time');
  process.exit();
};

const addDogs = async () => {
  for(let i = 1; i <= record_count; i++) {
    const id = uuidv4();
    await addDog(id, `harper${id}`, i, 'mutt');
  }
};

const addDog = async (id, name, age, breed) => {
  await client.execute('INSERT INTO dogs (id, name, age, breed) VALUES (?, ?, ?, ?)', [id, name, age, breed], { prepare: true })
};

const getDogs = async () => {
  await client.execute('SELECT count(*) as count FROM dogs').then(result => {
    console.log(`cassandra records: ${result.rows[0].count.low}`);
  });
};

runTest();
