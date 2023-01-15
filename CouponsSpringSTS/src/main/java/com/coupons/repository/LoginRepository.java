package com.coupons.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.coupons.entities.Login;

public interface LoginRepository extends CrudRepository<Login, Integer>{
	
	Optional<Login> findByEmailAndPassword (String email, String password);
	Optional<Login> findByEmail (String email);
	Optional<Login> findByLoginToken (String loginToken);
}
