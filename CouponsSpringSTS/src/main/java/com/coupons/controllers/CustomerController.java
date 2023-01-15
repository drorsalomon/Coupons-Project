package com.coupons.controllers;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.coupons.components.CustomerFacade;
import com.coupons.entities.Coupon;

@Controller
public class CustomerController {

	private final CustomerFacade cf;

	CustomerController(@Autowired ApplicationContext context) {
		cf = context.getBean(CustomerFacade.class);
	}

	public Coupon exception() {
		return null;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/buyCoupon")
	@ResponseBody
	public String buyCoupon(@RequestParam String userToken, @RequestParam String title) {

		if (userToken.equalsIgnoreCase("") || title.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return cf.buyCoupon(userToken, title).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getAvailableCoupons")
	@ResponseBody
	public String getAvailableCoupons(@RequestParam String userToken) {

		if (userToken.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			JSONArray coupons = new JSONArray();

			for (Coupon coupon : cf.getAvailableCoupons(userToken)) {
				coupons.put(coupon.toJSON());
			}
			return coupons.toString();
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCustomerCoupons")
	@ResponseBody
	public String getCustomerCoupons(@RequestParam String userToken) {

		if (userToken.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			JSONArray coupons = new JSONArray();

			for (Coupon coupon : cf.getCustomerCoupons(userToken)) {
				coupons.put(coupon.toJSON());
			}
			return coupons.toString();
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCustomerCouponsByCategory")
	@ResponseBody
	public String getCustomerCouponsByCategory(@RequestParam String userToken, @RequestParam String category) {

		if (userToken.equalsIgnoreCase("") || category.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			JSONArray coupons = new JSONArray();

			for (Coupon coupon : cf.findCouponByCategoryForCustomer(userToken, category)) {
				coupons.put(coupon.toJSON());
			}
			return coupons.toString();
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCustomerCouponsByPrice")
	@ResponseBody
	public String getCustomerCouponsByMaxPrice(@RequestParam String userToken, @RequestParam String price) {

		if (userToken.equalsIgnoreCase("") || price.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			JSONArray coupons = new JSONArray();

			for (Coupon coupon : cf.findCouponByMaxPriceForCustomer(userToken, Float.parseFloat(price))) {
				coupons.put(coupon.toJSON());
			}
			return coupons.toString();
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCustomerDetails")
	@ResponseBody
	public String getCustomerDetails(@RequestParam String userToken) {

		if (userToken.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return cf.getCustomerDetails(userToken).toJSON().toString();
		}
	}
}