package book;

public class links {

    private String href;
    private String name;

    public links() {
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
    public String toString() {
        return "links{" +
                "href='" + href + '\'' +
                ", name=" + name +
                '}';
    }
}

