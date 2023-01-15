
export class Coupon{

    constructor(
        public couponTitle: string,
        public couponAmount: number,
        public couponPrice: number,
        public couponDescription: string,
        public couponExpirationDate: Date,
        public couponImageFile: string,
        public couponCompanyId: number,
        public couponCategoryId: number,
    )
    {}
}