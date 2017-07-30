package com.outlier;

import java.net.InetAddress;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

/**
 * Outlier Detection App
 * 
 * @author Debaditya Basak
 */
public class App {
	
	public String main(String[] args) throws Exception {
		
		//============== CONSTANTS ================
		String esClusterName = "es1-cluster";
		String esNode1 = "localhost";
		float voidTolerancePct = 0.2f;
		String method = "hdr";
		String json;
		//============== CONSTANTS ================
		
		
		//prepare a client handle to elastic-search cluster
		Settings settings = Settings.builder()
		        .put("cluster.name", esClusterName).build();
		@SuppressWarnings("resource")
		TransportClient client = new PreBuiltTransportClient(settings)
				.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(esNode1), 9300));
		System.out.println("\nstrt: "+System.currentTimeMillis()+"\n");
		
		
		//define time range
		timeRange trange = new timeRange();
		if(args[0].equalsIgnoreCase("0") || args[1].equalsIgnoreCase("0")) {
			trange.setFrom(System.currentTimeMillis() - (5*60*1000) - (3*60*60*1000));
			trange.setTo(System.currentTimeMillis() - (5*60*1000));
		} else {
			trange.setFrom(Long.parseLong(args[0]));
			trange.setTo(Long.parseLong(args[1]));
		}
				
		//define query parameters
		String gname = args[2];	
		String aggr = args[3];
		int topn = Integer.parseInt(args[4]);
		
		
		//getBatch object
		getBatch gb = new getBatch(trange, gname, client);
		
		//fetch data from ES
		gb.fetch(voidTolerancePct);
		
		//prepBatch object
		prepBatch pb = new prepBatch(gb, aggr);
		System.out.println("");
		
		//validate the raw TS data from ES, and do some cleansing
		pb.fill();
		pb.trim();	
		pb.setMatrix();
		System.out.println("\nends: "+System.currentTimeMillis()+"\n");
		pb.getMatrixMap(true);
		
		//feedBatch object
		feedBatch fb = new feedBatch(pb, topn, method);
		
		//feed to anomaly detector with RServe
		fb.feed();
		
		//get the anomalies
		json = fb.getAnomalies();
		
		//use this to updateDashboard or serveReport (for the specific requesting user)
		
		
		client.close();
		return json;
	}
}
