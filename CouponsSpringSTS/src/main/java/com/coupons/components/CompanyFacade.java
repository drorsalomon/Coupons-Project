
package com.coupons.components;

import java.sql.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import com.coupons.entities.Company;
import com.coupons.entities.Coupon;
import com.coupons.repository.CompanyRepository;
import com.coupons.repository.CouponRepository;
import com.coupons.repository.LoginRepository;

@Component
public class CompanyFacade {

	private final CompanyRepository companyRepository;
	private final CouponRepository couponRepository;
	private final LoginRepository loginRepository;

	CompanyFacade(@Autowired ApplicationContext context) {
		companyRepository = context.getBean(CompanyRepository.class);
		couponRepository = context.getBean(CouponRepository.class);
		loginRepository = context.getBean(LoginRepository.class);
	}

	@Transactional
	public Coupon createCoupon(String userToken, String title, String category, int amount, float price,
			String description, Date expDate, String imgPath) {
		Coupon coupon = new Coupon();

		// check if the coupon title dosen't exists for this company
		if (couponRepository
				.findByCouponCompanyIdAndCouponTitle(companyRepository
						.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCompanyId(), title)
				.isPresent()) {
			return null;
		} else {
			coupon.setCouponTitle(title);
		}

		switch (category) {
		case "beer":
			coupon.setCouponCategoryId(1);
			break;
		case "food":
			coupon.setCouponCategoryId(2);
			break;
		case "vacation":
			coupon.setCouponCategoryId(3);
			break;
		case "clothing":
			coupon.setCouponCategoryId(4);
			break;
		case "appliances":
			coupon.setCouponCategoryId(5);
		}

		coupon.setCouponAmount(amount);
		coupon.setCouponPrice(price);
		coupon.setCouponDescription(description);
		coupon.setCouponExpirationDate(expDate);
		coupon.setCouponImageFile(imgPath);
		coupon.setCouponCompanyId(companyRepository.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get())
				.get().getCompanyId());
		// save coupon in company coupon list
		companyRepository.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCompanyCoupons()
				.add(coupon);

		couponRepository.save(coupon);

		return coupon;
	}

	@Transactional
	public Coupon updateCoupon(String userToken, int id, String title, String category, int amount, float price,
			String description, Date expDate, String imgPath) {

		// check if the coupon title dosen't exists for this company
		if (title != "") {
			if (couponRepository.findByCouponCompanyIdAndCouponTitle(companyRepository
					.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCompanyId(), title)
					.isPresent()) {
				return null;
			} else {
				couponRepository.findById(id).get().setCouponTitle(title);
			}
		}
		if (category != "") {
			switch (category) {
			case "beer":
				couponRepository.findById(id).get().setCouponCategoryId(1);
				break;
			case "food":
				couponRepository.findById(id).get().setCouponCategoryId(2);
				break;
			case "vacation":
				couponRepository.findById(id).get().setCouponCategoryId(3);
				break;
			case "clothing":
				couponRepository.findById(id).get().setCouponCategoryId(4);
				break;
			case "appliances":
				couponRepository.findById(id).get().setCouponCategoryId(5);
			}
		}
		if (amount != 0) {
			couponRepository.findById(id).get().setCouponAmount(amount);
		}
		if (price != 0) {
			couponRepository.findById(id).get().setCouponPrice(price);
		}
		if (description != "") {
			couponRepository.findById(id).get().setCouponDescription(description);
		}
		if (expDate != null) {
			couponRepository.findById(id).get().setCouponExpirationDate(expDate);
		}
		if (imgPath != "") {
			couponRepository.findById(id).get().setCouponImageFile(imgPath);
		}
		// save coupon in company coupon list
		companyRepository.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCompanyCoupons()
				.add(couponRepository.findById(id).get());

		couponRepository.save(couponRepository.findById(id).get());

		return couponRepository.findById(id).get();
	}

	public Company deleteCompanyCoupon(int id, String userToken) {

		if (couponRepository.findById(id).isPresent()) {
			couponRepository.delete(couponRepository.findById(id).get());
			return companyRepository.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get();
		} else {
			return null;
		}
	}

	public List<Coupon> getCompanyCoupons(String userToken) {
		if (companyRepository.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get()
				.getCompanyCoupons().isEmpty()) {
			return null;
		} else {
			return companyRepository.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get()
					.getCompanyCoupons();
		}
	}

	public List<Coupon> findCouponByCategoryForCompany(String userToken, String category) {

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
		if (couponRepository.findByCouponCompanyIdAndCouponCategoryId(companyRepository
				.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCompanyId(), categoryId)
				.isEmpty()) {
			return null;
		} else {
			return couponRepository.findByCouponCompanyIdAndCouponCategoryId(companyRepository
					.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCompanyId(),
					categoryId);
		}
	}

	public List<Coupon> findCouponByMaxPriceForCompany(String userToken, Float couponMaxPrice) {
		if (couponRepository.findByCouponCompanyIdAndCouponPriceLessThanEqual(companyRepository
				.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCompanyId(),
				couponMaxPrice).isEmpty()) {
			return null;
		} else {
			return couponRepository.findByCouponCompanyIdAndCouponPriceLessThanEqual(companyRepository
					.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get().getCompanyId(),
					couponMaxPrice);
		}
	}

	public Company getCompanyDetails(String userToken) {

		if (companyRepository.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).isPresent()) {
			return companyRepository.findByCompanyLoginId(loginRepository.findByLoginToken(userToken).get()).get();
		} else {
			return null;
		}
	}

	public Date getCouponExpDate(int id) {
		return couponRepository.findById(id).get().getCouponExpirationDate();
	}

	public void deleteCoupon(Coupon coupon) {

		couponRepository.delete(coupon);
	}
}