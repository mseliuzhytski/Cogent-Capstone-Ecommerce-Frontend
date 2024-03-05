export class Account{

    constructor(
        public id:number, 
        public username:String,
        public password:String,
        public email:String,
        public discount:number,
        public user:boolean,
        public admin:boolean
        ){}
}