package com.provider;

import java.util.HashMap;
import java.util.Map;

public class Helper {
	
		// Maps error names to error indicies.
	    protected Map<String, Integer> errorToIndex;
	    // Maps error index to error names.
	    protected Map<Integer, String> indexToError;
	    
	    public Helper() {
	    	errorToIndex = new HashMap<String, Integer>();
	        errorToIndex.put("mapee", 0);
	        errorToIndex.put("mae", 1);
	        errorToIndex.put("smape", 2);
	        errorToIndex.put("mape", 3);
	        errorToIndex.put("mase", 4);
	        indexToError = new HashMap<Integer, String>();
	        indexToError.put(0, "mapee");
	        indexToError.put(1, "mae");
	        indexToError.put(2, "smape");
	        indexToError.put(3, "mape");
	        indexToError.put(4, "mase");
	    }

		public String plValidate(String pl, boolean skip) {
			if(skip)
				return (pl.equalsIgnoreCase("null") || pl.equalsIgnoreCase("x"))? "": pl;
			else
				return (pl.equalsIgnoreCase("null") || pl.equalsIgnoreCase("x"))? "": ("|" + pl);
		}
		
		public String plValidate(String pl) {
			return (pl.equalsIgnoreCase("null") || pl.equalsIgnoreCase("x"))? "": ("|" + pl);
		}
		
		public boolean detectAnomaly(float forecast, float observed, HashMap<String, Float> threshold, float maseDenom) {
			// At detection time, the anomaly thresholds shouldn't all be 0.
	        Float threshSum = (float) 0.0;
	        for (Map.Entry<String, Float> entry : threshold.entrySet()) {
	            threshSum += Math.abs(entry.getValue());
	        }
	        
	        //calculate errors
	        Float[] errors = computeErrorMetrics(forecast, observed, maseDenom);
	        
	        if (observed != forecast &&
						threshSum > (float) 0.0 &&
						isAnomaly(errors, threshold) == true) {
				return true;
			} else {
				return false;
			}
		}
		
		// Computes the standard error metrics including MAE, sMAPE, MAPE, MASE.
	    private Float[] computeErrorMetrics(float expected, float actual, float maseDenom) {
	        float div = expected;
	        if (expected == (float) 0.0) {
	          div = (float) 0.0000000001;
	        }
	        
	        // Mean Absolute Error.
	        float mae = Math.abs(actual - expected);
	        // Symmetric Mean Absolute Error.
	        float smape = (200 * Math.abs(actual - expected)) / ((Math.abs(actual) + Math.abs(expected)) == 0 ? (float) 1.0 : (float) (Math.abs(actual) + Math.abs(expected)));
	        // Mean Absolute Percentage Error.
	        float mape = Math.abs(actual) == 0 ? (float) 0.0 : ((100 * Math.abs(actual - expected)) / (float) Math.abs(actual));
	        // Mean Absolute Scaled Error.
	        float mase = Math.abs(maseDenom) == 0.0 ? (float) 0.0 : Math.abs(actual - expected) / Math.abs(maseDenom);
	        // Mean Absolute Percentage Error (scaled by the expected value).
	        float mapee = (expected == actual) ? (float) 0.0 : Math.abs((100 * ((actual / div) - 1)));
	        
	        // Store all errors.
	        Float[] errors = new Float[5];
	        errors[0] = mapee;
	        errors[1] = mae;
	        errors[2] = smape;
	        errors[3] = mape;
	        errors[4] = mase;
	        
	        return errors;
	    }
	    
	    // Returns true this point is identified as a potential anomaly.
	    public boolean isAnomaly(Float[] errors, Map<String, Float> threshold) {
	        // Cycle through all available thresholds and return
	        // true if any of them matches.
	        for (Map.Entry<String, Float> entry : threshold.entrySet()) {
	            if (errorToIndex.containsKey(entry.getKey()) == true &&
	                Math.abs(errors[errorToIndex.get(entry.getKey())]) >= Math.abs(entry.getValue())) {
	                return true;
	            }
	        }
	        return false;
	    }
}
