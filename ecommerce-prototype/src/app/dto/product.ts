import { Category } from "./category";

export class Product{

    constructor(public id: number, public name:string,public price:number,public stock:number, 
        public categories:Category[],public details:string,public imageLocation:string,public dateAdded:number, public categoryNames:string[]){
    }

    public set category(Category : Category[]) {
        this.categories = Category;
    }
    

}