package com.provider;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import com.outlier.*;

@Path("/otlr")
public class Otlr {
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String serve_HTML(	@DefaultValue("0") @QueryParam("from") String from,
						        @DefaultValue("0") @QueryParam("to") String to,
						        @DefaultValue("groupx") @QueryParam("gname") String gname,
						        @DefaultValue("x") @QueryParam("agg") String agg,
						        @DefaultValue("3") @QueryParam("topn") String topn) {
		App entry = new App();
		String[] args = null;
		args = new String[5];
		args[0] = from;
		args[1] = to;
		args[2] = gname;
		args[3] = agg;
		args[4] = topn;
		String ret = "";
		
		try {
			ret = entry.main(args);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ret;
	}
}
