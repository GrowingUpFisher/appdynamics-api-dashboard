R:
1. Install RStudio in Mac OS X

2. Open RStudio workspace

3. Packages -> Install -> Install from: Package Archive File (.tgz, .tar.gz)

4. Click browse, and select the anomalousACM_0.1.0.tar.gz

5. Hit install

6. There will be other dependencies, if yes install them manually first using -

	install.packages(“ForeCA”, “xyz”, “abc”)

7. Then load anomalous-acm package and run the demo data-set

8. install.packages(“RServe”)

9. library(RServe)

10. RServe(args = ‘--no-save’)

11. This starts the RServe server


WebService(Java):
1. mkdir ~/Documents/RPlotPNG

2. Replace /usr/local/Cellar/tomcat@8.0/8.0.43/libexec/conf/server.xml with OD_CATALINA/server.xml 

   There is a new context element defined that maps physcal directory with webapp directory:

   <Host . . .>
	<Context  docBase="/Users/dbasak/Documents/RPlotPNG" path="/otlr/plots"/>
   </Host>

3. mvn should be installed on your build system.

4. cd wsOutlier

5. mvn clean install

6. rm -rf /usr/local/Cellar/tomcat@8.0/8.0.43/libexec/webapp/wsOutlier-1.0-SNAPSHOT /usr/local/Cellar/tomcat@8.0/8.0.43/libexec/webapp/wsOutlier-1.0-SNAPSHOT.war

7. cp ./target/wsOutlier-1.0-SNAPSHOT.war /usr/local/Cellar/tomcat@8.0/8.0.43/libexec/webapp

8. cd /usr/local/Cellar/tomcat@8.0/8.0.43/libexec/webapp

9. verify if the war is copied properly in webapps folder of catalina server

10. ../bin/startup.sh

11. to stop tomcat server, ../bin/shutdown.sh