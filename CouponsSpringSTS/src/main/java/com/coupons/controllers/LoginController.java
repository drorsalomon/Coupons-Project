package com.coupons.controllers;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.coupons.entities.Login;
import com.coupons.userLogin.UserLogin;

@Controller
public class LoginController {

	private static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern
			.compile("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$");

	private final UserLogin ul;

	private LoginController(@Autowired ApplicationContext context) {
		ul = context.getBean(UserLogin.class);
	}

	public static boolean validate(String emailStr) {
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
		return matcher.find();
	}

	public Login exception() {
		return null;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/loginCheck")
	@ResponseBody
	public String loginCheck(@RequestParam String email, @RequestParam String password) {
		if (email.equalsIgnoreCase("") || password.equalsIgnoreCase("") || validate(email) == false) {
			return exception().toJSON().toString();
		} else {
			return ul.loginVerification(email, password).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/userLogout")
	@ResponseBody
	public void userLogout(@RequestParam String email) {
		ul.logout(email);
	}
}