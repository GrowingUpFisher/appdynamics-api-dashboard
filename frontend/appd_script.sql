CREATE DATABASE app_dynamics_metrics;
USE app_dynamics_metrics;



DROP TABLE IF EXISTS appd_pl8_pl9;
DROP TABLE IF EXISTS appd_pl9;
DROP TABLE IF EXISTS appd_pl7_pl8;
DROP TABLE IF EXISTS appd_pl8;
DROP TABLE IF EXISTS appd_pl6_pl7;
DROP TABLE IF EXISTS appd_pl7;
DROP TABLE IF EXISTS appd_pl5_pl6;
DROP TABLE IF EXISTS appd_pl6;
DROP TABLE IF EXISTS appd_pl4_pl5;
DROP TABLE IF EXISTS appd_pl5;
DROP TABLE IF EXISTS appd_pl3_pl4;
DROP TABLE IF EXISTS appd_pl4;
DROP TABLE IF EXISTS appd_pl2_pl3;
DROP TABLE IF EXISTS appd_pl3;
DROP TABLE IF EXISTS appd_pl1_pl2;
DROP TABLE IF EXISTS appd_pl2;
DROP TABLE IF EXISTS appd_application_pl1;
DROP TABLE IF EXISTS appd_pl1;

DROP TABLE IF EXISTS appd_user_application;
DROP TABLE IF EXISTS appd_applications;
DROP TABLE  appd_users;

CREATE TABLE appd_users (user_id INT NOT NULL AUTO_INCREMENT, username VARCHAR(40) NOT NULL, PRIMARY KEY (user_id));
CREATE TABLE appd_applications ( app_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, pod_name VARCHAR(50) NOT NULL, realm_name VARCHAR(50) NOT NULL, app_name VARCHAR(50) NOT NULL, PRIMARY KEY (app_id));
CREATE TABLE appd_user_application (user_id INT NOT NULL, app_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES appd_users(user_id), FOREIGN KEY (app_id) REFERENCES appd_applications(app_id));


CREATE TABLE appd_pl1 (pl1_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl1_id));
CREATE TABLE appd_application_pl1(app_id INT NOT NULL, pl1_id INT NOT NULL, FOREIGN KEY (app_id) REFERENCES appd_applications(app_id), FOREIGN KEY(pl1_id) REFERENCES appd_pl1(pl1_id));

CREATE TABLE appd_pl2 (pl2_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl2_id));
CREATE TABLE appd_pl1_pl2(pl1_id INT NOT NULL, pl2_id INT NOT NULL, FOREIGN KEY (pl1_id) REFERENCES appd_pl1(pl1_id), FOREIGN KEY(pl2_id) REFERENCES appd_pl2(pl2_id));

CREATE TABLE appd_pl3 (pl3_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl3_id));
CREATE TABLE appd_pl2_pl3(pl2_id INT NOT NULL, pl3_id INT NOT NULL, FOREIGN KEY (pl2_id) REFERENCES appd_pl2(pl2_id), FOREIGN KEY(pl3_id) REFERENCES appd_pl3(pl3_id));

CREATE TABLE appd_pl4 (pl4_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl4_id));
CREATE TABLE appd_pl3_pl4(pl3_id INT NOT NULL, pl4_id INT NOT NULL, FOREIGN KEY (pl3_id) REFERENCES appd_pl3(pl3_id), FOREIGN KEY(pl4_id) REFERENCES appd_pl4(pl4_id));

CREATE TABLE appd_pl5 (pl5_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl5_id));
CREATE TABLE appd_pl4_pl5(pl4_id INT NOT NULL, pl5_id INT NOT NULL, FOREIGN KEY (pl4_id) REFERENCES appd_pl4(pl4_id), FOREIGN KEY(pl5_id) REFERENCES appd_pl5(pl5_id));

