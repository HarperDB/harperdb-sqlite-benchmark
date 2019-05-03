const neo4j = require('neo4j-driver').v1;
const uuidv4 = require('uuid/v4');
const record_count = process.argv[2];
const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password'), { maxConnectionPoolSize: 5000 });
const session = driver.session();

console.log('running neo4j: ', record_count, ' records');

const runTest = async () => {

  await clearDogs();
  console.time('neo4j time');
  await addDogs();
  await getDogs();
  console.timeEnd('neo4j time');
  process.exit();
};

const clearDogs = async () => await session
  .run('MATCH (n:Dog) DELETE n')
  .then(() => session.close())
  .catch(e => console.log('error', e));

const addDogs = async () => {
  const tx = session.beginTransaction();
  for(let i = 1; i <= record_count; i++) {
    const id = uuidv4();
    await tx.run('CREATE (:Dog {id: $id, name: $name, age: $age, breed: $breed})', { id, name: `harper${id}`, age: i, breed: 'mutt' })
  }
  return tx.commit()
};

const getDogs = async () => await session
  .run('MATCH (n:Dog) RETURN count(n) as count')
  .then((result) => {
    console.log(`neo4j records: ${result.records[0]._fields[0].low}`);
    session.close();
  })
  .catch(e => console.log('error', e));

runTest();



