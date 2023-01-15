package com.coupons.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.coupons.components.CompanyFacade;
import com.coupons.entities.Coupon;

@Controller
public class CompanyController {

	private final CompanyFacade cf;

	CompanyController(@Autowired ApplicationContext context) {
		cf = context.getBean(CompanyFacade.class);
	}

	public Coupon exception() {
		return null;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/addCoupon")
	@ResponseBody
	public String addCoupon(@RequestParam String userToken, @RequestParam String title, @RequestParam String category,
			@RequestParam String amount, @RequestParam String price, @RequestParam String description,
			@RequestParam String date, @RequestParam String img) {

		java.sql.Date currentDate = java.sql.Date.valueOf(LocalDate.now());

		// parse from String to java.util.Date
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date parsed = null;
		try {
			parsed = format.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		// Parse from java.util.date to java.sql.date
		java.sql.Date expDate = new java.sql.Date(parsed.getTime());

		if (expDate.before(currentDate) || userToken.equalsIgnoreCase("") || title.equalsIgnoreCase("")
				|| category.equalsIgnoreCase("") || amount.equalsIgnoreCase("") || price.equalsIgnoreCase("")
				|| description.equalsIgnoreCase("") || date.equalsIgnoreCase("") || img.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return cf.createCoupon(userToken, title, category, Integer.parseInt(amount), Float.parseFloat(price),
					description, expDate, img).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/updateCoupon")
	@ResponseBody
	public String updateCoupon(@RequestParam String userToken, @RequestParam String id, @RequestParam String title,
			@RequestParam String category, @RequestParam String amount, @RequestParam String price,
			@RequestParam String description, @RequestParam String date, @RequestParam String img) {

		if (id.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		}

		if (userToken.equalsIgnoreCase("")) {
				return exception().toJSON().toString();	
		}
		if (!date.equalsIgnoreCase("")) {

			java.sql.Date currentDate = java.sql.Date.valueOf(LocalDate.now());

			// parse from String to java.util.Date
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date parsed = null;
			try {
				parsed = format.parse(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			// Parse from java.util.date to java.sql.date
			java.sql.Date expDate = new java.sql.Date(parsed.getTime());

			if (expDate.before(currentDate)) {
				return exception().toJSON().toString();
			} else {
				return cf.updateCoupon(userToken, Integer.parseInt(id), title, category, Integer.parseInt(amount),
						Integer.parseInt(price), description, expDate, img).toJSON().toString();
			}
		} else {
			java.sql.Date expDate = cf.getCouponExpDate(Integer.parseInt(id));
			return cf.updateCoupon(userToken, Integer.parseInt(id), title, category, Integer.parseInt(amount),
					Float.parseFloat(price), description, expDate, img).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/deleteCoupon")
	@ResponseBody
	public String deleteCoupon(@RequestParam String userToken, @RequestParam String id) {

		if (userToken.equalsIgnoreCase("") || id.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return cf.deleteCompanyCoupon(Integer.parseInt(id), userToken).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCompanyCoupons")
	@ResponseBody
	public String getCompanyCoupons(@RequestParam String userToken) {

		if (userToken.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			JSONArray coupons = new JSONArray();
			for (Coupon coupon : cf.getCompanyCoupons(userToken)) {
				coupons.put(coupon.toJSON());
			}
			return coupons.toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCompanyCouponsByCategory")
	@ResponseBody
	public String getCompanyCouponsByCategory(@RequestParam String userToken, @RequestParam String category) {

		if (userToken.equalsIgnoreCase("") || category.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			JSONArray coupons = new JSONArray();
			for (Coupon coupon : cf.findCouponByCategoryForCompany(userToken, category)) {
				coupons.put(coupon.toJSON());
			}
			return coupons.toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCompanyCouponsByPrice")
	@ResponseBody
	public String getCompanyCouponsByPrice(@RequestParam String userToken, @RequestParam String price) {

		if (userToken.equalsIgnoreCase("") || price.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			JSONArray coupons = new JSONArray();
			for (Coupon coupon : cf.findCouponByMaxPriceForCompany(userToken, Float.parseFloat(price))) {
				coupons.put(coupon.toJSON());
			}
			return coupons.toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCompanyDetails")
	@ResponseBody
	public String getCompanyDetails(@RequestParam String userToken) {

		if (userToken.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return cf.getCompanyDetails(userToken).toJSON().toString();
		}
	}
}