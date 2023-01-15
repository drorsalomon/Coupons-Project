package com.coupons.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;

import com.coupons.CouponsAngularApplication;

public class PrintUtils {

	public static String getStringFromUser() {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		try {
			return br.readLine();
		} catch (IOException e) {
			return null;
		}
	}
	
	public static char getCharFromUser() {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		try {
			return br.readLine().charAt(0);
		} catch (IOException StringIndexOutOfBoundsException) {
			return  (Character) null;
		}
	}
	
	public static int getIntFromUser() {
		return Integer.parseInt(getStringFromUser());
	}
	
	public static long getLongFromUser() {
		return Long.parseLong(getStringFromUser());
	}

	public static float getFloatFromUser() {
		return Float.parseFloat(getStringFromUser());
	}

	public static double getDoubleFromUser() {
		return Double.parseDouble(getStringFromUser());
	}
	
	public static void AddEmptyLines(int iiNumOflLnes) {
		if (CouponsAngularApplication.UseCon()) {
			if (iiNumOflLnes < 1)
				iiNumOflLnes = 1;

			for (int i = 0; i < iiNumOflLnes; i++) {
				PrintToScreen("            ");
			}
		}

	}
	

	public static void PrintToScreen(String message) {

		if (CouponsAngularApplication.UseCon())
			System.out.println(message);

	} 
}