import { Category } from "./category";

export class Product{

    constructor(private id: number, private name:string,private price:number,private stock:number, 
        private categories:Category[],private details:string,private imageLocation:string,private dateAdded:number){
    }

    
    public set category(Category : Category[]) {
        this.categories = Category;
    }
    

}