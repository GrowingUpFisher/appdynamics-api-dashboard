package com.redis.data;

public class jsonlet {
	private String utc;
	private int current;
	//private int count;
	
	public String getUtc() {
		return utc;
	}
	public void setUtc(String utc) {
		this.utc = utc;
	}
	public int getCurrent() {
		return current;
	}
	public void setCurrent(int current) {
		this.current = current;
	}
	/*public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}*/	
	
	@Override
	public String toString() {
		return "{" +
                "\"utc\":" + utc +
                " , \"current\":" + Integer.toString(current) +
                '}';
	}
}
