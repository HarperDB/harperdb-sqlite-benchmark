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

#### Benchmarked Databases

- [HarperDB](https://harperdb.io)
- [SQLLite](https://www.sqlite.org)

##

#### Getting Started

- [Install and start harperdb on port 9925](https://harperdbhelp.zendesk.com/hc/en-us/articles/115010251927-HarperDB-Getting-Started-Example-Hello-World-)
- `cd path/to/this/repo`
- `npm i -s`
- `npm start harperdb`
- `npm start sqllite`


