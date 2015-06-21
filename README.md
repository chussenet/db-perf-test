# Introduction
Opened Framework allowing comparing response time accross different databases.
Current database supported :
- RethinkDB 
- MongoDB

To add a new database ,please check the db/stub package for the methods to implement.
Then,pass the name of the newly package created as an option to the following command.

## Usage
node insert.js [options]

### Options supported
    --dbpackage :name of the package specific to a database targetted.
    #### Example
    --dbpackage mongodb
    --dbpackage rethinkdb            
    --dbpackage stub  [default stub]
    
    --documentpackage :name of the package definting the document factory 
	### Example
    --documentpackage document [default value]

    --stringfield :number of string fields to create for the json document 
	### Example
    --stringfield 5 [default 1]

    --integerfield :number of integer fields to create for the json document 
	### Example
    --integerfield 5 [default 1]

    --istsfield :flag to add a timestamp field in the json document
	### Example
    --istsfield false [default true]

    --nb :number of document to create per thread
	### Example
    --nb 10000 [default 1000]

    --threads :number of parallel threads inserting documents
	### Example
    --threads 5 [default 1]

    --batchinsert :number of documents to insert in batch
	### Example
    --batchinsert 100 [default 200]    

    --db :name of the db
	### Example
    --db myDB [default test]     

    --table :name of the table/collection
	### Example
    --db myTable [default perfTest]  
    
## Examples
### Insert 1M documents in mongodb with 5 threads of execution.
node insert.js --dbpackage mongodb --nb 200000 --threads 5 

### Insert 1M documents in mongodb with 2 threads of execution.Documents inserted are defined with 5 string field,5 integer field and 1 timestamp field
node insert.js --dbpackage mongodb --nb 200000 --threads 2 --integerfield 5 --stringfield 5

### Insert 1M documents in rethinkdb with 5 threads of execution.Documents inserted are defined with 5 string field,5 integer field and 1 timestamp field
node insert.js --dbpackage rethinkdb --nb 200000 --threads 5 --integerfield 5 --stringfield 5


## Results
   Tested on : MacBook Pro (Retina, 15-inch, Late 2013)
               Processor:2.3 GHz Intel Core i7 (1/4 cores)
               Memory:16 GB 1600 MHz DDR
               Disk:SSD
               
###node insert.js --dbpackage mongodb --nb 200000 --threads 5 
Document size:90 bytes.
Mongodb:1000000 inserts in 8366 (ms)
Mongodb:119531 (inserts/s)

###node insert.js --dbpackage rethinkdb --nb 200000 --threads 5 
Document size:90 bytes.
RethinkDB:1000000 inserts in 73766 (ms)
RethinkDB:13556 (inserts/s)

###node insert.js --dbpackage mongodb --nb 200000 --threads 5 --integerfield 5 --stringfield 5
Document size:378 bytes.
Mongodb:1000000 inserts in 16725 (ms)
Mongodb:59791 (inserts/s)

###node insert.js --dbpackage rethinkdb --nb 200000 --threads 5 --integerfield 5 --stringfield 5
Document size:378 bytes.
RethinkDB:1000000 inserts in 153072 (ms)
RethinkDB:6533 (inserts/s)

