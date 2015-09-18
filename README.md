# crawler
this project is created by [youths](http://youths.cc).

##Installation
You need nodejs,mongodb installed.

```sh
$ git clone https://github.com/TNT-Likely/crawler.git
$ cd crawler
$ npm install
```

##Structure
- index.js      get zhihu question user topic
- update.js     update user
- queue.js      async queue
- deal.js       deal htmldom
- db.js         database operation

##How to use

###Get Data
```sh
$ node index.js
```

if you want to add data to __mongodb__,run below code
```sh
$ node index.js db
```

if you want to add data to remote __mongodb__,run below code
```sh
$ node index.js db remote
```

##Issues

###How to change fields type from string to integer

####code

```sh
var convert = function(document){
var intValue = parseInt(document.field);
  db.collection.update(
    {_id:document._id}, 
    {$set: {field: intValue}}
  );
}

db.collection.find({field: {$type:2}},{field:1}).forEach(convert)
```
####example

````sh
var convert = function(document){
var intValue = parseInt(document.agree);
  db.zhihuuser.update(
    {_id:document._id}, 
    {$set: {agree: intValue}}
  );
}

db.zhihuuser.find({agree: {$type:2}},{agree:1}).forEach(convert)
```

## Todos

- Write Tests
- Add config file

License
----

MIT
