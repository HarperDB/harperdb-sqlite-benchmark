const neo4j = require('neo4j-driver').v1;
const uuidv4 = require('uuid/v4');
const record_count = 5000;
const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'password'), { maxConnectionPoolSize: 5000 });

const runTest = async () => {
  console.time('neo4j');
  await clearDogs();
  await addDogs();
  await getDogs();
  console.timeEnd('neo4j');
  process.exit();
};

const clearDogs = async () => {
  const session = driver.session();
  await session
  .run('MATCH (n:Dog) DELETE n')
  .then(() => session.close())
  .catch(e => console.log('error', e));
};

const addDogs = async () => {
  for(let i = 1; i <= record_count; i++) {
    const id = uuidv4();
    await addDog({
      id,
      name: `harper${id}`,
      age: i,
      breed: 'mutt'
    });
  }
};

const addDog = async (object) => {
  const session = driver.session();
  await session
    .run('CREATE (:Dog {id: $id, name: $name, age: $age, breed: $breed})', object)
    .then(() => session.close())
    .catch(e => console.log('error', e));
};

const getDogs = async () => {
  const session = driver.session();
    await session
    .run('MATCH (n:Dog) RETURN count(n) as count')
    .then((result) => {
      console.log(`neo4j record count ${result.records[0]._fields[0].low}`);
      session.close();
    })
    .catch(e => console.log('error', e));
};

runTest();



