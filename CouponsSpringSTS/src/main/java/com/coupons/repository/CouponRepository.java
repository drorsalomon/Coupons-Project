package com.coupons.repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.coupons.entities.Coupon;

public interface CouponRepository extends CrudRepository<Coupon, Integer>{
	
	Optional<Coupon> findByCouponTitle(String couponTitle);
	Optional<Coupon> findByCouponCompanyIdAndCouponTitle(Integer couponCompanyId, String couponTitle);
	List<Coupon> findBycouponExpirationDateBefore (Date couponExpirationDate);
	List<Coupon> findByCouponAmountGreaterThanAndCouponExpirationDateAfter (Integer couponAmount, Date couponExpirationDate);
	List<Coupon> findByCouponCompanyIdAndCouponPriceLessThanEqual (Integer couponCompanyId, Float couponPrice);
	List<Coupon> findByCouponCompanyIdAndCouponCategoryId(Integer couponCompanyId, Integer couponCategoryId);
}
