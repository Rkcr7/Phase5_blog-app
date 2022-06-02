import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { BlogModel } from './blog-dash board.Model';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

   myDate =Date.now();
  

  formValue !:FormGroup;

  blogModelObj : BlogModel = new BlogModel();
  blogData !: any;
  showAdd!: boolean;
  showUpadte!: boolean;
  constructor(private formbuilder: FormBuilder,
  private api : ApiService) { }

  ngOnInit(): void {

    this.formValue =new FormGroup({
      'title' : new FormControl(null,Validators.required),
      'description' : new FormControl(null,Validators.required)
    });


    
    this.formValue = this.formbuilder.group({
      title :[''],
      description :[''],
      details :['']

      })
      this.getAllBlog();
  }
  

  clickAddBlog(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpadte = false;
  }
  postBlogDetails(){
    this.blogModelObj.title = this.formValue.value.title;
    this.blogModelObj.description = this.formValue.value.description;
    this.blogModelObj.details=this.formValue.value.details;
   
    this.api.postBlog(this.blogModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Blog Added Successfully ");
      let ref =document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllBlog();
    },
    err=>{
      alert("something went wrong");
    })
  }
  
  getAllBlog(){
    this.api.getBlog()
    .subscribe(res=>{
      this.blogData = res;
        
      })
  }
  deleteBlog(row : any){
    this.api.deleteBlog(row.id)
    .subscribe(res=>{
      alert("Blog Deleted");
      this.getAllBlog();
    })
  }

  onEdit(row :any){

    this.showAdd = false;
    this.showUpadte = true;
    this.blogModelObj.id =row.id;
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['details'].setValue(row.details);
  }

  updateBlogDetails()
  {
    this.blogModelObj.title = this.formValue.value.title;
    this.blogModelObj.description = this.formValue.value.description;
    this.blogModelObj.details=this.formValue.value.details;

    this.api.updateBlog(this.blogModelObj,this.blogModelObj.id)
    .subscribe(res=>{
      alert("updated Successfully");
      let ref =document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllBlog();
    })
  }

    
 
  

}
