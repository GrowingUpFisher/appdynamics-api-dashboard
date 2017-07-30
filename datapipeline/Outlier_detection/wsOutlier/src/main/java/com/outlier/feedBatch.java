package com.outlier;

import java.io.FileNotFoundException;
import java.io.IOException;
//import java.net.InetAddress;

import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;
import org.rosuda.REngine.Rserve.RConnection;

public class feedBatch {
	
	private prepBatch pb;
	private int topn = 3;
	private String method = "hdr";
	private int width = 60;
	private int window = 60;
	private int freq = 60;
	private int[] score;
	private double[] pc1;
	private double[] pc2;
	
	public feedBatch(prepBatch pb, int topn, String method) {
		this.pb = pb;
		this.topn = topn;
		this.method = method;
		switch(pb.getAggr()) {
		case "1h":
			this.width = 4;
			this.window = 12;
			this.freq = 4;
			break;
		default:
			break;
		}
	}
	
	public void feed() throws REXPMismatchException, FileNotFoundException, IOException, REngineException {
		RConnection rcon = new RConnection("localhost", 6311);
		String path = "/Users/dbasak/Documents/RPlotPNG/";
		String filename1 = "ahull_";//+InetAddress.getLocalHost()+"_"+Thread.currentThread().getId();
		String filename2 = "plots_";//+InetAddress.getLocalHost()+"_"+Thread.currentThread().getId();
		int nseries = pb.getNseries();
		if(rcon.isConnected()) {
			System.out.println("Connected to RServe.");
			System.out.println("Computing PCA + HDR for "+nseries+" streams with "+pb.getNcols()+" observations each.");
			rcon.assign("path", path);
			rcon.assign("dat", pb.getMatrix());
			rcon.voidEval("library(\"anomalousACM\", lib.loc=\"/Library/Frameworks/R.framework/Versions/3.4/Resources/library\")");
			rcon.voidEval("library(\"rgl\", lib.loc=\"/Library/Frameworks/R.framework/Versions/3.4/Resources/library\")");
			rcon.voidEval("z <- ts(matrix(dat,ncol=" + nseries + "), freq="+freq+")");
			rcon.voidEval("y <- tsmeasures(z, width = "+width+", window = "+window+")");
			rcon.voidEval("hdr <- anomaly(y, n = " + topn + ", plot = FALSE, method = \"" + method + "\")");
			rcon.voidEval("xrange <- range(hdr$scores[, 1], na.rm = TRUE)");
			rcon.voidEval("yrange <- range(hdr$scores[, 2], na.rm = TRUE)");
			rcon.voidEval("png(\"" + path + filename1 + ".png\")");
			rcon.voidEval("plot(x = hdr$scores[-hdr$index, 1], y = hdr$scores[-hdr$index, 2], pch = 19, col = \"darkblue\", xlab = \"PC1\", ylab = \"PC2\", main = \"Alpha-hull on Anomalies\", xlim = xrange, ylim = yrange)"); 
			rcon.voidEval("points(hdr$scores[hdr$index, 1], hdr$scores[hdr$index, 2], col = \"red\", pch = 17)");
			rcon.voidEval("text(hdr$scores[hdr$index, 1] + 0.3, hdr$scores[hdr$index, 2], col = \"red\", label = 1:length(hdr$index), cex = 1.2, adj = c(3,0.3))");
			rcon.voidEval("dev.off()");
			System.out.println("Alpha-hull clustering plotted.");
			rcon.voidEval("png(\"" + path + filename2 + ".png\")");
			rcon.voidEval("plot(z[, hdr$index], main=\"Top-n Outlier Streams\")");
			rcon.voidEval("dev.off()");
			System.out.println("Top "+topn+" outlier streams plotted.");
			score = (int[]) rcon.eval("ert <- hdr$index").asIntegers();
			pc1 = (double[]) rcon.eval("ert1 <- hdr$scores[,1]").asDoubles();
			pc2 = (double[]) rcon.eval("ert2 <- hdr$scores[,2]").asDoubles();
			
			System.out.println("Scores:");
			for(int i=0; i<score.length; i++) {
				System.out.println((i+1)+": Series "+score[i]);
			}
			System.out.println("Principle Components:");
			for(int i=0; i<pc1.length; i++) {
				System.out.println("Series "+(i+1)+": "+pc1[i]+"\t"+pc2[i]);
			}
			if(rcon.needLogin()) {
				System.out.println("Providing Login.");
				rcon.login("username", "password");
			}
			
		} else {
			System.out.println("RServe could not connect.");
		}
		
		rcon.close();
		System.out.println("Success!");
		System.out.println("RServe session closed.");
	}
	
	public String getAnomalies() {
		
		StringBuffer htm = new StringBuffer("<!DOCTYPE html> <html> <head> <style> table, th, td {     border: 1px solid black;     border-collapse: collapse; } th, td {     padding: 5px; } th {     text-align: left; } table#t01 {     width: 100%;         background-color: #f1f1c1; } </style> </head> <body>  <h3>Group: "
											+pb.getGb().getGroup().getGroupName()
											+"</h3>  <h3>Top "+topn+" Outliers:</h3> <table style=\"width:100%\">  <tr>     <th>Rank</th>     <th>Series</th>      <th>Path</th>   </tr>");
		
		for(int i=0; i<score.length; i++) {
			htm.append("<tr>");
			htm.append("<td>"+(i+1)+"</td>");
			htm.append("<td>"+"Series "+score[i]+"</td>");
			htm.append("<td>"+pb.getMatrixMap(false).get(score[i])+"</td>");
			htm.append("</tr>");
		}
		
		htm.append("</table>");
		
		if(pb.getGb().getRawDataExcluded().size() > 0) {
			htm.append("<h3>Excluded Time Series:</h3>");
			htm.append("<table id=\"t01\" style=\"width:100%\">");
			htm.append("<tr>     <th>SR No.</th>     <th>Series</th>      <th>Path</th>   </tr>");
			
			for(int i=0; i<pb.getGb().getRawDataExcluded().size(); i++) {
				htm.append("<tr>");
				htm.append("<td>"+(i+1)+"</td>");
				htm.append("<td>"+"Series "+(i+1)+"</td>");
				htm.append("<td>"+pb.getMatrixMap(false).get(score[i+1])+"</td>");
				htm.append("</tr>");
			}
			
			htm.append("</table>");
		}
		
		htm.append("<img src=\"/otlr/plots/ahull_.png\" style=\"float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;\"/>");
		htm.append("<img src=\"/otlr/plots/plots_.png\" style=\"float: left; width: 30%; margin-right: 1%; margin-bottom: 0.5em;\"/>");
		htm.append("<p style=\"clear: both;\"/>");
		htm.append("</body>");
		htm.append("</html>");
		
		return htm.toString();
	}
}
