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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.json.JSONArray;
import org.json.JSONObject;

@Entity(name="companies")
public class Company {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="company_id")
	private int companyId;
	@Column(name="company_name")
	private String companyName;
	
	@OneToOne(targetEntity=Login.class, cascade=CascadeType.DETACH, fetch=FetchType.EAGER)
	@JoinColumn(name="company_login_id", referencedColumnName="login_id")
	Login companyLoginId;
	
	@OneToMany(cascade= CascadeType.PERSIST, fetch = FetchType.EAGER)
	@JoinColumn(name="coupon_comp_id", referencedColumnName="company_id")
	List<Coupon>companyCoupons = new ArrayList <>();

	public Company()
	{}	
	
	public Company(String companyName, Login companyLoginId, List<Coupon> companyCoupons) {
		super();
		this.companyName = companyName;
		this.companyLoginId = companyLoginId;
		this.companyCoupons = companyCoupons;
	}

	public int getCompanyId() {
		return companyId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}


	public Login getCompanyLoginId() {
		return companyLoginId;
	}

	public void setCompanyLoginId(Login companyLoginId) {
		this.companyLoginId = companyLoginId;
	}

	public List<Coupon> getCompanyCoupons() {
		return companyCoupons;
	}

	public void setCompanyCoupons(List<Coupon> companyCoupons) {
		this.companyCoupons = companyCoupons;
	}
	
	public JSONObject toJSON()
	{
		JSONObject company = new JSONObject();
		JSONArray jCompanyCoupons = new JSONArray();
		
		company.put("companyId", this.companyId);
		company.put("companyName", this.companyName);
		company.put("companyLoginId", this.companyLoginId);
		
		for(Coupon coupon : this.getCompanyCoupons())
		{
			jCompanyCoupons.put(coupon);
		}
		company.put("jCompanyCoupons", jCompanyCoupons);
		
		return company;
		
	}

	@Override
	public String toString() {
		return "Company Id = " + companyId + " // Company Name = " + companyName + " // Company Login Id: " 
				+ companyLoginId + " // Company Coupons = " + companyCoupons + "\n\n";
	}
	
}
