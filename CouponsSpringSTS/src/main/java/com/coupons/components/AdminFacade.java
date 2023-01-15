package com.coupons.components;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import com.coupons.entities.Company;
import com.coupons.entities.Customer;
import com.coupons.entities.Login;
import com.coupons.repository.CompanyRepository;
import com.coupons.repository.CustomerCouponsRepository;
import com.coupons.repository.CustomerRepository;
import com.coupons.repository.LoginRepository;
import com.coupons.utils.UserType;

@Component
public class AdminFacade {

	private final CustomerRepository customerRepository;
	private final CompanyRepository companyRepository;
	private final LoginRepository loginRepository;
	private final CustomerCouponsRepository customerCouponRepository;

	public AdminFacade(@Autowired ApplicationContext context) {
		customerRepository = context.getBean(CustomerRepository.class);
		companyRepository = context.getBean(CompanyRepository.class);
		loginRepository = context.getBean(LoginRepository.class);
		customerCouponRepository = context.getBean(CustomerCouponsRepository.class);
	}

	@Transactional
	public Company createCompany(String compEmail, String compPassword, String compName) {
		Login login = new Login();
		Company company = new Company();

		if (loginRepository.findByEmail(compEmail).isPresent()
				|| companyRepository.findByCompanyName(compName).isPresent()) {
			return null;
		} else {
			login.setEmail(compEmail);
			login.setPassword(compPassword);
			login.setLogInUserType(UserType.CO.toString());
			company.setCompanyName(compName);
			company.setCompanyLoginId(login);
			loginRepository.save(login);
			companyRepository.save(company);
			return company;
		}
	}

	@Transactional
	public Company updateCompany(int compId, String compEmail, String compPassword) {
		if (loginRepository.findByEmail(compEmail).isPresent()) {
			return null;
		} else {
			if (compEmail != "") {
				companyRepository.findById(compId).get().getCompanyLoginId().setEmail(compEmail);
			}
			if (compPassword != "") {
				companyRepository.findById(compId).get().getCompanyLoginId().setPassword(compPassword);
			}
			companyRepository.save(companyRepository.findById(compId).get());
			return companyRepository.findById(compId).get();
		}
	}

	public Company deleteCompany(int compId) {
		if (companyRepository.findById(compId).isPresent()) {
			loginRepository.delete(loginRepository
					.findByEmail(companyRepository.findById(compId).get().getCompanyLoginId().getEmail()).get());
			return companyRepository.findById(compId).get();
		} else {
			return null;
		}
	}

	public Iterable<Company> getCompanies() {
		if (companyRepository.count() != 0) {
			return companyRepository.findAll();
		} else {
			return null;
		}
	}

	public Company getCompanyById(int compId) {
		if (companyRepository.findById(compId).isPresent()) {
			return companyRepository.findById(compId).get();
		} else {
			return null;
		}
	}

	public Customer createCustomer(String custEmail, String custPassword, String custName, String custLastName) {
		Login login = new Login();
		Customer customer = new Customer();

		if (loginRepository.findByEmail(custEmail).isPresent()) {
			return null;
		} else {
			login.setEmail(custEmail);
			login.setPassword(custPassword);
			login.setLogInUserType(UserType.CU.toString());
			customer.setCustomerFirstName(custName);
			customer.setCustomerLastName(custLastName);
			customer.setCustomerLoginId(login);
			loginRepository.save(login);
			customerRepository.save(customer);
			return customer;
		}
	}

	public Customer updateCustomer(int custId, String custEmail, String custPassword, String custName,
			String custLastName) {
		if (loginRepository.findByEmail(custEmail).isPresent()) {
			return null;
		} else {
			if (custEmail != "") {
				customerRepository.findById(custId).get().getCustomerLoginId().setEmail(custEmail);
			}
			if (custPassword != "") {
				customerRepository.findById(custId).get().getCustomerLoginId().setPassword(custPassword);
			}
			if (custName != "") {
				customerRepository.findById(custId).get().setCustomerFirstName(custName);
			}
			if (custLastName != "") {
				customerRepository.findById(custId).get().setCustomerLastName(custLastName);
			}
			customerRepository.save(customerRepository.findById(custId).get());
			return customerRepository.findById(custId).get();
		}
	}

	public Customer deleteCustomer(int custId) {

		if (customerRepository.findById(custId).isPresent()) {

			Boolean customerDeleteCompleted = false;

			while (!customerDeleteCompleted) {

				if (customerCouponRepository.findByCustomerId(custId).isEmpty()) {
					loginRepository.delete(loginRepository
							.findByEmail(customerRepository.findById(custId).get().getCustomerLoginId().getEmail())
							.get());
					return customerRepository.findById(custId).get();
				} else {
					customerCouponRepository.delete(customerCouponRepository.findByCustomerId(custId).get(0));
				}
			}
		}
		return null;
	}

	public Iterable<Customer> getCustomers() {
		if (customerRepository.count() != 0) {
			return customerRepository.findAll();
		} else {
			return null;
		}
	}

	public Customer getCustomerById(int custId) {
		if (customerRepository.findById(custId).isPresent()) {
			return customerRepository.findById(custId).get();
		} else {
			return null;
		}
	}
}