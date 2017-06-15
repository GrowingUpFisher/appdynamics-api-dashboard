Instructions:

- Default Logstash installation
- start using   $> ./bin/logstash
- to stop       send SIGINT to server process
- edit ./config/logstash.yml settings file
- define processing and filtering pipeline in ./config/stashbox.conf
- point output to elasticsearch (localhost:9200)
- point input to redis (localhost:6379)
- decode @timestamp field as UNIX_MS
