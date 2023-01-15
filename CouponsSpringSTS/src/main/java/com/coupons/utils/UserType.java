package com.coupons.utils;

public enum UserType {
	
	AD("AD"),
	CO("CO"),
	CU("CU");
	
	private String userType;
	
	UserType(final String userType)
	{
		this.userType = userType;
	}
}