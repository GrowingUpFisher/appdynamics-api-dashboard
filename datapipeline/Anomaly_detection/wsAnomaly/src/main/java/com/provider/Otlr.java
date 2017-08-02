package com.provider;

import java.util.HashMap;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import redis.clients.jedis.Jedis;

@Path("/anomaly")
public class Otlr {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String serve_HTML(	@DefaultValue("x") @QueryParam("application") String application,
						        @DefaultValue("x") @QueryParam("pl1") String pl1,
						        @DefaultValue("x") @QueryParam("pl2") String pl2,
						        @DefaultValue("x") @QueryParam("pl3") String pl3,
						        @DefaultValue("x") @QueryParam("pl4") String pl4,
					 	        @DefaultValue("x") @QueryParam("pl5") String pl5,
						        @DefaultValue("x") @QueryParam("pl6") String pl6,
						        @DefaultValue("x") @QueryParam("pl7") String pl7,
						        @DefaultValue("x") @QueryParam("pl8") String pl8,
						        @DefaultValue("x") @QueryParam("value") String value,
						        @DefaultValue("x") @QueryParam("timestamp") String timestamp) {
		
		Helper util = new Helper();
		String key = application + "$" + util.plValidate(pl1, true) 
		                               + util.plValidate(pl2) 
		                               + util.plValidate(pl3) 
		                               + util.plValidate(pl4) 
		                               + util.plValidate(pl5) 
		                               + util.plValidate(pl6) 
		                               + util.plValidate(pl7) 
		                               + util.plValidate(pl8);
		
		Jedis jedis = new Jedis("localhost", 6379);
		
		String forecast = jedis.hget(key+"#forecast", timestamp);
		String observed = value;
		
		HashMap<String, String> temp_thresh = (HashMap<String, String>) jedis.hgetAll(key+"#threshold");
		HashMap<String, Float> threshold = new HashMap<String, Float>();
		
		for(String hkey : temp_thresh.keySet()) {
			threshold.put(hkey, Float.parseFloat(temp_thresh.get(hkey)));
		}
		
		Float maseDenom = Float.parseFloat(jedis.hget(key+"#parameters", "maseDenom"));
		
		jedis.close();
		
		
		if(util.detectAnomaly(Float.parseFloat(forecast), Float.parseFloat(observed), threshold, maseDenom)) {
			return /*anomaly ->*/ "red";
		} else {
			return /*anomaly ->*/ "green";
		}
	}
}
