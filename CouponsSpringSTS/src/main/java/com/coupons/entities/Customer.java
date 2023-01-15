package com.coupons.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import org.json.JSONArray;
import org.json.JSONObject;

@Entity(name="customers")
public class Customer {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cust_id")
	private int customerId;
	@Column(name="cust_first_name")
	private String customerFirstName;
	@Column(name="cust_last_name")
	private String customerLastName;
	
	@OneToOne(targetEntity=Login.class, cascade=CascadeType.DETACH, fetch=FetchType.EAGER)
	@JoinColumn(name="cust_logid", referencedColumnName="login_id")
	Login customerLoginId;
	
	@ManyToMany(fetch=FetchType.EAGER)
	@JoinTable(name="customerscoupons", joinColumns=@JoinColumn(name="customer_id", referencedColumnName = "cust_id"), 
	inverseJoinColumns = @JoinColumn(name="custcoupon_id", referencedColumnName = "coupon_id"))
	List<Coupon>customerCoupons = new ArrayList <>();

	public Customer()
	{}
	
	public Customer(String customerFirstName, String customerLastName, Login customerLoginId, List<Coupon> customerCoupons) {
		super();
		this.customerFirstName = customerFirstName;
		this.customerLastName = customerLastName;
		this.customerLoginId = customerLoginId;
		this.customerCoupons = customerCoupons;
	}

	public int getCustomerId() {
		return customerId;
	}

	public String getCustomerFirstName() {
		return customerFirstName;
	}

	public void setCustomerFirstName(String customerFirstName) {
		this.customerFirstName = customerFirstName;
	}

	public String getCustomerLastName() {
		return customerLastName;
	}

	public void setCustomerLastName(String customerLastName) {
		this.customerLastName = customerLastName;
	}

	public Login getCustomerLoginId() {
		return customerLoginId;
	}

	public void setCustomerLoginId(Login custLogId) {
		this.customerLoginId = custLogId;
	}

	public List<Coupon> getCustomerCoupons() {
		return customerCoupons;
	}

	public void setCustomerCoupons(List<Coupon> customerCoupons) {
		this.customerCoupons = customerCoupons;
	}
	
	public JSONObject toJSON()
	{
		JSONObject customer = new JSONObject();
		JSONArray jCustomerCoupons = new JSONArray();
		
		customer.put("customerId", this.customerId);
		customer.put("customerFirstName", this.customerFirstName);
		customer.put("customerLastName", this.customerLastName);
		customer.put("customerLoginId", this.customerLoginId);
		
		for(Coupon coupon : this.getCustomerCoupons())
		{
			jCustomerCoupons.put(coupon);
		}
		customer.put("jCustomerCoupons", jCustomerCoupons);
		
		return customer;
	}

	@Override
	public String toString() {
		return "Customer Id = " + customerId + " // Customer First Name = " + customerFirstName + " // Customer Last Name = "
				+ customerLastName + " // Customer Login Id: " + customerLoginId
				+ " // Customer Coupons = " + customerCoupons + "\n\n";
	}
}
