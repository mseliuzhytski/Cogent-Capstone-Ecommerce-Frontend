import { Component } from '@angular/core';
import { ProductCrudService } from '../../product-crud.service';
import { Observer, Subscriber } from 'rxjs';
import { OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css',
  providers: [ProductCrudService]
})
export class ProductCrudComponent implements OnInit {

  constructor(private productService : ProductCrudService) {

  }

  productObservable : any;
  productSubscriber : Subscriber<Object>;
  products = [];

  showAddProductForm = false;
  addForm : FormGroup;
  newProduct : object;

  uploadFile : any;
  uploadFileObservable : any;
  uploadFileSubscriber : Subscriber<Object>;
  hasSelectedFile : boolean = false;

  addProductObservable : any;
  addProductSubscriber : Subscriber<Object>;


  @ViewChild('addProductButton') addProductButton: ElementRef;

  public setProducts() {
    this.productObservable = this.productService.getProducts();
    this.productSubscriber = this.productObservable.subscribe(value => {
      this.products = value;
      console.log("product value: " + this.products);
      console.log(typeof value);
    });
  }

  public uploadImage(event : any) {
    this.uploadFile = event.target.files[0];
    this.hasSelectedFile = true;
  }

  public clearAddForm() {
    this.addForm.get('name').setValue(null);
    this.addForm.get('price').setValue(null);
    this.addForm.get('stock').setValue(null);
    this.addForm.get('imageLocation').setValue(null);
    this.addForm.get('details').setValue(null);
    this.addForm.markAsPristine();
    this.addForm.markAsUntouched();
  }

  public createNewProduct() {
    let newProduct = {};
    newProduct['name'] = this.addForm.get('name').value;
    newProduct['price'] = this.addForm.get('price').value;
    newProduct['stock'] = this.addForm.get('stock').value;
    newProduct['imageLocation'] = this.addForm.get('imageLocation').value;
    newProduct['details'] = this.addForm.get('details').value;
    this.newProduct = newProduct;
  }

  public addProduct(event : Event) {
    event.preventDefault();
    console.log(this.addForm.invalid);
    this.createNewProduct();
    console.log(this.newProduct);

    if (!this.addForm.invalid) {
      this.uploadFileObservable = this.productService.uploadImage(this.uploadFile);
      this.uploadFileSubscriber = this.uploadFileObservable.subscribe(value => {
        // console.log(value);
        this.newProduct['imageLocation'] = value.abbreviatedFilename;
        this.addProductObservable = this.productService.addProduct(this.newProduct);
        this.addProductSubscriber = this.addProductObservable.subscribe(value => {
          // console.log("Record added");
          console.log(value);
          this.clearAddForm();
          this.setProducts();
          this.showAddProductForm = true;
        })
      });
    }

  }

  public addProductOption(event : Event) {
    event.preventDefault();
    this.showAddProductForm = true;
  }

  ngOnInit(): void {
    this.setProducts();
    this.addForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required,
        Validators.pattern(/^[0-9]+\.[0-9]{2}/g)]),
      stock: new FormControl(null, [Validators.required,
        Validators.pattern(/^[0-9]+/g)]),
      imageLocation: new FormControl(null, [Validators.required]),
      details: new FormControl(null, [Validators.required])
    });
  }

  display() : void {
    console.log(this.products);
  }

  editProduct(event : any, id : number) {
    event.preventDefault();
    console.log("Edit " + id);
  }

  deleteProduct(event : any, id : number) {
    event.preventDefault();
    console.log("Delete " + id);
  }

  addCsvOption(event : any) {

  }

}
