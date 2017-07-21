Instructions:

- Change AppDynamics username/password string in com.redis.secret.userCredentials.java
- All libraries included in /lib
- compile and build jar (Main class: com.redis.updater.Executor)
- execute using:
  $> java -jar <path to jar>/redisUpdateHandler.jar <IP of Redis Host>  

crontab configuration:

- crontab -e
- contents:
  * * * * * java -jar <path to jar>/redisUpdateHandler.jar <IP of Redis Host>
