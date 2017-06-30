package com.redis.trigger;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;
import java.nio.channels.OverlappingFileLockException;
import java.util.concurrent.TimeUnit;

import org.apache.http.ParseException;

import com.redis.updater.*;

public class Launch {

	public static void main(String[] args) {
		try {
			
			File file = new File("access.lck");
			FileLock lock = null;
	        RandomAccessFile raf = new RandomAccessFile(file, "rw");
	        FileChannel channel = raf.getChannel();
			
	        try {
	        	lock = channel.tryLock();
				//============ CONFIGURABLE ==============
				int numberOfSimultaneousExecutions = 4;
				//============ CONFIGURABLE ==============
				
				java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newFixedThreadPool(numberOfSimultaneousExecutions);
			    
				//currently support expansion of up-to 8 parallel threads for redisUpdateHandler
			    for (int i=0; i<numberOfSimultaneousExecutions; i++) {
			        switch(i) {
			        case 0: executor.execute(new Runnable() {
					            @Override
					            public void run() {
					                Executor.main(1, args);
					            }
					        });
			        		break;
			        case 1: executor.execute(new Runnable() {
					            @Override
					            public void run() {
					                Executor.main(2, args);
					            }
					        });
			        		break;
			        case 2: executor.execute(new Runnable() {
					            @Override
					            public void run() {
					                Executor.main(3, args);
					            }
					        });
			        		break;
			        case 3: executor.execute(new Runnable() {
					            @Override
					            public void run() {
					                Executor.main(4, args);
					            }
					        });
			        		break;
			        case 4: executor.execute(new Runnable() {
					            @Override
					            public void run() {
					                Executor.main(5, args);
					            }
					        });
			        		break;
			        case 5: executor.execute(new Runnable() {
					            @Override
					            public void run() {
					                Executor.main(6, args);
					            }
					        });
			        		break;
			        case 6: executor.execute(new Runnable() {
					            @Override
					            public void run() {
					                Executor.main(7, args);
					            }
					        });
			        		break;
			        case 7: executor.execute(new Runnable() {
					            @Override
					            public void run() {
					                Executor.main(8, args);
					            }
					        });
			        		break;
			        }
			    }
			    
			    try {
			    	executor.shutdown();
			    	executor.awaitTermination(20, TimeUnit.SECONDS);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
	        } catch (OverlappingFileLockException e) {
				e.printStackTrace();
		    }
	        
	        //============ CLEANUP ==============
	        if( lock != null ) {
	            lock.release();
	        }
	        
	        raf.close();
	        channel.close();
	        //============ CLEANUP ==============
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
}
