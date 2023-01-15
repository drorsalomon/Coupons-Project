package com.coupons.userLogin;

import java.util.UUID;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import com.coupons.entities.Login;
import com.coupons.repository.LoginRepository;

@Component
public class UserLogin {

	private final LoginRepository loginRepository;

	UserLogin(@Autowired ApplicationContext context) {
		loginRepository = context.getBean(LoginRepository.class);
	}

	@Transactional
	public Login loginVerification(String email, String password) {

		if (loginRepository.findByEmailAndPassword(email, password).isPresent()) {
			String token = UUID.randomUUID().toString();
			loginRepository.findByEmailAndPassword(email, password).get().setLoginToken(token);
			loginRepository.save(loginRepository.findByEmailAndPassword(email, password).get());
			return loginRepository.findByEmailAndPassword(email, password).get();
		} else {
			return null;
		}
	}

	public void logout(String userToken) {
		loginRepository.findByLoginToken(userToken).get().setLoginToken(null);
		loginRepository.save(loginRepository.findByLoginToken(userToken).get());
	}
}