package com.coupons.dailyTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class dailyTask implements Runnable {
	
	private final dailyTaskPrints dtp;
	
	dailyTask(@Autowired ApplicationContext context)
	{dtp = context.getBean(dailyTaskPrints.class);}

	@Override
	public void run() {

		// long delay = 86400000;
		long delay = 0;

		try {
			Thread.sleep(delay);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		dtp.dailyTaskExecute();	
	}
}
