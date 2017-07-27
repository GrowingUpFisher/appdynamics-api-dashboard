package book;

import java.util.List;

public class dataresponse {
	private int id;
    private String name;
    private String undefined;
    private List<links> links;
    
	public String getUndefined() {
		return undefined;
	}
	public void setUndefined(String undefined) {
		this.undefined = undefined;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}    
	public List<links> getLinks() {
		return links;
	}
	public void setLinks(List<links> links) {
		this.links = links;
	}
	@Override
    public String toString() {
        return "dataresponse{" +
                "id='" + id + '\'' +
                ", name=" + name + '\'' +
                ", links=" + links +
                '}';
    }
}
