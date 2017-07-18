package com.dw;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class jsonlet {
	private String application;
    private String pl1;
    private String pl2;
    private String pl3;
    private String pl4;
    private String pl5;
    private String pl6;
    private String pl7;
    private String pl8;
    
    public Long currentTS;
    public Long startTS;
    public Long endTS;
    public Long previousTS = 0l;
    public int previousValue;
    private long majorPeriod;
    private int totalObservedPoints;    
    public Map<Long, Integer> periodDistribution = new HashMap<Long, Integer>();
    public Map<Long, ArrayList<Integer>> toFill = new HashMap<Long, ArrayList<Integer>>();
    public List<Integer> dataStream = new ArrayList<Integer>();
    private boolean isOddManOut = false;
    private String reasonOddManOut;
    
    
    public void checkStatistics(Long maxp) {
    	if(this.majorPeriod != maxp) {
    		this.isOddManOut = true;
    		this.reasonOddManOut = "Majority period does not match with the others in MetricGroup! Check the timeseries.";
    	}
    }
    
    public void checkStatistics(float voidTolerancePct) {
    	this.periodDistribution = sortByValue(this.periodDistribution);
    	
    	int cnt = 0;
    	int acc = 0;
    	
    	for(Long i: periodDistribution.keySet()) {
    		//System.out.println("freq: "+i+" no.: "+this.periodDistribution.get(i));
    		if(cnt == 0) {
    			//System.out.println("hereto set majority");
    			this.majorPeriod = i;
    			cnt++;
    			continue;
    		} else {
    			if(i<this.majorPeriod) {
    				this.isOddManOut = true;
    				this.reasonOddManOut = "Majority period is higher than residue periods! Check the timeseries.";
    				break;
    			} else {
    				acc += ((i / this.majorPeriod) - 1) * this.periodDistribution.get(i);
    			}
    		}
    	}
    	
    	//System.out.println("majority period: "+this.majorPeriod);
    	//System.out.println("miss: "+acc);
    	//System.out.println("total: "+this.totalObservedPoints);
    	System.out.printf("%.3f: [percent missing points]   %s\n", (float)acc/(this.totalObservedPoints + acc), this.toString());
    	
    	if((float)acc/(this.totalObservedPoints + acc) > voidTolerancePct) {
    		this.isOddManOut = true;
			this.reasonOddManOut = "More than 10% of the data-points in the selected window are missing! Check the timeseries.";
    	}
    }
    
    private <K, V extends Comparable<? super V>> Map<K, V> sortByValue(Map<K, V> map) {
        return map.entrySet()
                  .stream()
                  .sorted(Map.Entry.comparingByValue(Collections.reverseOrder()))
                  .collect(Collectors.toMap(
                    Map.Entry::getKey, 
                    Map.Entry::getValue, 
                    (e1, e2) -> e1, 
                    LinkedHashMap::new
                  ));
    }
    
    
    
    public long getMajorPeriod() {
		return majorPeriod;
	}
	public void incrementTotalObservedPoints() {
    	this.totalObservedPoints++;
    }
	public boolean isOddManOut() {
		return isOddManOut;
	}
	public String getReasonOddManOut() {
		return reasonOddManOut;
	}
	public String getApplication() {
		return application;
	}
	public void setApplication(String application) {
		this.application = application;
	}
	public String getPl1() {
		return pl1;
	}
	public void setPl1(String pl1) {
		this.pl1 = checkAndGet(pl1);
	}
	public String getPl2() {
		return pl2;
	}
	public void setPl2(String pl2) {
		this.pl2 = checkAndGet(pl2);
	}
	public String getPl3() {
		return pl3;
	}
	public void setPl3(String pl3) {
		this.pl3 = checkAndGet(pl3);
	}
	public String getPl4() {
		return pl4;
	}
	public void setPl4(String pl4) {
		this.pl4 = checkAndGet(pl4);
	}
	public String getPl5() {
		return pl5;
	}
	public void setPl5(String pl5) {
		this.pl5 = checkAndGet(pl5);
	}
	public String getPl6() {
		return pl6;
	}
	public void setPl6(String pl6) {
		this.pl6 = checkAndGet(pl6);
	}
	public String getPl7() {
		return pl7;
	}
	public void setPl7(String pl7) {
		this.pl7 = checkAndGet(pl7);
	}
	public String getPl8() {
		return pl8;
	}
	public void setPl8(String pl8) {
		this.pl8 = checkAndGet(pl8);
	}
	
	private String checkAndGet(String str) {
		if(str.charAt(0) == '"' && str.charAt(str.length()-1) == '"') {
			return str.substring(1, str.length()-1);
		} else
			return str;
	}
	
	@Override
	public String toString() {
		
		StringBuffer sb = new StringBuffer(application);
		
		if(pl1!=null)
			sb.append("|"+pl1);
		if(pl2!=null)
			sb.append("|"+pl2);
		if(pl3!=null)
			sb.append("|"+pl3);
		if(pl4!=null)
			sb.append("|"+pl4);
		if(pl5!=null)
			sb.append("|"+pl5);
		if(pl6!=null)
			sb.append("|"+pl6);
		if(pl7!=null)
			sb.append("|"+pl7);
		if(pl8!=null)
			sb.append("|"+pl8);
		
		return sb.toString();
	}
}
