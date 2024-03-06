import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrl: './category-crud.component.css'
})
export class CategoryCrudComponent implements OnInit, AfterViewInit {



  constructor(private categoryService:CategoryService,private authService:AuthServiceService,private router: Router){}

  ngAfterViewInit(): void {
    if (this.categoryDataSource != null) {
      this.categoryDataSource.paginator = this.paginator;
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

    //get all categories and fill table
    this.categoryService.getAllCategories().subscribe(
      categories=>{
        this.allCatgeories = categories;
        this.categoryDataSource = new MatTableDataSource(this.allCatgeories);
        this.categoryDataSource.paginator = this.paginator;
        console.log(this.categoryDataSource)
        this.showIsEdit = false
      }
    )


    //category form
    this.categoryAddForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    

  }

  categoryAddForm:FormGroup
  showViewCategories = true;
  categoryDataSource:any
  allCatgeories//stores all categories from request
  displayedCategoryColumns = ['edit', 'delete', 'id', 'name'];
  showAddCategoryForm = true
  showIsEdit:boolean //false = add -> true = edit

  @ViewChild(MatPaginator)
  paginator : MatPaginator;

  // Filter
  public applyFilter(filterValue : string) : void {
    this.categoryDataSource.filter = filterValue.trim().toLowerCase();
  }

  ////////////////////////////////////////
  // 
  // 
  // 
  // Adding Categories Logic ->
  //
  //
  //
  ///////////////////////////////////////



  editCategoryOption(event,name:string,id:number){
    //event.preventDefault();
    console.log(name)
    this.clearView()
    this.changeToUpdateForm(name)
    this.updateCategoryId = id
  }

  changeToUpdateForm(name:string){
    console.log("works")
    this.categoryAddForm.get('name').setValue(name);
    this.categoryAddForm.get('name').updateValueAndValidity();
    this.showIsEdit = true
  }

  //clears for edit and add
  clearView(){
    this.showIsEdit=false;
  }

  //deletes category at id
  deleteCategory(event,id:number){
    event.preventDefault();
    console.log(id)
    this.categoryService.deleteCategory(id).subscribe(
      response=>console.log(response)
      ,undefined
      ,()=>{
        window.location.reload();
      }
    )
  }


  
  //adds category
  addCategory(){
    const categoryName = this.categoryAddForm.get('name').value;
    const category = {'name':categoryName};
    this.categoryService.addCategory(category).subscribe(
      response=>console.log(response)
      ,undefined
      ,()=>{
        window.location.reload();
      }
    )
  }

  updateCategoryId:number
  editCategory(){
    const categoryName = this.categoryAddForm.get('name').value;
    this.categoryService.deleteCategory
    this.categoryService.updateCategory(this.updateCategoryId,categoryName).subscribe(
      response=>console.log(response)
      ,undefined
      ,()=>{
        window.location.reload();
      }
    )
  }





}
