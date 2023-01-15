package com.coupons.utils;

public class DateUtils {
	
	public static int fixMonth(int month)
	{
		int newMonth = month - 1;
		return newMonth;
	}
	
	public static int fixYear(int year)
	{
		int newYear = year - 1900;
		return newYear;
	}
	

}
