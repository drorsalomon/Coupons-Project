package com.coupons;

import java.util.concurrent.TimeUnit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import com.coupons.dailyTask.dailyTask;

@SpringBootApplication
public class CouponsAngularApplication {
	
	protected static boolean bUseCon = true; // Allow printing to console
	public static dailyTask dt;

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(CouponsAngularApplication.class, args);
		dt = context.getBean(dailyTask.class);
		
		Thread t1 = new Thread(dt); 
		t1.start();
			
		try {
			TimeUnit.SECONDS.sleep(1);
		} catch (InterruptedException e1) {
			e1.printStackTrace();
		}

			System.out.println("\n");
			System.out.println("***Server connected***");		
			
	}
	

	public static boolean UseCon() {

		return bUseCon;
	}
}