CREATE TABLE appd_pl6 (pl6_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl6_id));
CREATE TABLE appd_pl5_pl6(pl5_id INT NOT NULL, pl6_id INT NOT NULL, FOREIGN KEY (pl5_id) REFERENCES appd_pl5(pl5_id), FOREIGN KEY(pl6_id) REFERENCES appd_pl6(pl6_id));

CREATE TABLE appd_pl7 (pl7_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl7_id));
CREATE TABLE appd_pl6_pl7(pl6_id INT NOT NULL, pl7_id INT NOT NULL, FOREIGN KEY (pl6_id) REFERENCES appd_pl6(pl6_id), FOREIGN KEY(pl7_id) REFERENCES appd_pl7(pl7_id));

CREATE TABLE appd_pl8 (pl8_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl8_id));
CREATE TABLE appd_pl7_pl8(pl7_id INT NOT NULL, pl8_id INT NOT NULL, FOREIGN KEY (pl7_id) REFERENCES appd_pl7(pl7_id), FOREIGN KEY(pl8_id) REFERENCES appd_pl8(pl8_id));

CREATE TABLE appd_pl9 (pl9_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (pl9_id));
CREATE TABLE appd_pl8_pl9(pl8_id INT NOT NULL, pl9_id INT NOT NULL, FOREIGN KEY (pl8_id) REFERENCES appd_pl8(pl8_id), FOREIGN KEY(pl9_id) REFERENCES appd_pl9(pl9_id));


DESCRIBE appd_pl8_pl9;

ALTER TABLE appd_applications ADD UNIQUE (name);
ALTER TABLE appd_pl1 ADD UNIQUE (name);
ALTER TABLE appd_pl2 ADD UNIQUE (name);
ALTER TABLE appd_pl3 ADD UNIQUE (name);
ALTER TABLE appd_pl4 ADD UNIQUE (name);
ALTER TABLE appd_pl5 ADD UNIQUE (name);
ALTER TABLE appd_pl6 ADD UNIQUE (name);
ALTER TABLE appd_pl7 ADD UNIQUE (name);
ALTER TABLE appd_pl8 ADD UNIQUE (name);
ALTER TABLE appd_pl9 ADD UNIQUE (name);


ALTER TABLE `appd_application_pl1` ADD UNIQUE `app_pl1_index`(`app_id`, `pl1_id`);
ALTER TABLE `appd_pl1_pl2` ADD UNIQUE `pl1_pl2_index`(`pl1_id`, `pl2_id`);
ALTER TABLE `appd_pl2_pl3` ADD UNIQUE `pl2_pl3_index`(`pl2_id`, `pl3_id`);
ALTER TABLE `appd_pl3_pl4` ADD UNIQUE `pl3_pl4_index`(`pl3_id`, `pl4_id`);
ALTER TABLE `appd_pl4_pl5` ADD UNIQUE `pl4_pl5_index`(`pl4_id`, `pl5_id`);
ALTER TABLE `appd_pl5_pl6` ADD UNIQUE `pl5_pl6_index`(`pl5_id`, `pl6_id`);
ALTER TABLE `appd_pl6_pl7` ADD UNIQUE `pl6_pl7_index`(`pl6_id`, `pl7_id`);
ALTER TABLE `appd_pl7_pl8` ADD UNIQUE `pl7_pl8_index`(`pl7_id`, `pl8_id`);
ALTER TABLE `appd_pl8_pl9` ADD UNIQUE `pl8_pl9_index`(`pl8_id`, `pl9_id`);


select * from appd_applications;

INSERT INTO `app_dynamics_metrics`.`appd_users`
(
`username`)
VALUES
(
'devesh kandpal');




INSERT INTO `app_dynamics_metrics`.`appd_applications`
(`name`,
`pod_name`,
`realm_name`,
`app_name`)
VALUES
(
'aagl_prd_POD24',
'POD24',
'prd',
'aagl');

INSERT INTO `app_dynamics_metrics`.`appd_user_application`
(`user_id`,
`app_id`)
VALUES
(1,
1);


commit;






