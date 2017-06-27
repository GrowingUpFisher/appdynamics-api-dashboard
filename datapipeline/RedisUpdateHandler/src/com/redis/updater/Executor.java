package com.redis.updater;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;
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
	
	public static void main(String[] args) {
		try {
			String key = "update-handler-list";
			String[] redisKey;
	        String applicationName;
	        String metricPath;
	        String uri;
	        String timeRangeType;
	        String durationInMins;
	        String rollup;
	        String output;
	        String startTime;
	        String url;
	        String timestamp;
	        String json = "";
	        metricData dataItem;
	        String xformData;
	        ObjectMapper mapper = new ObjectMapper();
	        FileLock lock = null;
	        String redis_host = "localhost";
	        String update_flag = "x";
	        
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
	        
	        File file = new File("access.lck");
	        RandomAccessFile raf = new RandomAccessFile(file, "rw");
	        FileChannel channel = raf.getChannel();
			
	        try {
	        	lock = channel.tryLock();
	        
				JobFunctions job = new JobFunctions();
				job.createJedisConn(redis_host);
				
				Map<String, String> uhl_map;
				
				uhl_map = job.getMetricURIList(key, update_flag);
				
				//authentication header for      Preemptive Basic HTTPS Authentication
				String auth = userCredentials.user + ":" + userCredentials.pass;
		        byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("ISO-8859-1")));
		        String authHeader = "Basic " + new String(encodedAuth);
		        HttpClient client = HttpClientBuilder.create().build();
		        HttpResponse response = null;
				
				for(String path : uhl_map.keySet()) {
					timestamp = uhl_map.get(path);
					redisKey = path.split("[$]");
					applicationName = redisKey[0];
			        metricPath = redisKey[1];
			        uri = "https://hermes.saas.appdynamics.com/controller/rest/applications/" + applicationName + "/metric-data?";
			        timeRangeType = timestamp.compareTo("0")==0?"BEFORE_NOW":"AFTER_TIME";
			        durationInMins = "2880"; //past 2 days
			        rollup = "false";
			        output = "JSON";
			        startTime = timestamp.compareTo("0")==0?"":"&start-time="+timestamp;
			        dataItem = null;
			        
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
			        
			        json = json.substring(1, json.length()-1);
			        
			        if(json.length() > 0) {
			        	dataItem = mapper.readValue(json, metricData.class);
			        
				        for(int i = 1; i < dataItem.getMetricValues().size(); i++) {
				        	dataItem.getMetricValues().get(i).setXform(metricPath, applicationName);
				        	xformData = dataItem.getMetricValues().get(i).getXform().toString();
				        	timestamp = dataItem.getMetricValues().get(i).getStartTimeInMillis();
				        	
				        	job.pushMetricVal("apm-original", xformData);
				        }
				        job.updateMetricURIList(key, path, timestamp);
			        }
				}
			} catch (OverlappingFileLockException e) {
				e.printStackTrace();
		    }
	        
	        if( lock != null ) {
	            lock.release();
	        }
	        
	        raf.close();
	        channel.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

}
