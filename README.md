![New Web Stack - AppD Project.jpg](https://bitbucket.org/repo/BgkGBAX/images/1282097282-New%20Web%20Stack%20-%20AppD%20Project.jpg)

# README #

This README documents the POC architecture and whatever steps are necessary to get the initial visualization pipeline up and running.

### What is this repository for? ###

* Quick summary
  The AppDynamics API Dashboard application architecture is handscribed in the figure attached above. The pipeline sits on top of AppD Controller REST API Services, and aims to complement the RTM and Alert capabilities provided by the SaaS Controller UI.
  v 1.0 is the latest spec in terms of getting the end-to-end data visualization stack running.
  v 1.x will specifically focus on the following:
  + Strengthening the POC (deployment/configuration/packaging) to production level quality.
  + Developing use-case driven functionalities and visualizations on top of streaming metric pipeline.
  + Developing Learning algorithms to model and predict anomalous trends in metric pipeline.
  + Setting up NGINX for loadbalancing, and clustering of ELK data/visualization servers. 
  + Developing in-house visualization Front End with custom log-in and management consoles (in progress).
  + Leveraging Salesforce Account Manager for user authentication rather than hitting AppD APIs.
* Version 1.0
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact