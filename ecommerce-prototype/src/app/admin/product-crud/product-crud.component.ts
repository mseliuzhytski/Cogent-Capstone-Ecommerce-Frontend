import { AfterViewInit, Component } from '@angular/core';
import { ProductCrudService } from '../../product-crud.service';
import { Observer, Subscriber } from 'rxjs';
import { OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from '../../category.service';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css',
  providers: [ProductCrudService]
})
export class ProductCrudComponent implements OnInit, AfterViewInit {

  constructor(private productService : ProductCrudService,
    public dialog : MatDialog ,
    private categoryService:CategoryService
    ,private authService:AuthServiceService, private router:Router,
    ) {

  }

  ngAfterViewInit(): void {
    if (this.productsDataSource != null) {
      this.productsDataSource.paginator = this.productPaginator;
    }
    if (this.categoryDataSource != null) {
      this.categoryDataSource.paginator = this.categoryPaginator;
    }
  }

  // Observer for viewing products
  productObservable : any;
  productSubscriber : Subscriber<Object>;
  products = [];
  productsDataSource : any;
  displayedProductColumns = ['edit', 'delete', 'id', 'name', 'price', 'stock', 'category', 'image', 'details'];
  categoryList = [];//all category storage
  selectedCategories = [] // storing selected categories

  @ViewChild("paginatorProduct")
  productPaginator : MatPaginator;

  // Flags for determining whether to show certain panels
  showAddProductForm = false;
  showViewProducts = true;
  showCsvUpload = false;
  showViewCategories = false;
  showAddCategories = false;

  // We reuse the same form for adding and editing products
  // this flag determines whether we are editing an element
  showIsEdit = false;

  addForm : FormGroup;
  fileUploadFormControl: FormControl = new FormControl(null, [Validators.required]);

  csvUploadForm : FormGroup;
  csvUploadFormControl : FormControl = new FormControl(null, [Validators.required]);
  csvFile : File;

  newProduct : object;

  uploadFile : any;
  uploadFileObservable : any;
  uploadFileSubscriber : Subscriber<Object>;
  hasSelectedFile : boolean = false;

  addProductObservable : any;
  addProductSubscriber : Subscriber<Object>;

  editProductObservable : any;
  editProductSubscriber : Subscriber<Object>;

  file_store: FileList;
  file_list: Array<string> = [];

  dialogRef : any;
  dateAdded : number;
  productId : number;

  handleFileInputChange(file: File): void {
    this.uploadFile = file;
    this.hasSelectedFile = true;
    this.fileUploadFormControl.setValue(this.uploadFile.name);
  }

  handleCsvFileInputChange(file: File) : void {
    console.log("csv file: " + file.name);
    this.csvFile = file;
    this.csvUploadFormControl.setValue(this.csvFile.name);
  }

  @ViewChild('addProductButton') addProductButton: ElementRef;

  public setProducts() {
    this.productObservable = this.productService.getProducts();
    this.productSubscriber = this.productObservable.subscribe(value => {
      this.products = value;
      this.productsDataSource = new MatTableDataSource(this.products);
      this.productsDataSource.paginator = this.productPaginator;
    });
  }

  public logStockInput(event : Event) {
    console.log(event);
    console.log(this.addForm.get('stock').valid);
    console.log(this.addForm.get('stock').errors);
    console.log("----");
  }

  public applyFilter(filterValue : string) : void {
    this.productsDataSource.filter = filterValue.trim().toLowerCase();
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
    this.addForm.get('category').setValue(null);//category -> reset form
    this.uploadFile = null;
    this.hasSelectedFile = false;
    this.addForm.markAsPristine();
    this.addForm.markAsUntouched();
    this.addForm.reset();
  }

  public createNewProduct() {
    let newProduct = {};
    newProduct['name'] = this.addForm.get('name').value;
    newProduct['price'] = this.addForm.get('price').value;
    newProduct['stock'] = this.addForm.get('stock').value;
    newProduct['imageLocation'] = this.addForm.get('imageLocation').value;
    newProduct['details'] = this.addForm.get('details').value;
    newProduct['dateAdded'] = Date.now();
    newProduct['categoriesList'] = this.addForm.get('category').value;//category -> adding to a product object
    this.newProduct = newProduct;
    console.log("Product:",newProduct)
  }

