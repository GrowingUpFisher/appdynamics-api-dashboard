package book;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import redis.clients.jedis.Jedis;
import Server.RedisManager;
import com.dw.*; //Outlier Detection Service

@Path("/book")
public class Book {
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	
	@Path("{gname}")
	public String serve_HTML(@PathParam("gname") String gname) {
		Jedis jedis = RedisManager.getInstance().getJedis();
		//String metric = jedis.get("ngroup");
		RedisManager.getInstance().returnJedis(jedis);
		
		App entry = new App();
		String[] args = null;
		args = new String[1];
		args[0] = gname;
		String ret = "";
		
		try {
			ret = entry.main(args);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}
}
