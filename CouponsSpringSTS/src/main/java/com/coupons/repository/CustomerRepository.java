package com.coupons.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.coupons.entities.Customer;
import com.coupons.entities.Login;

public interface CustomerRepository extends CrudRepository<Customer, Integer>{
	
	Optional<Customer> findByCustomerLoginId (Login customerLoginId);

}
