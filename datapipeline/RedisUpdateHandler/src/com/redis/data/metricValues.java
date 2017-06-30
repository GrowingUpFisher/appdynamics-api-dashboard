package com.redis.data;

public class metricValues {
	private int occurrences;
    private int current;
    private int min;
    private int max;
    private Long startTimeInMillis;
    private boolean useRange;
    private int count;
    private int sum;
    private int value;
    private int standardDeviation;
    private jsonlet xform;
    
	public int getOccurrences() {
		return occurrences;
	}
	public void setOccurrences(int occurrences) {
		this.occurrences = occurrences;
	}
	public int getCurrent() {
		return current;
	}
	public void setCurrent(int current) {
		this.current = current;
	}
	public int getMin() {
		return min;
	}
	public void setMin(int min) {
		this.min = min;
	}
	public int getMax() {
		return max;
	}
	public void setMax(int max) {
		this.max = max;
	}	
	public Long getStartTimeInMillis() {
		return startTimeInMillis;
	}
	public void setStartTimeInMillis(Long startTimeInMillis) {
		this.startTimeInMillis = startTimeInMillis;
	}
	public boolean isUseRange() {
		return useRange;
	}
	public void setUseRange(boolean useRange) {
		this.useRange = useRange;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getSum() {
		return sum;
	}
	public void setSum(int sum) {
		this.sum = sum;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public int getStandardDeviation() {
		return standardDeviation;
	}
	public void setStandardDeviation(int standardDeviation) {
		this.standardDeviation = standardDeviation;
	}
	public jsonlet getXform() {
		return xform;
	}
	public void setXform(String path, String application) {
		String[] path_levels = path.split("[|]");
		
		this.xform = new jsonlet();
		this.xform.setTimestamp(startTimeInMillis);
		this.xform.setValue(value);
		this.xform.setApplication(application);
		
		//System.out.println(path);
		
		for(int i=0; i<path_levels.length; i++) {
			switch(i) {
			case 0: this.xform.setPl1(path_levels[i]); break;
			case 1: this.xform.setPl2(path_levels[i]); break;
			case 2: this.xform.setPl3(path_levels[i]); break;
			case 3: this.xform.setPl4(path_levels[i]); break;
			case 4: this.xform.setPl5(path_levels[i]); break;
			case 5: this.xform.setPl6(path_levels[i]); break;
			case 6: this.xform.setPl7(path_levels[i]); break;
			case 7: this.xform.setPl8(path_levels[i]); break;
			}
		}
	}
}
