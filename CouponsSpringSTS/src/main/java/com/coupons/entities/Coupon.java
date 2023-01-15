package com.coupons.entities;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import org.json.JSONObject;

@Entity(name="coupons")
public class Coupon {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="coupon_id")
	private int couponId;
	@Column(name="coupon_title")
	private String couponTitle;
	@Column(name="coupon_amount")
	private int couponAmount;
	@Column(name="price")
	private float couponPrice;
	@Column(name="coupon_description")
	private String couponDescription;
	@Column(name="coupon_exp_date")
	private Date couponExpirationDate;
	@Column(name="coupon_imagefile")
	private String couponImageFile;
	@Column(name="coupon_comp_id")
	private int couponCompanyId;
	@Column(name="coupon_category_id")
	private int couponCategoryId;
	
	@ManyToMany(mappedBy="customerCoupons")
	List<Customer>couponOwnedByCustomers = new ArrayList <>();

	public Coupon()
	{}
	
	public Coupon(int couponCategoryId)
	{}
	
	public Coupon(String couponTitle, int couponAmount, float couponPrice, String couponDescription,
			Date couponExpirationDate, String couponImageFile, int couponCompanyId,
			int couponCategoryId, List<Customer> couponOwnedByCustomers) {
		super();
		this.couponTitle = couponTitle;
		this.couponAmount = couponAmount;
		this.couponPrice = couponPrice;
		this.couponDescription = couponDescription;
		this.couponExpirationDate = couponExpirationDate;
		this.couponImageFile = couponImageFile;
		this.couponCompanyId = couponCompanyId;
		this.couponCategoryId = couponCategoryId;
		this.couponOwnedByCustomers = couponOwnedByCustomers;
	}

	public int getCouponId() {
		return couponId;
	}

	public String getCouponTitle() {
		return couponTitle;
	}

	public void setCouponTitle(String couponTitle) {
		this.couponTitle = couponTitle;
	}

	public int getCouponAmount() {
		return couponAmount;
	}

	public void setCouponAmount(int couponAmount) {
		this.couponAmount = couponAmount;
	}

	public float getCouponPrice() {
		return couponPrice;
	}

	public void setCouponPrice(float couponPrice) {
		this.couponPrice = couponPrice;
	}

	public String getCouponDescription() {
		return couponDescription;
	}

	public void setCouponDescription(String couponDescription) {
		this.couponDescription = couponDescription;
	}

	public Date getCouponExpirationDate() {
		return couponExpirationDate;
	}

	public void setCouponExpirationDate(Date couponExpirationDate) {
		this.couponExpirationDate = couponExpirationDate;
	}

	public String getCouponImageFile() {
		return couponImageFile;
	}

	public void setCouponImageFile(String couponImageFile) {
		this.couponImageFile = couponImageFile;
	}

	public int getCouponCompanyId() {
		return couponCompanyId;
	}

	public void setCouponCompanyId(int couponCompanyId) {
		this.couponCompanyId = couponCompanyId;
	}

	public int getCouponCategoryId() {
		return couponCategoryId;
	}

	public void setCouponCategoryId(int couponCategoryId) {
		this.couponCategoryId = couponCategoryId;
	}

	public List<Customer> getCouponOwnedByCustomers() {
		return couponOwnedByCustomers;
	}

	public void setCouponOwnedByCustomers(List<Customer> couponOwnedByCustomers) {
		this.couponOwnedByCustomers = couponOwnedByCustomers;
	}
	
	public JSONObject toJSON()
	{
		JSONObject coupon = new JSONObject();
		
		coupon.put("couponId", this.couponId);
		coupon.put("couponTitle", this.couponTitle);
		coupon.put("couponAmount", this.couponAmount);
		coupon.put("couponPrice", this.couponPrice);
		coupon.put("couponDescription", this.couponDescription);
		coupon.put("couponExpirationDate", this.couponExpirationDate);
		coupon.put("couponImageFile", this.couponImageFile);
		coupon.put("couponCompanyId", this.couponCompanyId);
		coupon.put("couponCategoryId", this.couponCategoryId);
		
		return coupon;
	}

	@Override
	public String toString() {
		
		return "Coupon Id = " + couponId + " // Coupon Title = " + couponTitle + " // Coupon Amount = " + couponAmount
				+ " // Coupon Price = " + couponPrice + " // Coupon Description = " + couponDescription
				+ " // Coupon Expiration Date = " + couponExpirationDate + " // Coupon Image File = " + couponImageFile
				+ " // Coupon Company Id = " + couponCompanyId + " // Coupon Category Id = "
				+ couponCategoryId + " ~~~~~~~~~~~~~ ";
	}
}