package com.coupons.controllers;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.coupons.components.AdminFacade;
import com.coupons.entities.Company;
import com.coupons.entities.Customer;

@Controller
public class AdminController {

	private static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern
			.compile("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$");

	private final AdminFacade af;

	private AdminController(@Autowired ApplicationContext context) {
		af = context.getBean(AdminFacade.class);
	}

	public static boolean validate(String emailStr) {
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
		return matcher.find();
	}

	public Company exception() {
		return null;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/addCompany")
	@ResponseBody
	public String addCompany(@RequestParam String compEmail, @RequestParam String compPassword,
			@RequestParam String compName) {
		if (compEmail.equalsIgnoreCase("") || compPassword.equalsIgnoreCase("") || compName.equalsIgnoreCase("")
				|| validate(compEmail) == false) {
			return exception().toJSON().toString();
		} else {
			return af.createCompany(compEmail, compPassword, compName).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/updateCompany")
	@ResponseBody
	public String updateCompany(@RequestParam String compId, @RequestParam String compEmail,
			@RequestParam String compPassword) {

		if (compId.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		}
		if (!compEmail.equalsIgnoreCase("")) {

			if (validate(compEmail) == false) {
				return exception().toJSON().toString();
			}
		}
		return af.updateCompany(Integer.parseInt(compId), compEmail, compPassword).toJSON().toString();
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/deleteCompany")
	@ResponseBody
	public String deleteCompany(@RequestParam String compId) {

		if (compId.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return af.deleteCompany(Integer.parseInt(compId)).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCompanies")
	@ResponseBody
	public String getCompanies() {

		JSONArray companies = new JSONArray();
		for (Company comp : af.getCompanies()) {
			companies.put(comp.toJSON());
		}
		return companies.toString();
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCompanyById")
	@ResponseBody
	public String getCompanyById(@RequestParam String compId) {

		if (compId.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return af.getCompanyById(Integer.parseInt(compId)).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/addCustomer")
	@ResponseBody
	public String addCustomer(@RequestParam String custEmail, @RequestParam String custPassword,
			@RequestParam String custName, @RequestParam String custLastName) {

		if (custEmail.equalsIgnoreCase("") || custPassword.equalsIgnoreCase("") || custName.equalsIgnoreCase("")
				|| custLastName.equalsIgnoreCase("") || validate(custEmail) == false) {
			return exception().toJSON().toString();
		} else {
			return af.createCustomer(custEmail, custPassword, custName, custLastName).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/updateCustomer")
	@ResponseBody
	public String updateCustomer(@RequestParam String custId, @RequestParam String custEmail,
			@RequestParam String custPassword, @RequestParam String custName, @RequestParam String custLastName) {

		if (custId.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		}

		if (!custEmail.equalsIgnoreCase("")) {
			if (validate(custEmail) == false) {
				return exception().toJSON().toString();
			}
		}
		return af.updateCustomer(Integer.parseInt(custId), custEmail, custPassword, custName, custLastName).toJSON()
				.toString();
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/deleteCustomer")
	@ResponseBody
	public String deleteCustomer(@RequestParam String custId) {

		if (custId.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return af.deleteCustomer(Integer.parseInt(custId)).toJSON().toString();
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCustomers")
	@ResponseBody
	public String getCustomers() {

		JSONArray customers = new JSONArray();
		for (Customer cust : af.getCustomers()) {
			customers.put(cust.toJSON());
		}
		return customers.toString();
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("couponSystem/getCustomerById")
	@ResponseBody
	public String getCustomerById(@RequestParam String custId) {

		if (custId.equalsIgnoreCase("")) {
			return exception().toJSON().toString();
		} else {
			return af.getCustomerById(Integer.parseInt(custId)).toJSON().toString();
		}
	}
}