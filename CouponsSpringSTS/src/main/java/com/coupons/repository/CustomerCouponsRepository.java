package com.coupons.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.coupons.entities.CustomerCoupons;

public interface CustomerCouponsRepository extends CrudRepository<CustomerCoupons, Integer> {
	
	List<CustomerCoupons> findByCustomerId(Integer customerId);
	Optional<CustomerCoupons> findByCustomerIdAndCustomerCouponId(Integer customerId, Integer customerCouponId);
}
