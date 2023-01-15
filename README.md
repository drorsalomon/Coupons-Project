This project features a fully functioning coupon system that allows companies to create/update/delete their own unique coupons, 
and also allows customers to purchase those coupons. The customers and companies are created/updated/deleted by the system’s administrator.

The project covers both the server side and the client side.

Server side: This part of the project implements a full SQL data base (an SQL script file could be found in the SQL_Scripts folder) featuring six 
different tables that are accessed and manipulated via Spring repositories:

 Login – Lists the login details (login id, email, password, user type and login token) of the registered users (the user type could be customer, 
company or administrator).

 Customers – Lists the customers details (customer id, first name, last name, customer login object).

 Companies – Lists the companies details (company id, name, company login object).

 Coupons – Lists the available coupons that the registered companies published (coupon id, company id, coupon title, amount, price, category, 
description, expiration date and image file source).

 Categories – List the five different categories (beer, food, vacation, clothing and appliances).

 Customer coupons – A linking table between the customers and coupons tables to list which coupons each customer owns. The link is done via 
foreign keys that connect the valid id’s.

The tables feature various delete cascades. For instance, if you delete a certain company, the coupons published by that company will be deleted 
from the coupons table and from the customer coupons table so a customer can't own a coupon by a company that doesn't exist.

The business login is implemented through the admin/company/customer components that connect to the SQL tables by executing repository functions 
on one side, and receive information from the user using the admin/company/customer/login controllers on the other side.

A daily thread runs every 24 hours to delete coupons that are out of date (Found in the DailyTask package).

Client side: The client web app is built using Angular 8 and Bootstrap. Once the user login is validated by the system, his type (admin, customer, company) 
is evaluated and he is presented with his own unique menu. Each user function is linked to a separate Angular component that communicates with the server side 
controller through Observable object services. The user receives on screen feedback that notifies him about the result of his request.

For example, the administrator would like to add a new company to the system but he entered a company name that might already exist (duplicate company names 
are not allowed). The administrator controller will use the functions that exist in the administrator Java component to access the repositories and check with 
the SQL tables if the name is already listed or not. If the name already exists he will be requested to enter a different name, otherwise he will receive an on 
screen message that the company was successfully created.
