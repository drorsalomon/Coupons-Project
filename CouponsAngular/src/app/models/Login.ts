
export class Login{

    constructor(
        public email: string,
        public password: string,
        public logInUserType: string,
        public loginToken: string,
    )
    {}
}