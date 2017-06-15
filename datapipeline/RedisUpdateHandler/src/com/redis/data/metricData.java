package com.redis.data;

import java.util.List;

public class metricData {
	private String metricName;
	private int metricId;
	private String metricPath;
	private String frequency;
	private List<metricValues> metricValues;
	
	public String getMetricName() {
		return metricName;
	}
	public void setMetricName(String metricName) {
		this.metricName = metricName;
	}
	public int getMetricId() {
		return metricId;
	}
	public void setMetricId(int metricId) {
		this.metricId = metricId;
	}
	public String getMetricPath() {
		return metricPath;
	}
	public void setMetricPath(String metricPath) {
		this.metricPath = metricPath;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public List<metricValues> getMetricValues() {
		return metricValues;
	}
	public void setMetricValues(List<metricValues> metricValues) {
		this.metricValues = metricValues;
	}
}
