package com.coupons.dailyTask;

import java.sql.Date;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import com.coupons.components.CompanyFacade;
import com.coupons.utils.PrintUtils;

@Component
public class dailyTaskPrints {

	private final dailyTaskFacade dtf;
	private final CompanyFacade cf;

	dailyTaskPrints(@Autowired ApplicationContext context) {
		dtf = context.getBean(dailyTaskFacade.class);
		cf = context.getBean(CompanyFacade.class);
	}

	public void dailyTaskExecute() {
		boolean couponCheckCompleted = false;

		System.out.println("(Beginning daily coupon check...)");
		PrintUtils.AddEmptyLines(1);
		while (!couponCheckCompleted) {
			Date currentDate = Date.valueOf(LocalDate.now());

			if (dtf.findCouponsByExpirationDate(currentDate).isEmpty()) {
				System.out.println("(Daily coupon check concluded)");
				PrintUtils.AddEmptyLines(1);
				couponCheckCompleted = true;
			} else {
				System.out.println("The coupon *" + dtf.findCouponsByExpirationDate(currentDate).get(0).getCouponTitle()
						+ "* was removed from the database due to being expired.");
				PrintUtils.AddEmptyLines(1);
				cf.deleteCoupon(dtf.findCouponsByExpirationDate(currentDate).get(0));
			}
		}
	}
}
