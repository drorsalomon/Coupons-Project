package com.coupons.utils;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public class utils {
	
	protected static String  sDateFormat = "dd-MM-yyyy HH:mm:ss" ;

	public utils()
	{}	
		
	static public  LocalDateTime GetCurrDateTime()
	{
	
		LocalDateTime myDateObj= LocalDateTime.now(); 
		
	    return myDateObj ; 
    
	}
	
	static public  LocalDateTime GetDateTimebystring( String  isDateTime , String isFormat ) 
	{
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(isFormat);
		LocalDateTime myDateObj= LocalDateTime.parse(isDateTime, formatter);
		return 	myDateObj ;	
    
	}
	
	static public  String GetstringfromDateTimeby( LocalDateTime ldt , String isFormat ) 
	{
		String sdatetime = "" ; 
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(isFormat);

		sdatetime = ldt.format(dtf); 
		
		return 	sdatetime ;	
	    
	}
	
	public static String GetCharString( int numofchars , char chr )
	{
		
		String sStr = "" ;
		
		for ( int i = 0 ; i < numofchars ; i++ ) 
		{
		
		  sStr += String.valueOf(chr);
		  
		}  
		
		return sStr ;
		
	}
	
	public static Boolean CheckEmail ( String isEmail) 
	{
			
		return(isEmail.contains("@") && isEmail.contains(".")) ; 
		
	}
}