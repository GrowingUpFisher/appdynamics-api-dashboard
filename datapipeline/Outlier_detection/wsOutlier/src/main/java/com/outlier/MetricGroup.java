package com.outlier;

import java.util.ArrayList;
import java.util.List;

public class MetricGroup {
	
	private String groupName;
	private timeRange trange;
	
	private List<jsonlet> endpointList = new ArrayList<jsonlet>();
	
	public MetricGroup(timeRange trange, String groupName) {
		this.groupName = groupName;
		this.trange = trange;
	}
	
	public void populateEndpoints() {
		//call database to get the endpointList
		
		if(groupName.equalsIgnoreCase("process_cpu_burnt_per_blade_pod30")) {
		jsonlet endpoint1 = new jsonlet();
		endpoint1.setApplication("aacd_prd_POD30");
		endpoint1.setPl1("Application Infrastructure Performance");
		endpoint1.setPl3("Individual Nodes");
		endpoint1.setPl4("POD30_blade7-2");
		endpoint1.setPl5("JVM");
		endpoint1.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint2 = new jsonlet();
		endpoint2.setApplication("aacd_prd_POD30");
		endpoint2.setPl1("Application Infrastructure Performance");
		endpoint2.setPl3("Individual Nodes");
		endpoint2.setPl4("POD30_blade6-5");
		endpoint2.setPl5("JVM");
		endpoint2.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint3 = new jsonlet();
		endpoint3.setApplication("aacd_prd_POD30");
		endpoint3.setPl1("Application Infrastructure Performance");
		endpoint3.setPl3("Individual Nodes");
		endpoint3.setPl4("POD30_blade6-2");
		endpoint3.setPl5("JVM");
		endpoint3.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint4 = new jsonlet();
		endpoint4.setApplication("aacd_prd_POD30");
		endpoint4.setPl1("Application Infrastructure Performance");
		endpoint4.setPl3("Individual Nodes");
		endpoint4.setPl4("POD30_blade5-3");
		endpoint4.setPl5("JVM");
		endpoint4.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint5 = new jsonlet();
		endpoint5.setApplication("aacd_prd_POD30");
		endpoint5.setPl1("Application Infrastructure Performance");
		endpoint5.setPl3("Individual Nodes");
		endpoint5.setPl4("POD30_blade4-7");
		endpoint5.setPl5("JVM");
		endpoint5.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint6 = new jsonlet();
		endpoint6.setApplication("aacd_prd_POD30");
		endpoint6.setPl1("Application Infrastructure Performance");
		endpoint6.setPl3("Individual Nodes");
		endpoint6.setPl4("POD30_blade4-6");
		endpoint6.setPl5("JVM");
		endpoint6.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint7 = new jsonlet();
		endpoint7.setApplication("aacd_prd_POD30");
		endpoint7.setPl1("Application Infrastructure Performance");
		endpoint7.setPl3("Individual Nodes");
		endpoint7.setPl4("POD30_blade4-5");
		endpoint7.setPl5("JVM");
		endpoint7.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint8 = new jsonlet();
		endpoint8.setApplication("aacd_prd_POD30");
		endpoint8.setPl1("Application Infrastructure Performance");
		endpoint8.setPl3("Individual Nodes");
		endpoint8.setPl4("POD30_blade3-9");
		endpoint8.setPl5("JVM");
		endpoint8.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint9 = new jsonlet();
		endpoint9.setApplication("aacd_prd_POD30");
		endpoint9.setPl1("Application Infrastructure Performance");
		endpoint9.setPl3("Individual Nodes");
		endpoint9.setPl4("POD30_blade3-7");
		endpoint9.setPl5("JVM");
		endpoint9.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint10 = new jsonlet();
		endpoint10.setApplication("aacd_prd_POD30");
		endpoint10.setPl1("Application Infrastructure Performance");
		endpoint10.setPl3("Individual Nodes");
		endpoint10.setPl4("POD30_blade3-5");
		endpoint10.setPl5("JVM");
		endpoint10.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint11 = new jsonlet();
		endpoint11.setApplication("aacd_prd_POD30");
		endpoint11.setPl1("Application Infrastructure Performance");
		endpoint11.setPl3("Individual Nodes");
		endpoint11.setPl4("POD30_blade3-1");
		endpoint11.setPl5("JVM");
		endpoint11.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint12 = new jsonlet();
		endpoint12.setApplication("aacd_prd_POD30");
		endpoint12.setPl1("Application Infrastructure Performance");
		endpoint12.setPl3("Individual Nodes");
		endpoint12.setPl4("POD30_blade2-2");
		endpoint12.setPl5("JVM");
		endpoint12.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint13 = new jsonlet();
		endpoint13.setApplication("aacd_prd_POD30");
		endpoint13.setPl1("Application Infrastructure Performance");
		endpoint13.setPl3("Individual Nodes");
		endpoint13.setPl4("POD30_blade0-2");
		endpoint13.setPl5("JVM");
		endpoint13.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint14 = new jsonlet();
		endpoint14.setApplication("aacd_prd_POD30");
		endpoint14.setPl1("Application Infrastructure Performance");
		endpoint14.setPl3("Individual Nodes");
		endpoint14.setPl4("POD30_blade1-8");
		endpoint14.setPl5("JVM");
		endpoint14.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint15 = new jsonlet();
		endpoint15.setApplication("aacd_prd_POD30");
		endpoint15.setPl1("Application Infrastructure Performance");
		endpoint15.setPl3("Individual Nodes");
		endpoint15.setPl4("POD30_blade1-6");
		endpoint15.setPl5("JVM");
		endpoint15.setPl6("Process CPU Burnt (ms/min)");

		jsonlet endpoint16 = new jsonlet();
		endpoint16.setApplication("aacd_prd_POD30");
		endpoint16.setPl1("Application Infrastructure Performance");
		endpoint16.setPl3("Individual Nodes");
		endpoint16.setPl4("POD30_blade1-1");
		endpoint16.setPl5("JVM");
		endpoint16.setPl6("Process CPU Burnt (ms/min)");
		
		endpointList.add(endpoint1);
		endpointList.add(endpoint2);
		endpointList.add(endpoint3);
		endpointList.add(endpoint4);
		endpointList.add(endpoint5);
		endpointList.add(endpoint6);
		endpointList.add(endpoint7);
		endpointList.add(endpoint8);
		endpointList.add(endpoint9);
		endpointList.add(endpoint10);
		endpointList.add(endpoint11);
		endpointList.add(endpoint12);
		endpointList.add(endpoint13);
		endpointList.add(endpoint14);
		endpointList.add(endpoint15);
		endpointList.add(endpoint16);
		} else if (groupName.equalsIgnoreCase("h_usage")) {
		jsonlet endpoint1 = new jsonlet();
		endpoint1.setApplication("aagl_prd_POD44");
		endpoint1.setPl1("Application Infrastructure Performance");
		endpoint1.setPl3("JVM");
		endpoint1.setPl4("Memory");
		endpoint1.setPl5("Heap");
		endpoint1.setPl6("Current Usage (MB)");

		jsonlet endpoint2 = new jsonlet();
		endpoint2.setApplication("aaqp_prd_POD24");
		endpoint2.setPl1("Application Infrastructure Performance");
		endpoint2.setPl3("JVM");
		endpoint2.setPl4("Memory");
		endpoint2.setPl5("Heap");
		endpoint2.setPl6("Current Usage (MB)");

		jsonlet endpoint3 = new jsonlet();
		endpoint3.setApplication("aacp_prd_POD53");
		endpoint3.setPl1("Application Infrastructure Performance");
		endpoint3.setPl3("JVM");
		endpoint3.setPl4("Memory");
		endpoint3.setPl5("Heap");
		endpoint3.setPl6("Current Usage (MB)");

		jsonlet endpoint4 = new jsonlet();
		endpoint4.setApplication("aarb_prd_POD27");
		endpoint4.setPl1("Application Infrastructure Performance");
		endpoint4.setPl3("JVM");
		endpoint4.setPl4("Memory");
		endpoint4.setPl5("Heap");
		endpoint4.setPl6("Current Usage (MB)");

		jsonlet endpoint5 = new jsonlet();
		endpoint5.setApplication("aacd_prd_POD30");
		endpoint5.setPl1("Application Infrastructure Performance");
		endpoint5.setPl3("JVM");
		endpoint5.setPl4("Memory");
		endpoint5.setPl5("Heap");
		endpoint5.setPl6("Current Usage (MB)");

		jsonlet endpoint6 = new jsonlet();
		endpoint6.setApplication("aamk_prd_POD38");
		endpoint6.setPl1("Application Infrastructure Performance");
		endpoint6.setPl3("JVM");
		endpoint6.setPl4("Memory");
		endpoint6.setPl5("Heap");
		endpoint6.setPl6("Current Usage (MB)");

		jsonlet endpoint7 = new jsonlet();
		endpoint7.setApplication("aang_prd_POD52");
		endpoint7.setPl1("Application Infrastructure Performance");
		endpoint7.setPl3("JVM");
		endpoint7.setPl4("Memory");
		endpoint7.setPl5("Heap");
		endpoint7.setPl6("Current Usage (MB)");

		jsonlet endpoint8 = new jsonlet();
		endpoint8.setApplication("aaqx_prd_POD49");
		endpoint8.setPl1("Application Infrastructure Performance");
		endpoint8.setPl3("JVM");
		endpoint8.setPl4("Memory");
		endpoint8.setPl5("Heap");
		endpoint8.setPl6("Current Usage (MB)");
		
		endpointList.add(endpoint1);
		endpointList.add(endpoint2);
		endpointList.add(endpoint3);
		endpointList.add(endpoint4);
		endpointList.add(endpoint5);
		endpointList.add(endpoint6);
		endpointList.add(endpoint7);
		endpointList.add(endpoint8);
		} else if(groupName.equalsIgnoreCase("gc_time_spent")) {
		jsonlet endpoint1 = new jsonlet();
		endpoint1.setApplication("aagl_prd_POD44");
		endpoint1.setPl1("Application Infrastructure Performance");
		endpoint1.setPl3("JVM");
		endpoint1.setPl4("Garbage Collection");
		endpoint1.setPl5("GC Time Spent Per Min (ms)");

		jsonlet endpoint2 = new jsonlet();
		endpoint2.setApplication("aaqp_prd_POD24");
		endpoint2.setPl1("Application Infrastructure Performance");
		endpoint2.setPl3("JVM");
		endpoint2.setPl4("Garbage Collection");
		endpoint2.setPl5("GC Time Spent Per Min (ms)");

		jsonlet endpoint3 = new jsonlet();
		endpoint3.setApplication("aacp_prd_POD53");
		endpoint3.setPl1("Application Infrastructure Performance");
		endpoint3.setPl3("JVM");
		endpoint3.setPl4("Garbage Collection");
		endpoint3.setPl5("GC Time Spent Per Min (ms)");

		jsonlet endpoint4 = new jsonlet();
		endpoint4.setApplication("aarb_prd_POD27");
		endpoint4.setPl1("Application Infrastructure Performance");
		endpoint4.setPl3("JVM");
		endpoint4.setPl4("Garbage Collection");
		endpoint4.setPl5("GC Time Spent Per Min (ms)");

		jsonlet endpoint5 = new jsonlet();
		endpoint5.setApplication("aacd_prd_POD30");
		endpoint5.setPl1("Application Infrastructure Performance");
		endpoint5.setPl3("JVM");
		endpoint5.setPl4("Garbage Collection");
		endpoint5.setPl5("GC Time Spent Per Min (ms)");

		jsonlet endpoint6 = new jsonlet();
		endpoint6.setApplication("aamk_prd_POD38");
		endpoint6.setPl1("Application Infrastructure Performance");
		endpoint6.setPl3("JVM");
		endpoint6.setPl4("Garbage Collection");
		endpoint6.setPl5("GC Time Spent Per Min (ms)");

		jsonlet endpoint7 = new jsonlet();
		endpoint7.setApplication("aang_prd_POD52");
		endpoint7.setPl1("Application Infrastructure Performance");
		endpoint7.setPl3("JVM");
		endpoint7.setPl4("Garbage Collection");
		endpoint7.setPl5("GC Time Spent Per Min (ms)");

		jsonlet endpoint8 = new jsonlet();
		endpoint8.setApplication("aaqx_prd_POD49");
		endpoint8.setPl1("Application Infrastructure Performance");
		endpoint8.setPl3("JVM");
		endpoint8.setPl4("Garbage Collection");
		endpoint8.setPl5("GC Time Spent Per Min (ms)");
		
		endpointList.add(endpoint1);
		endpointList.add(endpoint2);
		endpointList.add(endpoint3);
		endpointList.add(endpoint4);
		endpointList.add(endpoint5);
		endpointList.add(endpoint6);
		endpointList.add(endpoint7);
		endpointList.add(endpoint8);
		} else if(groupName.equalsIgnoreCase("process_cpu_usage_pct")) {
		jsonlet endpoint1 = new jsonlet();
		endpoint1.setApplication("aagl_prd_POD44");
		endpoint1.setPl1("Application Infrastructure Performance");
		endpoint1.setPl3("JVM");
		endpoint1.setPl4("Process CPU Usage %");

		jsonlet endpoint2 = new jsonlet();
		endpoint2.setApplication("aaqp_prd_POD24");
		endpoint2.setPl1("Application Infrastructure Performance");
		endpoint2.setPl3("JVM");
		endpoint2.setPl4("Process CPU Usage %");

		jsonlet endpoint3 = new jsonlet();
		endpoint3.setApplication("aacp_prd_POD53");
		endpoint3.setPl1("Application Infrastructure Performance");
		endpoint3.setPl3("JVM");
		endpoint3.setPl4("Process CPU Usage %");

		jsonlet endpoint4 = new jsonlet();
		endpoint4.setApplication("aarb_prd_POD27");
		endpoint4.setPl1("Application Infrastructure Performance");
		endpoint4.setPl3("JVM");
		endpoint4.setPl4("Process CPU Usage %");

		jsonlet endpoint5 = new jsonlet();
		endpoint5.setApplication("aacd_prd_POD30");
		endpoint5.setPl1("Application Infrastructure Performance");
		endpoint5.setPl3("JVM");
		endpoint5.setPl4("Process CPU Usage %");

		jsonlet endpoint6 = new jsonlet();
		endpoint6.setApplication("aamk_prd_POD38");
		endpoint6.setPl1("Application Infrastructure Performance");
		endpoint6.setPl3("JVM");
		endpoint6.setPl4("Process CPU Usage %");

		jsonlet endpoint7 = new jsonlet();
		endpoint7.setApplication("aang_prd_POD52");
		endpoint7.setPl1("Application Infrastructure Performance");
		endpoint7.setPl3("JVM");
		endpoint7.setPl4("Process CPU Usage %");

		jsonlet endpoint8 = new jsonlet();
		endpoint8.setApplication("aaqx_prd_POD49");
		endpoint8.setPl1("Application Infrastructure Performance");
		endpoint8.setPl3("JVM");
		endpoint8.setPl4("Process CPU Usage %");
		
		endpointList.add(endpoint1);
		endpointList.add(endpoint2);
		endpointList.add(endpoint3);
		endpointList.add(endpoint4);
		endpointList.add(endpoint5);
		endpointList.add(endpoint6);
		endpointList.add(endpoint7);
		endpointList.add(endpoint8);
		} else if(groupName.equalsIgnoreCase("nh_usage")) {
		jsonlet endpoint1 = new jsonlet();
		endpoint1.setApplication("aagl_prd_POD44");
		endpoint1.setPl1("Application Infrastructure Performance");
		endpoint1.setPl3("JVM");
		endpoint1.setPl4("Memory");
		endpoint1.setPl5("Non-Heap");
		endpoint1.setPl6("Current Usage (MB)");

		jsonlet endpoint2 = new jsonlet();
		endpoint2.setApplication("aaqp_prd_POD24");
		endpoint2.setPl1("Application Infrastructure Performance");
		endpoint2.setPl3("JVM");
		endpoint2.setPl4("Memory");
		endpoint2.setPl5("Non-Heap");
		endpoint2.setPl6("Current Usage (MB)");

		jsonlet endpoint3 = new jsonlet();
		endpoint3.setApplication("aacp_prd_POD53");
		endpoint3.setPl1("Application Infrastructure Performance");
		endpoint3.setPl3("JVM");
		endpoint3.setPl4("Memory");
		endpoint3.setPl5("Non-Heap");
		endpoint3.setPl6("Current Usage (MB)");

		jsonlet endpoint4 = new jsonlet();
		endpoint4.setApplication("aarb_prd_POD27");
		endpoint4.setPl1("Application Infrastructure Performance");
		endpoint4.setPl3("JVM");
		endpoint4.setPl4("Memory");
		endpoint4.setPl5("Non-Heap");
		endpoint4.setPl6("Current Usage (MB)");

		jsonlet endpoint5 = new jsonlet();
		endpoint5.setApplication("aacd_prd_POD30");
		endpoint5.setPl1("Application Infrastructure Performance");
		endpoint5.setPl3("JVM");
		endpoint5.setPl4("Memory");
		endpoint5.setPl5("Non-Heap");
		endpoint5.setPl6("Current Usage (MB)");

		jsonlet endpoint6 = new jsonlet();
		endpoint6.setApplication("aamk_prd_POD38");
		endpoint6.setPl1("Application Infrastructure Performance");
		endpoint6.setPl3("JVM");
		endpoint6.setPl4("Memory");
		endpoint6.setPl5("Non-Heap");
		endpoint6.setPl6("Current Usage (MB)");

		jsonlet endpoint7 = new jsonlet();
		endpoint7.setApplication("aang_prd_POD52");
		endpoint7.setPl1("Application Infrastructure Performance");
		endpoint7.setPl3("JVM");
		endpoint7.setPl4("Memory");
		endpoint7.setPl5("Non-Heap");
		endpoint7.setPl6("Current Usage (MB)");

		jsonlet endpoint8 = new jsonlet();
		endpoint8.setApplication("aaqx_prd_POD49");
		endpoint8.setPl1("Application Infrastructure Performance");
		endpoint8.setPl3("JVM");
		endpoint8.setPl4("Memory");
		endpoint8.setPl5("Non-Heap");
		endpoint8.setPl6("Current Usage (MB)");
		
		endpointList.add(endpoint1);
		endpointList.add(endpoint2);
		endpointList.add(endpoint3);
		endpointList.add(endpoint4);
		endpointList.add(endpoint5);
		endpointList.add(endpoint6);
		endpointList.add(endpoint7);
		endpointList.add(endpoint8);
		} else if (groupName.equalsIgnoreCase("calls_per_minute")) {
			jsonlet endpoint1 = new jsonlet();
			endpoint1.setApplication("aagl_prd_POD44");
			endpoint1.setPl1("Overall Application Performance");
			endpoint1.setPl2("Calls per Minute");

			jsonlet endpoint2 = new jsonlet();
			endpoint2.setApplication("aaqp_prd_POD24");
			endpoint2.setPl1("Overall Application Performance");
			endpoint2.setPl2("Calls per Minute");

			jsonlet endpoint3 = new jsonlet();
			endpoint3.setApplication("aacp_prd_POD53");
			endpoint3.setPl1("Overall Application Performance");
			endpoint3.setPl2("Calls per Minute");

			jsonlet endpoint4 = new jsonlet();
			endpoint4.setApplication("aarb_prd_POD27");
			endpoint4.setPl1("Overall Application Performance");
			endpoint4.setPl2("Calls per Minute");

			jsonlet endpoint5 = new jsonlet();
			endpoint5.setApplication("aacd_prd_POD30");
			endpoint5.setPl1("Overall Application Performance");
			endpoint5.setPl2("Calls per Minute");

			jsonlet endpoint6 = new jsonlet();
			endpoint6.setApplication("aamk_prd_POD38");
			endpoint6.setPl1("Overall Application Performance");
			endpoint6.setPl2("Calls per Minute");

			jsonlet endpoint7 = new jsonlet();
			endpoint7.setApplication("aang_prd_POD52");
			endpoint7.setPl1("Overall Application Performance");
			endpoint7.setPl2("Calls per Minute");

			jsonlet endpoint8 = new jsonlet();
			endpoint8.setApplication("aaqx_prd_POD49");
			endpoint8.setPl1("Overall Application Performance");
			endpoint8.setPl2("Calls per Minute");
			
			endpointList.add(endpoint1);
			endpointList.add(endpoint2);
			endpointList.add(endpoint3);
			endpointList.add(endpoint4);
			endpointList.add(endpoint5);
			endpointList.add(endpoint6);
			endpointList.add(endpoint7);
			endpointList.add(endpoint8);
			
			endpoint1 = new jsonlet();
			endpoint1.setApplication("aacd_prd_POD30");
			endpoint1.setPl1("Application Infrastructure Performance");
			endpoint1.setPl3("Individual Nodes");
			endpoint1.setPl4("POD30_blade7-2");
			endpoint1.setPl5("JVM");
			endpoint1.setPl6("Process CPU Burnt (ms/min)");

			endpoint2 = new jsonlet();
			endpoint2.setApplication("aacd_prd_POD30");
			endpoint2.setPl1("Application Infrastructure Performance");
			endpoint2.setPl3("Individual Nodes");
			endpoint2.setPl4("POD30_blade6-5");
			endpoint2.setPl5("JVM");
			endpoint2.setPl6("Process CPU Burnt (ms/min)");

			 endpoint3 = new jsonlet();
			endpoint3.setApplication("aacd_prd_POD30");
			endpoint3.setPl1("Application Infrastructure Performance");
			endpoint3.setPl3("Individual Nodes");
			endpoint3.setPl4("POD30_blade6-2");
			endpoint3.setPl5("JVM");
			endpoint3.setPl6("Process CPU Burnt (ms/min)");

			 endpoint4 = new jsonlet();
			endpoint4.setApplication("aacd_prd_POD30");
			endpoint4.setPl1("Application Infrastructure Performance");
			endpoint4.setPl3("Individual Nodes");
			endpoint4.setPl4("POD30_blade5-3");
			endpoint4.setPl5("JVM");
			endpoint4.setPl6("Process CPU Burnt (ms/min)");

			 endpoint5 = new jsonlet();
			endpoint5.setApplication("aacd_prd_POD30");
			endpoint5.setPl1("Application Infrastructure Performance");
			endpoint5.setPl3("Individual Nodes");
			endpoint5.setPl4("POD30_blade4-7");
			endpoint5.setPl5("JVM");
			endpoint5.setPl6("Process CPU Burnt (ms/min)");

			 endpoint6 = new jsonlet();
			endpoint6.setApplication("aacd_prd_POD30");
			endpoint6.setPl1("Application Infrastructure Performance");
			endpoint6.setPl3("Individual Nodes");
			endpoint6.setPl4("POD30_blade4-6");
			endpoint6.setPl5("JVM");
			endpoint6.setPl6("Process CPU Burnt (ms/min)");

			 endpoint7 = new jsonlet();
			endpoint7.setApplication("aacd_prd_POD30");
			endpoint7.setPl1("Application Infrastructure Performance");
			endpoint7.setPl3("Individual Nodes");
			endpoint7.setPl4("POD30_blade4-5");
			endpoint7.setPl5("JVM");
			endpoint7.setPl6("Process CPU Burnt (ms/min)");

			 endpoint8 = new jsonlet();
			endpoint8.setApplication("aacd_prd_POD30");
			endpoint8.setPl1("Application Infrastructure Performance");
			endpoint8.setPl3("Individual Nodes");
			endpoint8.setPl4("POD30_blade3-9");
			endpoint8.setPl5("JVM");
			endpoint8.setPl6("Process CPU Burnt (ms/min)");

			jsonlet endpoint9 = new jsonlet();
			endpoint9.setApplication("aacd_prd_POD30");
			endpoint9.setPl1("Application Infrastructure Performance");
			endpoint9.setPl3("Individual Nodes");
			endpoint9.setPl4("POD30_blade3-7");
			endpoint9.setPl5("JVM");
			endpoint9.setPl6("Process CPU Burnt (ms/min)");

			jsonlet endpoint10 = new jsonlet();
			endpoint10.setApplication("aacd_prd_POD30");
			endpoint10.setPl1("Application Infrastructure Performance");
			endpoint10.setPl3("Individual Nodes");
			endpoint10.setPl4("POD30_blade3-5");
			endpoint10.setPl5("JVM");
			endpoint10.setPl6("Process CPU Burnt (ms/min)");

			jsonlet endpoint11 = new jsonlet();
			endpoint11.setApplication("aacd_prd_POD30");
			endpoint11.setPl1("Application Infrastructure Performance");
			endpoint11.setPl3("Individual Nodes");
			endpoint11.setPl4("POD30_blade3-1");
			endpoint11.setPl5("JVM");
			endpoint11.setPl6("Process CPU Burnt (ms/min)");

			jsonlet endpoint12 = new jsonlet();
			endpoint12.setApplication("aacd_prd_POD30");
			endpoint12.setPl1("Application Infrastructure Performance");
			endpoint12.setPl3("Individual Nodes");
			endpoint12.setPl4("POD30_blade2-2");
			endpoint12.setPl5("JVM");
			endpoint12.setPl6("Process CPU Burnt (ms/min)");

			jsonlet endpoint13 = new jsonlet();
			endpoint13.setApplication("aacd_prd_POD30");
			endpoint13.setPl1("Application Infrastructure Performance");
			endpoint13.setPl3("Individual Nodes");
			endpoint13.setPl4("POD30_blade0-2");
			endpoint13.setPl5("JVM");
			endpoint13.setPl6("Process CPU Burnt (ms/min)");

			jsonlet endpoint14 = new jsonlet();
			endpoint14.setApplication("aacd_prd_POD30");
			endpoint14.setPl1("Application Infrastructure Performance");
			endpoint14.setPl3("Individual Nodes");
			endpoint14.setPl4("POD30_blade1-8");
			endpoint14.setPl5("JVM");
			endpoint14.setPl6("Process CPU Burnt (ms/min)");

			jsonlet endpoint15 = new jsonlet();
			endpoint15.setApplication("aacd_prd_POD30");
			endpoint15.setPl1("Application Infrastructure Performance");
			endpoint15.setPl3("Individual Nodes");
			endpoint15.setPl4("POD30_blade1-6");
			endpoint15.setPl5("JVM");
			endpoint15.setPl6("Process CPU Burnt (ms/min)");

			jsonlet endpoint16 = new jsonlet();
			endpoint16.setApplication("aacd_prd_POD30");
			endpoint16.setPl1("Application Infrastructure Performance");
			endpoint16.setPl3("Individual Nodes");
			endpoint16.setPl4("POD30_blade1-1");
			endpoint16.setPl5("JVM");
			endpoint16.setPl6("Process CPU Burnt (ms/min)");
			
			endpointList.add(endpoint1);
			endpointList.add(endpoint2);
			endpointList.add(endpoint3);
			endpointList.add(endpoint4);
			endpointList.add(endpoint5);
			endpointList.add(endpoint6);
			endpointList.add(endpoint7);
			endpointList.add(endpoint8);
			endpointList.add(endpoint9);
			endpointList.add(endpoint10);
			endpointList.add(endpoint11);
			endpointList.add(endpoint12);
			endpointList.add(endpoint13);
			endpointList.add(endpoint14);
			endpointList.add(endpoint15);
			endpointList.add(endpoint16);
		}
		
	}

	public List<jsonlet> getEndpointList() {
		return endpointList;
	}

	public void setEndpointList(List<jsonlet> endpointList) {
		this.endpointList = endpointList;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public timeRange getTrange() {
		return trange;
	}

	public void setTrange(timeRange trange) {
		this.trange = trange;
	}
	
}
