package com.dw;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.sort.SortOrder;

public class getBatch {
	
	private MetricGroup group;
	private Map<String, jsonlet> rawData = new LinkedHashMap<String, jsonlet>();
	private Map<String, jsonlet> rawDataExcluded = new HashMap<String, jsonlet>();
	private Map<Long, ArrayList<String>> interSeriesPeriodDistribution = new HashMap<Long, ArrayList<String>>();
	private TransportClient client;
	public long maxp = 0;
	
	
	public getBatch(timeRange trange, String gname, TransportClient client) {
		this.group = new MetricGroup(trange, gname);
		this.group.populateEndpoints();
		this.client = client;
	}
	
	public void fetch(float voidTolerancePct) {
		//fetch data for all endpointList from ES
		for(jsonlet j: group.getEndpointList()) {
			
			BoolQueryBuilder bqb = new BoolQueryBuilder();
			
			bqb = bqb.must(QueryBuilders.termQuery("application", j.getApplication()));
			
			if(j.getPl1() != null)
				bqb = bqb.must(QueryBuilders.termQuery("pl1", j.getPl1()));
			if(j.getPl2() != null)
				bqb = bqb.must(QueryBuilders.termQuery("pl2", j.getPl2()));
			if(j.getPl3() != null)
				bqb = bqb.must(QueryBuilders.termQuery("pl3", j.getPl3()));
			if(j.getPl4() != null)
				bqb = bqb.must(QueryBuilders.termQuery("pl4", j.getPl4()));
			if(j.getPl5() != null)
				bqb = bqb.must(QueryBuilders.termQuery("pl5", j.getPl5()));
			if(j.getPl6() != null)
				bqb = bqb.must(QueryBuilders.termQuery("pl6", j.getPl6()));
			if(j.getPl7() != null)
				bqb = bqb.must(QueryBuilders.termQuery("pl7", j.getPl7()));
			if(j.getPl8() != null)
				bqb = bqb.must(QueryBuilders.termQuery("pl8", j.getPl8()));
			
			//System.out.println("1: "+System.currentTimeMillis());
			
			SearchResponse searchResponse = client.prepareSearch("apm-forecast").setTypes("appd")
					.setQuery(bqb) //set query
					.setPostFilter(QueryBuilders.rangeQuery("timestamp").from(group.getTrange().getFrom()).to(group.getTrange().getTo())) //set range
					.addSort("timestamp", SortOrder.ASC) //order by
					.setSize(10000)
					.get();
			
			//System.out.println("2: "+System.currentTimeMillis());
			
			String stream = j.toString();
			
			SearchHit[] sha = searchResponse.getHits().getHits();
			int cnt = 0;
			
			for(SearchHit sh: sha) {
				Map<String, Object> fields = sh.getSource();
				String timestamp = (String) fields.get("timestamp");
				Integer value = (Integer) fields.get("value");
				
				j.currentTS = Long.parseLong(timestamp);
				j.dataStream.add(value);
				j.incrementTotalObservedPoints();
				if(cnt == 0) {
					j.previousTS = j.currentTS;
					j.startTS = j.currentTS;
					cnt++;
					continue;
				}
				
				//calculate period distribution				
				Long period = j.currentTS - j.previousTS;
				//System.out.println(period);
				
				if(j.periodDistribution.containsKey(period)) {
					int sum = j.periodDistribution.get(period) + 1;
					j.periodDistribution.put(period, sum);
				} else {
					j.periodDistribution.put(period, 1);
				}
				
				if(j.toFill.containsKey(period)) {
					j.toFill.get(period).add(cnt);
				} else {
					j.toFill.put(period, new ArrayList<Integer>()); //counters are from head of queue
					j.toFill.get(period).add(cnt);
				}
				
				j.previousTS = j.currentTS;	
				j.endTS = j.currentTS;
				cnt++;
			}
			
			j.checkStatistics(voidTolerancePct);
			if(!j.isOddManOut()) {
				this.rawData.put(stream, j);
			} else {
				this.rawDataExcluded.put(stream, j);
			}
			
			if(interSeriesPeriodDistribution.containsKey(j.getMajorPeriod())) {
				interSeriesPeriodDistribution.get(j.getMajorPeriod()).add(stream);
			} else {
				interSeriesPeriodDistribution.put(j.getMajorPeriod(), new ArrayList<String>());
				interSeriesPeriodDistribution.get(j.getMajorPeriod()).add(stream);
			}
			
		}
		
		for(Long p: interSeriesPeriodDistribution.keySet()) {
			if(interSeriesPeriodDistribution.get(p).size() > maxp) {
				maxp = p;
			}
		}
		
		for(Long p: interSeriesPeriodDistribution.keySet()) {
			if(p!=maxp) {
				for(String s: interSeriesPeriodDistribution.get(p)) {
					rawData.get(s).checkStatistics(maxp);
					if(rawData.get(s).isOddManOut()) {
						this.rawDataExcluded.put(s, rawData.get(s));
						this.rawData.remove(s);
					}
				}
			}
		}
		
	}

	public MetricGroup getGroup() {
		return group;
	}

	public Map<String, jsonlet> getRawData() {
		return rawData;
	}

	public Map<String, jsonlet> getRawDataExcluded() {
		return rawDataExcluded;
	}

}
