package com.coupons.components;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import com.coupons.entities.Coupon;
import com.coupons.entities.Customer;
import com.coupons.entities.CustomerCoupons;
import com.coupons.repository.CouponRepository;
import com.coupons.repository.CustomerCouponsRepository;
import com.coupons.repository.CustomerRepository;
import com.coupons.repository.LoginRepository;

@Component
public class CustomerFacade {

	private final CustomerCouponsRepository customerCouponsRepository;
	private final CustomerRepository customerRepository;
	private final CouponRepository couponRepository;
	private final LoginRepository loginRepository;

	public CustomerFacade(@Autowired ApplicationContext context) {
		customerRepository = context.getBean(CustomerRepository.class);
		customerCouponsRepository = context.getBean(CustomerCouponsRepository.class);
		couponRepository = context.getBean(CouponRepository.class);
		loginRepository = context.getBean(LoginRepository.class);
	}

	@Transactional
	public Coupon buyCoupon(String userToken, String couponTitle) {
		Date currentDate = Date.valueOf(LocalDate.now());
		CustomerCoupons customerCoupons = new CustomerCoupons();
		// if the coupon exists and isen't owned by the customer
		if (!couponRepository.findByCouponTitle(couponTitle).isPresent()
				|| customerRepository.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get()).get()
						.getCustomerCoupons().contains(couponRepository.findByCouponTitle(couponTitle).get())) {
			return null;
		} else {
			// update customerCoupons table
			customerCoupons.setCustomerCouponId(couponRepository.findByCouponTitle(couponTitle).get().getCouponId());
			customerCoupons.setCustomerId(customerRepository
					.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCustomerId());

			// Reduce coupon amount by 1
			couponRepository.findByCouponTitle(couponTitle).get()
					.setCouponAmount(couponRepository.findByCouponTitle(couponTitle).get().getCouponAmount() - 1);

			customerCoupons.setCouponPurchaseDate(currentDate);
			customerCouponsRepository.save(customerCoupons);

			return couponRepository.findByCouponTitle(couponTitle).get();
		}
	}

	public List<Coupon> getAvailableCoupons(String userToken) {

		Date currentDate = Date.valueOf(LocalDate.now());

		// creating an ArrayList to work with
		ArrayList<Coupon> filteredCoupons = new ArrayList<>();

		// adding coupons that are not expired or have 0 amount to the ArrayList
		for (Coupon coupon : getAvailableCouponsList(0, currentDate)) {
			filteredCoupons.add(coupon);
		}
		ArrayList<Coupon> availableCoupons = new ArrayList<>();

		// filtering out coupons that are already owned by the customer
		for (Coupon Coupon : filteredCoupons) {

			if (!customerRepository.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get()).get()
					.getCustomerCoupons().contains(Coupon)) {
				availableCoupons.add(Coupon);
			}
		}
		if (availableCoupons.isEmpty()) {
			return null;
		} else {
			return availableCoupons;
		}
	}

	public List<Coupon> getCustomerCoupons(String userToken) {
		if (customerRepository.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get()).get()
				.getCustomerCoupons().isEmpty()) {
			return null;
		} else {
			return customerRepository.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get()).get()
					.getCustomerCoupons();
		}
	}

	public List<Coupon> findCouponByCategoryForCustomer(String userToken, String category) {

		int categoryId = 0;
		switch (category) {
		case "beer":
			categoryId = 1;
			break;
		case "food":
			categoryId = 2;
			break;
		case "vacation":
			categoryId = 3;
			break;
		case "clothing":
			categoryId = 4;
			break;
		case "appliances":
			categoryId = 5;
		}
		ArrayList<Coupon> couponsByCategory = new ArrayList<>();

		for (Coupon coupon : customerRepository.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get())
				.get().getCustomerCoupons()) {

			if (coupon.getCouponCategoryId() == categoryId) {
				couponsByCategory.add(coupon);
			}
		}
		if (couponsByCategory.isEmpty()) {
			return null;
		} else {
			return couponsByCategory;
		}
	}

	public List<Coupon> findCouponByMaxPriceForCustomer(String userToken, Float couponMaxPrice) {

		ArrayList<Coupon> couponsByMaxPrice = new ArrayList<>();

		for (Coupon coupon : customerRepository.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get())
				.get().getCustomerCoupons()) {

			if (coupon.getCouponPrice() <= couponMaxPrice) {
				couponsByMaxPrice.add(coupon);
			}
		}
		if (couponsByMaxPrice.isEmpty()) {
			return null;
		} else {
			return couponsByMaxPrice;
		}
	}

	public Customer getCustomerDetails(String userToken) {
		if (customerRepository.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get()).isPresent()) {
			return customerRepository.findByCustomerLoginId(loginRepository.findByLoginToken(userToken).get()).get();
		} else {

			return null;
		}
	}

	public List<Coupon> getAvailableCouponsList(Integer couponAmount, Date couponExpirationDate) {
		if (couponRepository
				.findByCouponAmountGreaterThanAndCouponExpirationDateAfter(couponAmount, couponExpirationDate)
				.isEmpty()) {
			return null;
		} else {
			return couponRepository.findByCouponAmountGreaterThanAndCouponExpirationDateAfter(couponAmount,
					couponExpirationDate);
		}
	}
}