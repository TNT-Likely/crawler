# crawler
this project is created by [youths](http://youths.cc).

##Installation
You need nodejs,mongodb installed.

- git clone https://github.com/TNT-Likely/crawler.git
- cd crawler
- npm install

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

## Todos

- Write Tests
- Add config file

License
----

MIT
