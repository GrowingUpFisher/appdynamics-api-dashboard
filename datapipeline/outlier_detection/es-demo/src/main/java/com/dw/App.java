package com.dw;

import java.net.InetAddress;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

/**
 * Outlier Detection Demo App
 * 
 * @author Debaditya Basak
 */
public class App {
	
	public static void main(String[] args) throws Exception {
		
		//constants
		String esClusterName = "es1-cluster";
		String esNode1 = "localhost";
		float voidTolerancePct = 0.2f;
		String aggr = "1h";
		int topn = 3;
		String method = "hdr";
		
		
		//prepare a client handle to elasticsearch cluster
		Settings settings = Settings.builder()
		        .put("cluster.name", esClusterName).build();
		@SuppressWarnings("resource")
		TransportClient client = new PreBuiltTransportClient(settings)
				.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(esNode1), 9300));
		System.out.println("\nstrt: "+System.currentTimeMillis()+"\n");
		
		
		//define group name
		String gname;
		//gname = "Heap Usage (MB)";
		//gname = "Non Heap Usage (MB)";
		gname = "GC Time Spent (ms/min)";
		//gname = "Process CPU Burnt (ms/min) Per Blade [POD30]";
		//gname = "Process CPU Usage %";
		
		
		
		//define time range
		timeRange trange = new timeRange();
		//trange.setFrom(System.currentTimeMillis() - (5*60*1000) - (3*60*60*1000));
		//trange.setTo(System.currentTimeMillis() - (5*60*1000));
		trange.setFrom(1500030110115l);
		trange.setTo(1500274361644l);
				
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
		pb.getMatrixMap();
		
		//feedBatch object
		feedBatch fb = new feedBatch(pb, topn, method);
		
		//feed to anomaly detector with RServe
		fb.feed();
		
		//get the anomalies
		fb.getAnomalies();
		
		//use this to updateDashboard or serveReport (for the specific requesting user)
		
		
		client.close();
	}
}
