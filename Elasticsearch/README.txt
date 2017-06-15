Instructions:

- Default installation of elasticsearch
- Default configuration files
- Kibana listens on port 9200
- check conf using $> curl -XGET localhost:9200
- _cat commands:
  
  to show index details and memory usage,
  $> curl -XGET 'localhost:9200/_cat/indices?v&pretty'
  
  to delete a specific index (eg: aagl-prd-pod44-oap-epm),
  $> curl -XDELETE 'localhost:9200/aagl-prd-pod44-oap-epm?pretty&pretty'

