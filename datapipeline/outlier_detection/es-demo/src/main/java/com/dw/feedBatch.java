package com.dw;

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
			//double[] res = (double[]) rcon.eval("dim(m)").asDoubles();
			//System.out.println(res[1]);
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
	
	public int getAnomalies() {
		return 0;
	}
}
