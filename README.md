[client] http requests -> [saver] saves to disk .csv and places job on redis through bull

[consumer] worker listens to queue and saves .csv to mongodb

[logger] logs to file (wip)

---
mongodb

`docker run -p 27017:27017 --name some-mongo -d mongo:latest`

___

redis

```
host: "localhost",
port: 6379
```