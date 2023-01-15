package com.coupons.dailyTask;

import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.coupons.entities.Coupon;
import com.coupons.repository.CouponRepository;

@Component
public class dailyTaskFacade {
	
	private final CouponRepository couponRepository;
	
	dailyTaskFacade(@Autowired ApplicationContext context)
	{couponRepository = context.getBean(CouponRepository.class);}
	
	public List<Coupon> findCouponsByExpirationDate(Date couponExpirationDate)
	{
		return couponRepository.findBycouponExpirationDateBefore(couponExpirationDate);		
	}

}
