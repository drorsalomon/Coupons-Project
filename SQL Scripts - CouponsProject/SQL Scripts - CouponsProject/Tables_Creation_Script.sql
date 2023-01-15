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
)WITH (	 = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [Administrator_data],
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
/*When ANSI_NULLS is on (which you should always set on anyway, 
since the option to not have it on is going to be removed in the future), 
any comparison operation where (at least) one of the operands is NULL produces 
the third logic value - UNKNOWN (as opposed to TRUE and FALSE).

UNKNOWN values propagate through any combining boolean operators if they're not already decided
(e.g. AND with a FALSE operand or OR with a TRUE operand) or negations (NOT).

The WHERE clause is used to filter the result set produced by the FROM clause, such that the
overall value of the WHERE clause must be TRUE for the row to not be filtered out. So, if an
UNKNOWN is produced by any comparison, it will cause the row to be filtered out.
*/

SET QUOTED_IDENTIFIER ON
GO
/*Causes SQL Server to follow the ISO rules regarding quotation mark delimiting identifiers and
literal strings. Identifiers delimited by double quotation marks can be either Transact-SQL
reserved keywords or can contain characters not generally allowed by the Transact-SQL syntax rules for identifiers.
https://docs.microsoft.com/en-us/sql/t-sql/statements/set-quoted-identifier-transact-sql?view=sql-server-ver15 */

SET ANSI_PADDING ON
GO
/*Controls the way the column stores values shorter than the defined size of the column, and
the way the column stores values that have trailing blanks in char, varchar, binary, and varbinary data. 
https://docs.microsoft.com/en-us/sql/t-sql/statements/set-ansi-padding-transact-sql?view=sql-server-ver15 */


CREATE TABLE [dbo].[customers](
	[cust_id] [int] IDENTITY(1,1) NOT NULL,
	/* https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql-identity-property?view=sql-server-ver15 */
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
)WITH (PAD_INDEX = OFF, 
	/*Basically, you set PAD_INDEX = ON if you expect a lot of random changes to the index regularly.
	That helps avoiding index page splits
	I set it on when I expect 30%+ of random records included in the index to be deleted on a regular basis.*/

	STATISTICS_NORECOMPUTE = OFF, 
	/*stops the database-wide auto-updating (auto update statistics) from updating the specific statistics 
	for an index (or column-level statistic) that was created (or rebuilt) with this option turned on. */

	IGNORE_DUP_KEY = OFF,
	/* https://sqlperformance.com/2019/04/sql-performance/ignore_dup_key-slower-clustered-indexes */ 

	ALLOW_ROW_LOCKS = ON, 

	ALLOW_PAGE_LOCKS = ON)
	
	 ON [Coupon_data]
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