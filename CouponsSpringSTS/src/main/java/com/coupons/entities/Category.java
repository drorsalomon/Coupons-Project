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

import org.json.JSONArray;
import org.json.JSONObject;

@Entity(name="categories")
public class Category {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="category_id")
	private int categoryId;
	@Column(name="category_desc")
	private String categoryDescription;
	
	@OneToMany(cascade= CascadeType.PERSIST, fetch = FetchType.EAGER)
	@JoinColumn(name="coupon_category_id",  referencedColumnName="category_id")
	List<Coupon>categoryCoupons = new ArrayList <>();


	public Category()
	{}
	
	public Category(int categoryId, String categoryDescription,
			List<Coupon> categoryCoupons) {
		super();
		this.categoryId = categoryId;
		this.categoryDescription = categoryDescription;
		this.categoryCoupons = categoryCoupons;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryDescription() {
		return categoryDescription;
	}

	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}

	public List<Coupon> getCategoryCoupons() {
		return categoryCoupons;
	}

	public void setCategoryCoupons(List<Coupon> categoryCoupons) {
		this.categoryCoupons = categoryCoupons;
	}
	
	public JSONObject toJSON()
	{
		JSONObject category = new JSONObject();
		JSONArray jCategoryCoupons = new JSONArray();
		
		category.put("categoryId", this.categoryId);
		category.put("categoryDescription", this.categoryDescription);

		for(Coupon coupon : this.getCategoryCoupons())
		{
			jCategoryCoupons.put(coupon.toJSON());
		}
		category.put("jCategoryCoupons", jCategoryCoupons);
		
		return category;
	}

	@Override
	public String toString() {
		return "Category Id = " + categoryId + " // Category Description = " + categoryDescription
				+ " // Category Coupons=" + categoryCoupons + "\n\n";
	}

}