  public updateWithProduct(product : any) {
    this.addForm.get('name').setValue(product['name']);
    this.addForm.get('name').updateValueAndValidity();

    this.addForm.get('price').setValue(product['price']);
    this.addForm.get('price').updateValueAndValidity();

    this.addForm.get('stock').setValue(product['stock']);
    this.addForm.get('stock').updateValueAndValidity();

    this.addForm.get('imageLocation').setValue(product['imageLocation']);
    this.addForm.get('imageLocation').updateValueAndValidity();

    this.addForm.get('details').setValue(product['details']);
    this.addForm.get('details').updateValueAndValidity();

    //not working for pre select
    console.log("LIST:",product['categoriesList'])
    this.addForm.get('category').setValue(product['categoriesList']); //setting category list to select form
    console.log("FORM:",this.addForm.get('category'))
    this.selectedCategories = product['categoriesList']
    console.log("MODEL",this.selectedCategories)
    console.log("CAT LIST",this.categoryList)
    this.addForm.get('category').updateValueAndValidity();
    this.dateAdded = product['dateAdded'];
    this.productId = product['id'];
  }

  public addProduct(event : Event) {
    event.preventDefault();
    this.createNewProduct();

    if (!this.addForm.invalid) {
      this.uploadFileObservable = this.productService.uploadImage(this.uploadFile);
      this.uploadFileSubscriber = this.uploadFileObservable.subscribe(value => {
        this.newProduct['imageLocation'] = value.abbreviatedFilename;
        this.addProductObservable = this.productService.addProduct(this.newProduct);
        this.addProductSubscriber = this.addProductObservable.subscribe(value => {
          this.clearAddForm();
          this.setProducts();
          this.dialogRef = this.dialog.open(ProductDialogComponent, {data : {type : 'add_product_success'}});
          this.dialogRef.afterClosed().subscribe(result => {
            if (result == 'add') {
              console.log("add");
              this.addProductOption(null);
            } else if (result == 'view') {
              console.log("view");
              this.viewProductOption(null);
            }
          })
          this.showAddProductForm = true;
        })
      });
    } else {
      this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'add_product_failure'}});
      this.dialogRef.afterClosed().subscribe(result => {
          console.log("dialog result " + result);
      })
    }

  }

  ngOnInit(): void {

    this.authService.checkIfAdmin().subscribe(
      response=>{
        if(!response){
          alert("NOT AUTHORIZED")
          this.router.navigate(['/login']);
        }
      },error=>{
        alert("NOT AUTHORIZED")
        this.router.navigate(['/login']);
      }
    )

    this.setProducts();
    this.addForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required,
        Validators.pattern(/^[0-9]+\.[0-9]{2}$/g)]),
      stock: new FormControl(null, [Validators.required,
        Validators.pattern(/^[0-9]+$/g)]),
      imageLocation: this.fileUploadFormControl,
      details: new FormControl(null, [Validators.required]),
      category: new FormControl(null) //category addition
    });
    this.csvUploadForm = new FormGroup({
      upload : this.csvUploadFormControl,
    });

    this.categoryService.getAllCategories().subscribe(
      response=>{
        for(const category of response){
          this.categoryList.push(category);
        }
      }
    )

    this.authService.checkIfAdmin().subscribe(
      response=>{
        if(!response){
          alert("NOT AUTHORIZED")
          this.router.navigate(['/login']);
        }
      },error=>{
        alert("NOT AUTHORIZED")
        this.router.navigate(['/login']);
      }
    )

    //category form
    this.categoryAddForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.setCategories();
  }

  setCategories() {
    //get all categories and fill table
    this.categoryService.getAllCategories().subscribe(
      categories=>{
        this.allCatgeories = categories;
        this.categoryDataSource = new MatTableDataSource(this.allCatgeories);
        this.categoryDataSource.paginator = this.categoryPaginator;
        this.showIsEdit = false
      }
    )
  }

  display() : void {
    console.log(this.products);
  }

  editProductInner() {
    this.editProductObservable = this.productService.editProduct(this.newProduct, this.productId);
    this.editProductSubscriber = this.editProductObservable.subscribe(value => {
      console.log(value);
      this.clearAddForm();
      this.setProducts();
      this.dialogRef = this.dialog.open(ProductDialogComponent, {data : {type : 'edit_product_success'}});
      this.dialogRef.afterClosed().subscribe(result => {
        this.viewProductOption(null);
      });
    });
  }

  editProduct(event : any) {
    event.preventDefault();
    event.preventDefault();
    this.createNewProduct();

    if (!this.addForm.invalid) {
      if (this.uploadFile != null) {
        this.uploadFileObservable = this.productService.uploadImage(this.uploadFile);
        this.uploadFileSubscriber = this.uploadFileObservable.subscribe(value => {
          this.newProduct['imageLocation'] = value.abbreviatedFilename;
          console.log("new image: " + value.abbreviatedFilename);
        });
        this.editProductInner();
      } else {
        this.editProductInner();
      }
    } else {
      console.log("errors");
      console.log(this.addForm.errors);
      this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'add_product_failure'}});
      this.dialogRef.afterClosed().subscribe(result => {
          console.log("dialog result " + result);
      })
    }
  }

  deleteProduct(event : any, id : number) {
    event.preventDefault();
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'delete_product_success'}});
        this.dialogRef.afterClosed().subscribe(result => {
          this.setProducts();
        });
      },
      (err) => {
        this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'delete_product_failure'}});
        this.dialogRef.afterClosed().subscribe(result => {
          this.setProducts();
        });

      },
      () => {
        console.log('yayyy');
      }
    );
  }


  uploadCsv(event : any) {
    event.preventDefault();
    if (this.csvUploadForm.valid && this.csvFile != null) {
      this.productService.uploadCsv(this.csvFile).subscribe(
        (data) => {
          this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'csv_upload_success'}});
          this.dialogRef.afterClosed().subscribe(result => {
            console.log("closed");
            this.setProducts();
            this.viewProductOption(null);
          });
        },
        (err) => {
          this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'csv_upload_failure'}});
        },
        () => {
        }
      );
    } else {
      this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'delete_upload_missing'}});
    }
  }


  clearView() {
    this.showAddProductForm = false;
    this.showViewProducts = false;
    this.showIsEdit = false;
    this.showCsvUpload = false;
    this.showViewCategories = false;
    this.showAddCategories = false;
    this.selectedCategories = []
  }

  public viewProductOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.setProducts();
    this.showViewProducts = true;
  }

  public addProductOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.clearAddForm();
    this.showAddProductForm = true;
    this.showIsEdit = false;
  }

  public editProductOption(event : Event, id : number) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showAddProductForm = true;
    this.showIsEdit = true;
    this.productService.getProduct(id).subscribe(product => {
      console.log(product);
      this.updateWithProduct(product);
    })
  }



  public uploadCsvOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showCsvUpload = true;
  }

  public viewCategoriesOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.setCategories();
    this.showViewCategories = true;
  }

  public addCategoriesOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.clearAddCategoryForm();
    this.showAddCategories = true;
    this.showIsEditCategory = false;
  }


  public editCategoryOption(event,name:string,id:number){
    this.clearView()
    this.showAddCategories = true;
    this.changeToUpdateForm(name)
    this.updateCategoryId = id;
    this.showIsEditCategory = true;
  }

  categoryAddForm:FormGroup
  categoryDataSource:any
  allCatgeories//stores all categories from request
  displayedCategoryColumns = ['edit', 'delete', 'id', 'name'];
  showAddCategoryForm = true
  showIsEditCategory = false;

  @ViewChild("paginatorCategory")
  categoryPaginator : MatPaginator;

  // Filter
  public applyFilterCategory(filterValue : string) : void {
    this.categoryDataSource.filter = filterValue.trim().toLowerCase();
  }

  changeToUpdateForm(name:string){
    console.log("works")
    this.categoryAddForm.get('name').setValue(name);
    this.categoryAddForm.get('name').updateValueAndValidity();
    this.showIsEdit = true
  }

  //deletes category at id
  deleteCategory(event,id:number){
    event.preventDefault();
    this.categoryService.deleteCategory(id).subscribe(
      (data) => {
        this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'delete_product_success'}});
        this.dialogRef.afterClosed().subscribe(result => {
          this.setCategories();
        });
      },
      (err) => {
        this.dialogRef = this.dialog.open(ProductDialogComponent, {data: {type: 'delete_product_invalid'}});
        this.dialogRef.afterClosed().subscribe(result => {
          this.setCategories();
        });

      },
      () => {

      }
    );
  }

  public clearAddCategoryForm() {
    this.categoryAddForm.get('name').setValue(null);
    this.categoryAddForm.markAsPristine();
    this.categoryAddForm.markAsUntouched();
    this.categoryAddForm.reset();
  }


  //adds category
  addCategory(){
    const categoryName = this.categoryAddForm.get('name').value;
    const category = {'name':categoryName};
    this.categoryService.addCategory(category).subscribe(
      (response)=>{
        this.dialogRef = this.dialog.open(ProductDialogComponent, {data : {type : 'add_category_success'}});
          this.dialogRef.afterClosed().subscribe(result => {
            if (result == 'add') {
              this.addCategoriesOption(null);
            } else if (result == 'view') {
              this.viewCategoriesOption(null);
            }
        });
      },
      (err) => {
        this.dialogRef = this.dialog.open(ProductDialogComponent, {data : {type : 'add_category_invalid'}});
      }
    )
  }

  updateCategoryId:number
  editCategory(){
    const categoryName = this.categoryAddForm.get('name').value;
    this.categoryService.updateCategory(this.updateCategoryId,categoryName).subscribe(
      (response)=>{
        this.dialogRef = this.dialog.open(ProductDialogComponent, {data : {type : 'edit_category_success'}});
          this.dialogRef.afterClosed().subscribe(result => {
            if (result == 'view') {
              this.viewCategoriesOption(null);
            }
        });
      },
      (err) => {
        this.dialogRef = this.dialog.open(ProductDialogComponent, {data : {type : 'edit_category_invalid'}});
      }
    )
  }

}
