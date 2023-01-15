package com.coupons.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.coupons.entities.Company;
import com.coupons.entities.Login;

public interface CompanyRepository extends CrudRepository<Company, Integer>{
	
	Optional<Company> findByCompanyName (String companyName);
	Optional<Company> findByCompanyLoginId (Login companyLoginId);
	

}
