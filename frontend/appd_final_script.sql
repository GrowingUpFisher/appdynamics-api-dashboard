CREATE DATABASE app_dynamics_metrics;
USE app_dynamics_metrics;

DROP TABLE IF EXISTS appd_metrics;

CREATE TABLE appd_metrics (
app_id INT NOT NULL AUTO_INCREMENT,
 application_name VARCHAR(100) NOT NULL,
 app_name VARCHAR(100),
 pod VARCHAR(100),
 realm VARCHAR(100),
 pl1_id VARCHAR (100),
 pl2_id VARCHAR (100),
 pl3_id VARCHAR (100),
 pl4_id VARCHAR (100),
 pl5_id VARCHAR (100),
 pl6_id VARCHAR (100),
 pl7_id VARCHAR (100),
 pl8_id VARCHAR (100),
 pl9_id VARCHAR (100),
 pl10_id VARCHAR (100),
 pl11_id VARCHAR (100),
 pl12_id VARCHAR (100),
 PRIMARY KEY (app_id)
 );
 
 commit;
 
 
 select * from appd_metrics;
 
 