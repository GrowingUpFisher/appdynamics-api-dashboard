package com.redis.updater;

import java.io.IOException;
import java.nio.channels.OverlappingFileLockException;
import java.nio.charset.Charset;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.http.HttpHeaders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redis.data.*;
import com.redis.secret.userCredentials;

public class Executor {
	
	public static void main(int n, String[] args) {
		try {
			
			//============ CONFIGURABLE ==============
			String key = "update-handler-list-" + n;
			String redisListKey = "apm-forecast";
	        String durationInMins = "300";
	        String rollup = "false";
	        String output = "JSON";
	        //============ CONFIGURABLE ==============
	        
			String[] redisKey;
	        String applicationName;
	        String metricPath;
	        String uri;
	        String timeRangeType;
	        String startTime;
	        String url;
	        Long timestamp;
	        String json = "";
	        String xformData;
	        ObjectMapper mapper = new ObjectMapper();
	        
	        //============ DEFAULTS ==============
	        String redis_host = "localhost";
	        String update_flag = "x";
	        //============ DEFAULTS ==============
	        
	        metricContainer container;
	        Long adjustedMaxUnixTimeStamp;
	        
	        //handle input arguments
	        for(int i=0; i<args.length ; i++) {
	        	switch(i) {
	        	case 0: redis_host = args[0].charAt(0)=='-'?args[0].substring(1):redis_host;
	        			break;
	        	case 1: update_flag = args[1].charAt(0)=='-'?args[1].substring(1):update_flag;
	        			break;
	        	default: break;
	        	}
	        }
	        
	        try {
	        	
				JobFunctions job = new JobFunctions();
				job.createJedisConn(redis_host);
				
				Map<String, String> uhl_map;
				
				uhl_map = job.getMetricURIList(key, update_flag);
				
				//authentication header for Preemptive Basic HTTPS Authentication
				String auth = userCredentials.user + ":" + userCredentials.pass;
		        byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("ISO-8859-1")));
		        String authHeader = "Basic " + new String(encodedAuth);
		        HttpClient client = HttpClientBuilder.create().build();
		        HttpResponse response = null;
				
		        for(String path : uhl_map.keySet()) {
					
					timestamp = Long.parseLong(uhl_map.get(path));
					redisKey = path.split("[$]");
					applicationName = redisKey[0];
			        metricPath = redisKey[1];
			        uri = "https://hermes.saas.appdynamics.com/controller/rest/applications/" + applicationName + "/metric-data?";
			        timeRangeType = timestamp==0?"BEFORE_NOW":"AFTER_TIME";
			        startTime = timestamp==0?"":"&start-time="+timestamp;
			        container = null;
			        adjustedMaxUnixTimeStamp = Long.MAX_VALUE;
			        
			        url = uri + 
			  			  "metric-path=" + metricPath.replace("%", "%25").replace("\"", "%22").replace(" ", "%20").replace("|", "%7C").replace("(", "%28").replace(")", "%29") +
						  "&time-range-type=" + timeRangeType +
						  "&duration-in-mins=" + durationInMins +
						  "&rollup=" + rollup +
					      "&output=" + output +
					      startTime;
			        
			        HttpGet request = new HttpGet(url);
			        request.setHeader(HttpHeaders.AUTHORIZATION, authHeader);
			        
			        response = client.execute(request);
			        
			        json = EntityUtils.toString(response.getEntity());
			        
			        
			        //reset time-stamp for current metricContainer object
			        timestamp = Long.MAX_VALUE;			        
			        
			        if(json.length() > 0) {
				        
			        	json = "{ \"container\" : " + json + " }";
				        
				        container = mapper.readValue(json, metricContainer.class);
				        
				        for(int j=0; j<container.getContainer().size(); j++) {
				        	metricPath = container.getContainer().get(j).getMetricPath();
				        	
				        	for(int i = 1; i < container.getContainer().get(j).getMetricValues().size(); i++) {
				        		container.getContainer().get(j).getMetricValues().get(i).setXform(metricPath, applicationName);
					        	xformData = container.getContainer().get(j).getMetricValues().get(i).getXform().toString();
					        	timestamp = container.getContainer().get(j).getMetricValues().get(i).getStartTimeInMillis();
					        	
					        	job.pushMetricVal(redisListKey, xformData);
					        }
				        	
				        	if(timestamp < adjustedMaxUnixTimeStamp) {
				        		adjustedMaxUnixTimeStamp = timestamp;
				        	}
				        }
				        
				        if(adjustedMaxUnixTimeStamp < Long.MAX_VALUE) {
				        	job.updateMetricURIList(key, path, adjustedMaxUnixTimeStamp.toString());
				        }
			        }
				}
			} catch (OverlappingFileLockException e) {
				e.printStackTrace();
		    }	        
	        
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

}
