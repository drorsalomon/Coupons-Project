package com.coupons.entities;

import java.io.Serializable;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import org.json.JSONObject;

@IdClass(CustomerCoupons.class)
@Entity(name="customerscoupons")
public class CustomerCoupons implements Serializable{
	
	private static final long serialVersionUID = -8423399107545211981L;
	
	@Id
	@Column(name="customer_id")
	private int customerId;
	@Id
	@Column(name="custcoupon_id")
	private int customerCouponId;
	@Column(name="purchase_date")
	private Date couponPurchaseDate;
	
	public CustomerCoupons()
	{}
	
	public CustomerCoupons(int customerId, int customerCouponId, Date couponPurchaseDate) {
		super();
		this.customerCouponId = customerCouponId;
		this.couponPurchaseDate = couponPurchaseDate;
		this.customerId = customerId;
	}

	public int getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public int getCustomerCouponId() {
		return customerCouponId;
	}

	public void setCustomerCouponId(int customerCouponId) {
		this.customerCouponId = customerCouponId;
	}

	public Date getCouponPurchaseDate() {
		return couponPurchaseDate;
	}

	public void setCouponPurchaseDate(Date couponPurchaseDate) {
		this.couponPurchaseDate = couponPurchaseDate;
	}
	
	public JSONObject toJSON()
	{
		JSONObject customerCoupons = new JSONObject();
		
		customerCoupons.put("customerId", this.customerId);
		customerCoupons.put("customerCouponId", this.customerCouponId);
		customerCoupons.put("couponPurchaseDate", this.couponPurchaseDate);
		
		return customerCoupons;
	}


	@Override
	public String toString() {
		return "Customer Id = " + customerId + " // Customer Coupon Id = " + customerCouponId
				+ " // Coupon Purchase Date = " + couponPurchaseDate + "\n\n";
	}

}
