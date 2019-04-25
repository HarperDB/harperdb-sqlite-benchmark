# HarperDB Benchmarks

This project is designed to give you a sense of how [HarperDB](https://harperdb.io) compares to a variety of other DB technologies.

The test is pretty simple:

- create a table called dog
- start a timer
- write 5000 records to the table
- query the count of records in the table
- stop the time and display the time it took

You'll see that on constrained devices, other DB technologies have exponential increases in the time required to perform this task, where HarperDB's performance remains linear.

As your data scales, performance doesn't need to suffer- HarperDB makes that possible.

##

#### Getting Started

Install dependencies

- `git clone https://github.com/HarperDB/harperdb-sqlite-benchmark.git`
- `cd harperdb-sqlite-benchmark`
- `npm i -s`

Install harperdb and other dbs to benchmark

- [Install and Start HarperDB](https://harperdbhelp.zendesk.com/hc/en-us/articles/115010251927-HarperDB-Getting-Started-Example-Hello-World-)
- sqllite is a static binary (so doesn't need to be started), and is installed as a dependency of this repo
- [Install and Start neo4j](https://neo4j.com/download/)

Run individual tests

- `npm start harperdb`
- `npm start sqllite`
- `npm start neo4j`

##

#### Benchmarked Databases

- [HarperDB](https://harperdb.io)
- [SQLLite](https://www.sqlite.org)
- [neo4j](https://neo4j.com)

