--DB creation
use master
drop database Coupon_management

use Master
CREATE DATABASE Coupon_management on Primary(Name=N'Coupon_manament', Filename=N'C:\SQLProjectFiles\coupon_projdat.mdf',Size=10MB, FILEGROWTH=10MB),
	FILEGROUP Coupon_data(Name=N'Coupon_data',Filename=N'C:\SQLProjectFiles\coupondata.ndf', Size=10MB, FILEGROWTH=10MB),
	FILEGROUP Company_data(Name=N'Company_data',Filename=N'C:\SQLProjectFiles\companydata.ndf',Size=10MB,FILEGROWTH=10MB),
	FILEGROUP Customer_data(Name=N'Customer_data',Filename=N'C:\SQLProjectFiles\customerdata.ndf',Size=10MB,FILEGROWTH=10MB),
	FILEGROUP Administrator_data(Name=N'Admin_data',Filename=N'C:\SQLProjectFiles\admindata.ndf',Size=10MB,FILEGROWTH=10MB)
	Log ON(Name=N'Coupon_projlog',Filename=N'C:\SQLProjectFiles\couponlog.ldf',SIZE=10MB,Filegrowth=5MB);

use Master;
Alter DATABASE Coupon_management Set Recovery Full;

Use Coupon_management
GO



/*Logins table alias=lg*/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[logins](
	[login_id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](50) NOT NULL DEFAULT ('no@mail.com'),
	[pwd] [varchar](20) NOT NULL DEFAULT ('default'),
	[login_user_type] [varchar](2) NOT NULL,
	[login_token] [varchar](max),
 CONSTRAINT [login_id_pk] PRIMARY KEY CLUSTERED 
(
	[login_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Administrator_data],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Administrator_data]
) ON [Administrator_data]

GO
SET ANSI_PADDING OFF
GO

/*Companies alias=cp*/
CREATE TABLE [dbo].[companies](
	[company_id] [int] IDENTITY(1,1) NOT NULL,
	[company_name] [varchar](100) NOT NULL DEFAULT ('NA'),
	[company_login_id] [int] NOT NULL CONSTRAINT [clog_id_fk] FOREIGN KEY([company_login_id])
	REFERENCES [dbo].[logins] ([login_id]) ON DELETE CASCADE,
PRIMARY KEY CLUSTERED 
(
	[company_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Company_data],
UNIQUE NONCLUSTERED 
(
	[company_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Company_data]
) ON [Company_data]

GO

SET ANSI_PADDING OFF
GO

/*Redundant*/
/*
ALTER TABLE [dbo].[companies] CHECK CONSTRAINT [clog_id_fk]
GO
*/

/*Customers alias=cs*/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[customers](
	[cust_id] [int] IDENTITY(1,1) NOT NULL,
	[cust_first_name] [varchar](100) NOT NULL DEFAULT ('NA'),
	[cust_last_name] [varchar](100) NOT NULL DEFAULT ('NA'),
	[cust_logid] [int] NOT NULL CONSTRAINT [custlog_id_fk] FOREIGN KEY([cust_logid])
	REFERENCES [dbo].[logins] ([login_id]) ON DELETE CASCADE,
 CONSTRAINT [customerid_pk] PRIMARY KEY CLUSTERED 
(
	[cust_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Customer_data]
) ON [Customer_data]

GO

SET ANSI_PADDING OFF
GO

/*Redundant*/
/*
ALTER TABLE [dbo].[customers]  WITH CHECK ADD CONSTRAINT [custlog_id_fk] FOREIGN KEY([cust_logid])
REFERENCES [dbo].[logins] ([login_id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[customers] CHECK CONSTRAINT [custlog_id_fk]
GO
*/

/*Categories alias=ct*/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[categories](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[category_desc] [varchar](100) NOT NULL DEFAULT ('NA'),
 CONSTRAINT [category_id_pk] PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Coupon_data]
) ON [Coupon_data]

GO

SET ANSI_PADDING OFF
GO

/*Coupons alias=cn*/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[coupons](
	[coupon_id] [int] IDENTITY(1,1) NOT NULL,
	[coupon_comp_id] [int] NULL CONSTRAINT [coup_comp_id_fk] FOREIGN KEY ([coupon_comp_id]) 
	REFERENCES [dbo].[companies] ([company_id]) ON DELETE CASCADE,
	[coupon_title] [varchar](100) NULL DEFAULT (NULL),
	[coupon_amount] [int] NOT NULL DEFAULT ((0)),
	[price] [real] NOT NULL DEFAULT ((0.00)),
	[coupon_category_id] [int] NOT NULL CONSTRAINT [coup_cat_id_fk] FOREIGN KEY([coupon_category_id])
	REFERENCES [dbo].[categories] ([category_id]) ON DELETE CASCADE,
	[coupon_description] [varchar](100) NULL DEFAULT (NULL),
	[coupon_exp_date] [datetime] NOT NULL DEFAULT ('2030-01-01 00:00:00'),
	[coupon_imagefile] [varchar](200) NULL,
 CONSTRAINT [coupon_id_pk] PRIMARY KEY CLUSTERED 
(
	[coupon_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Coupon_data]
) ON [Coupon_data]

GO

SET ANSI_PADDING OFF
GO


/*Redundant*/
/*
ALTER TABLE [dbo].[coupons] CHECK CONSTRAINT [coup_cat_id_fk]
GO
*/

/*Aggregator table alias=ucn*/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[customerscoupons](
	[customer_id] [int] NOT NULL CONSTRAINT [customer_idc_fk] FOREIGN KEY ([customer_id])
	REFERENCES [dbo].[customers] ([cust_id]),
	[custcoupon_id] [int] NOT NULL CONSTRAINT [agr_coupon_id_fk] FOREIGN KEY ([custcoupon_id]) 
	REFERENCES [dbo].[coupons] ([coupon_id]) ON DELETE CASCADE,
	[purchase_date] [datetime] NULL DEFAULT (getdate()),
 CONSTRAINT [PK_customerscoupons] PRIMARY KEY CLUSTERED 
(
	[custcoupon_id] ASC,
	[customer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Coupon_data]
) ON [Coupon_data]

GO

/*Redundant*/
/*
ALTER TABLE [dbo].[customerscoupons] CHECK CONSTRAINT [customer_idc_fk]
GO

ALTER TABLE [dbo].[customerscoupons]  WITH CHECK ADD  CONSTRAINT [FK_customerscoupons_customerscoupons] FOREIGN KEY([coupon_id], [customer_id])
REFERENCES [dbo].[customerscoupons] ([coupon_id], [customer_id])
GO

ALTER TABLE [dbo].[customerscoupons] CHECK CONSTRAINT [FK_customerscoupons_customerscoupons]
GO

ALTER TABLE [dbo].[customerscoupons]  WITH CHECK ADD  CONSTRAINT [FK_customerscoupons_customerscoupons1] FOREIGN KEY([coupon_id], [customer_id])
REFERENCES [dbo].[customerscoupons] ([coupon_id], [customer_id])
GO

ALTER TABLE [dbo].[customerscoupons] CHECK CONSTRAINT [FK_customerscoupons_customerscoupons1]
GO
*/