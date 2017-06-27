package com.redis.data;

public class jsonlet {
	private String application;
    private String path_level_1;
    private String path_level_2;
    private String path_level_3;
    private String path_level_4;
    private String path_level_5;
    private String path_level_6;
    private String path_level_7;
    private int value;
    private String timestamp;
    
	public String getApplication() {
		return application;
	}
	public void setApplication(String application) {
		this.application = application;
	}
	public String getPath_level_1() {
		return path_level_1;
	}
	public void setPath_level_1(String path_level_1) {
		this.path_level_1 = path_level_1;
	}
	public String getPath_level_2() {
		return path_level_2;
	}
	public void setPath_level_2(String path_level_2) {
		this.path_level_2 = path_level_2;
	}
	public String getPath_level_3() {
		return path_level_3;
	}
	public void setPath_level_3(String path_level_3) {
		this.path_level_3 = path_level_3;
	}
	public String getPath_level_4() {
		return path_level_4;
	}
	public void setPath_level_4(String path_level_4) {
		this.path_level_4 = path_level_4;
	}
	public String getPath_level_5() {
		return path_level_5;
	}
	public void setPath_level_5(String path_level_5) {
		this.path_level_5 = path_level_5;
	}
	public String getPath_level_6() {
		return path_level_6;
	}
	public void setPath_level_6(String path_level_6) {
		this.path_level_6 = path_level_6;
	}
	public String getPath_level_7() {
		return path_level_7;
	}
	public void setPath_level_7(String path_level_7) {
		this.path_level_7 = path_level_7;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	
	@Override
	public String toString() {
		return "{" +
                " \"application\":\"" + application + "\"" +
                " , \"path_level_1\":\"" + path_level_1 + "\"" +
                " , \"path_level_2\":\"" + path_level_2 + "\"" +
                " , \"path_level_3\":\"" + path_level_3 + "\"" +
                " , \"path_level_4\":\"" + path_level_4 + "\"" +
                " , \"path_level_5\":\"" + path_level_5 + "\"" +
                " , \"path_level_6\":\"" + path_level_6 + "\"" +
                " , \"path_level_7\":\"" + path_level_7 + "\"" +
                " , \"value\":" + Integer.toString(value) +
                " , \"timestamp\":" + timestamp +               
                '}';
	}
}
