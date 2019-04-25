const http = require('http');
const uuidv4 = require('uuid/v4');
const record_count = 5000;

const options = {
  method: 'POST',
  host: 'localhost',
  port: '9925',
  path: '/',
  headers: {
    "Content-Type": 'application/json',
    Authorization: 'Basic SERCX0FETUlOOnBhc3N3b3Jk'
  }
};

const insert_records = (callback) => {
  const records = [];
	for(i = 1; i <= record_count; i++) {
		records.push({ id: uuidv4(), name: 'harper', age: i, breed: 'mutt' });
	}

	let callbackTimeout = false;
	// Set up the request
	var req = http.request(options, (res) => {
		res.on('data', () => {
			if(callbackTimeout) clearTimeout(callbackTimeout);
      callbackTimeout = setTimeout(() => {
        console.log('insert records end');
        callback();
			}, 0);
		});
	});

	// post the data
	req.write(JSON.stringify({ operation:'insert', schema:'dev', table:'dog', records: records }));
	req.end();
};


const create_schema = (callback) => {
  const req = create_request('create schema end', callback);
	req.write(JSON.stringify({ operation: 'create_schema', schema: 'dev' }));
	req.end();
};


const query_records = (callback) => {
  const req = create_request('query records end', callback);
	req.write(JSON.stringify({ operation: 'sql', sql: 'select count(id) from dev.dog' }));
	req.end();
};

const create_table = (callback) => {
  const req = create_request('create table end', callback);
	req.write(JSON.stringify({ operation: 'create_table', schema: 'dev', table: 'dog', hash_attribute: 'id' }));
	req.end();
};

const drop_schema = (callback) => {
	const req = create_request('end drop schema', callback);
	req.write(JSON.stringify({ operation: 'drop_schema', schema: 'dev' }));
	req.end();
};

const create_request = (process, callback) => http.request(options, (res) => {
	var chunks = [];
	res.on('data', (chunk) => { chunks.push(chunk); });

	res.on('end', () => {
		var body = Buffer.concat(chunks);
		console.log(process, body.toString());
		if (callback) callback();
	});
});

create_schema(() => {
  create_table(() => {
    console.time('harperdb');
    insert_records(() => {
      query_records(() => {
        console.timeEnd('harperdb');
        drop_schema();
      });
    });
  });
});

