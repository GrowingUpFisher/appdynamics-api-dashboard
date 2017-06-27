![New Web Stack - AppD Project.jpg](https://bitbucket.org/repo/BgkGBAX/images/2034796307-New%20Web%20Stack%20-%20AppD%20Project.jpg)

# README (v 1.0) #

This README documents the POC architecture and whatever steps are necessary to get the initial visualization pipeline up and running.

### Quick summary ###

* The AppDynamics API Dashboard application architecture is handscribed in the figure attached above. The pipeline sits on top of AppD Controller REST API Services, and aims to complement the RTM and Alert capabilities provided by the SaaS Controller UI.
  
  + v 1.0 is the latest spec in terms of getting the end-to-end data visualization stack running.
  + v 1.x will specifically focus on the following:
  + Strengthening the POC (deployment/configuration/packaging) to production level quality.
  + Developing use-case driven functionalities and visualizations on top of streaming metric pipeline.
  + Developing Learning algorithms to model and predict anomalous trends in metric pipeline.
  + Setting up NGINX for loadbalancing, and clustering of ELK data/visualization servers. 
  + Developing in-house visualization Front End with custom log-in and management consoles (in progress).
  + Leveraging Salesforce Account Manager for user authentication rather than hitting AppD APIs.
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Tools to be installed: cron, java8-jdk, elasticsearch, logstash, kibana, redis
* Configuration: The configuration details are provided in the individual README files
* Dependencies: most of the stack is java based for the datapipeline + some external JAR dependencies on Jackson, Spring, Httpcomponents, Jedis, Apache commons-pool2 and Jersey. These are included in RedisUpdateHandler/lib.
* Database configuration: Default Elasticsearch and Redis buffer configuration.
* Tests: Kibana should reflect the JSON documents that are being indexed by Elastic. Set auto-refresh for graphs to 1 minute and check if the data flows continuously. Alternatively, plug stdout in logstash output def and check if the jsonlets (curated and marshaled metric data-point objects that are being pushed into redis from redisUpdateHandler) are being printed periodically in logstash server console.
* Deployment instructions are detailed in individual READMEs for each component.

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Debaditya Basak (for the metric data-pipeline architecture and design)
* Devesh Kandpal (for the in-house Angular.js based Front End design)
* Jim Krueger (for in-depth SCC Performance Engineering expertise and knowhow)