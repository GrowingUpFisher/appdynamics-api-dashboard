package com.redis.data;

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
    private int value;
    private Long timestamp;
    
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
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}	
	public Long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}
	
	private String checkAndGet(String str) {
		if(str.charAt(0) == '"' && str.charAt(str.length()-1) == '"') {
			return str.substring(1, str.length()-1);
		} else
			return str;
	}
	
	@Override
	public String toString() {
		return "{" +
                " \"application\":\"" + application + "\"" +
                " , \"pl1\":\"" + pl1 + "\"" +
                " , \"pl2\":\"" + pl2 + "\"" +
                " , \"pl3\":\"" + pl3 + "\"" +
                " , \"pl4\":\"" + pl4 + "\"" +
                " , \"pl5\":\"" + pl5 + "\"" +
                " , \"pl6\":\"" + pl6 + "\"" +
                " , \"pl7\":\"" + pl7 + "\"" +
                " , \"pl8\":\"" + pl8 + "\"" +
                " , \"value\":" + value +
                " , \"timestamp\":\"" + timestamp + "\"" +              
                '}';
	}
}
