package com.dw;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

public class prepBatch {
	
	private int[] matrix;
	private getBatch gb;
	private long maxStartTS = Long.MIN_VALUE;
	private int trimSize = Integer.MAX_VALUE; 
	private int ncols;
	private int nseries;
	private String aggr;
	private Map<Integer, String> matrixMap = new LinkedHashMap<Integer, String>();
	
	public prepBatch(getBatch gb, String aggr) {
		this.gb = gb;
		this.aggr = aggr;
	}
	
	public void trim() {		
		//trim series from start
		for(String s: this.gb.getRawData().keySet()) {
			jsonlet j = this.gb.getRawData().get(s);
			int offset = 0;
			if((offset = (int) ((this.maxStartTS - j.startTS) / this.gb.maxp)) > 0) {
				j.dataStream = j.dataStream.subList(offset, j.dataStream.size());
			}
			if(j.dataStream.size() < this.trimSize) {
				this.trimSize = j.dataStream.size();
			}
		}
		
		//trim series from end
		for(String s: this.gb.getRawData().keySet()) {
			jsonlet j = this.gb.getRawData().get(s);
			j.dataStream = j.dataStream.subList(0, this.trimSize);
		}
		
		//validate
		int cnt = 0;
		for(String s: this.gb.getRawData().keySet()) {
			jsonlet j = this.gb.getRawData().get(s);
			System.out.println(j.dataStream.size()+": [data-size]   "+s);
			if(cnt == 0) {
				ncols = j.dataStream.size();
				cnt++;
				continue;
			}
			if(j.dataStream.size() != ncols) {
				System.out.println("ncols do not match!");
				System.exit(-1);
			}
		}
		System.out.println("Data Validated.");
	}
	
	public void fill() {
		
		for(String s: this.gb.getRawData().keySet()) {
			jsonlet j = this.gb.getRawData().get(s);
			
			this.maxStartTS = j.startTS > this.maxStartTS?j.startTS:this.maxStartTS;
			
			for(long freq: j.toFill.keySet()) {
				int nPoints = (int) (freq / j.getMajorPeriod()) - 1;
				if(freq != j.getMajorPeriod()) {
					for(int i = j.toFill.get(freq).size() - 1; i >= 0; i--) {
						int index = j.toFill.get(freq).get(i);
						j.dataStream.addAll(index, buildInsertionBand(nPoints, j.dataStream.get(index-1), 0));
					}
				}
			}
		}
		
	}
	
	private ArrayList<Integer> buildInsertionBand(int nPoints, int from, int to) {
		ArrayList<Integer> band = new ArrayList<Integer>(nPoints);
		for(int i=0; i<nPoints; i++) {
			band.add(from);
		}
		return band;
	}

	public int[] getMatrix() {
		return matrix;
	}

	public void setMatrix() {
		matrix = new int[ncols*gb.getRawData().size()];
		int cnt = 1;
		ArrayList<Integer> temparr = new ArrayList<Integer>();
		for(String s: this.gb.getRawData().keySet()) {
			matrixMap.put(cnt, s);
			jsonlet j = this.gb.getRawData().get(s);
			temparr.addAll(aggr(j));
			cnt++;
		}
		matrix = temparr.stream().mapToInt(i -> i).toArray();
		this.nseries = this.gb.getRawData().size();
	}
	
	private Collection<Integer> aggr(jsonlet originalTS) {
		ArrayList<Integer> tempaggr = new ArrayList<Integer>();
		
		switch(this.aggr) {
		case "1h":
			this.ncols = 0;
			int sum = 0;
			int cnt = 0;
			for(int i: originalTS.dataStream) {
				sum += i;
				cnt++;
				if(cnt == (60000*60) / (int) originalTS.getMajorPeriod()) {
					tempaggr.add(sum/cnt);
					cnt = 0;
					sum = 0;
					this.ncols += 1;
				}
			}
			if(cnt > 0) {
				tempaggr.add(sum/cnt);
				this.ncols += 1;
			}
			break;
		default:
			return originalTS.dataStream;
		}
		
		return tempaggr;
	}

	public int getNcols() {
		return ncols;
	}

	public Map<Integer, String> getMatrixMap() {
		
		System.out.println("===============================");
		System.out.println("========= MATRIX MAP ==========");
		System.out.println("===============================");
		int cnt = 1;
		for(int i: matrixMap.keySet()) {
			System.out.println("Series "+cnt+"\t|  "+matrixMap.get(i));
			cnt++;
		}
		System.out.println("");
		
		return matrixMap;
	}

	public int getNseries() {
		return nseries;
	}

	public String getAggr() {
		return aggr;
	}
	
}
