import { Account } from "./account";
import { Product } from "./product";


export class wishlistItem{

    constructor(
        public id:number,
        public account:Account,
        public product:Product
    ){}
}

