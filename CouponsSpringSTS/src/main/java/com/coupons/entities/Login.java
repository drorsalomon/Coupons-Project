package com.coupons.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.json.JSONObject;

@Entity(name = "logins")
public class Login {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "login_id")
	private int loginId;
	@Column(name = "email")
	private String email;
	@Column(name = "pwd")
	private String password;
	@Column(name = "login_user_type")
	private String logInUserType;
	@Column(name = "login_token")
	private String loginToken;

	public Login() {
	}

	public Login(String email, String password, String logInUserType, String loginToken) {
		super();
		this.email = email;
		this.password = password;
		this.logInUserType = logInUserType;
		this.loginToken = loginToken;
	}

	public int getLoginId() {
		return loginId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLogInUserType() {
		return logInUserType;
	}

	public void setLogInUserType(String logInUserType) {
		this.logInUserType = logInUserType;
	}

	public String getLoginToken() {
		return loginToken;
	}

	public void setLoginToken(String loginToken) {
		this.loginToken = loginToken;
	}

	public JSONObject toJSON() {
		JSONObject login = new JSONObject();

		login.put("logInUserType", this.logInUserType);
		login.put("loginToken", this.loginToken);

		return login;
	}

	@Override
	public String toString() {
		return " Login Id = " + loginId + " // Email = " + email + " // Login User Type = " + logInUserType + "\n\n";
	}
}