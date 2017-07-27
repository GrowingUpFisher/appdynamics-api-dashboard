package book;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class myAppServletContextListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		System.out.println("ServletContextListener destroyed");
		//RedisManager.release();
	}

    //Run this before web application is started
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("ServletContextListener started");
		//RedisManager.getInstance().connect();
	}
}