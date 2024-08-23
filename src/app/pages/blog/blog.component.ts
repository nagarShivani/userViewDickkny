import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  getAllBlogDetails: any;


  constructor(private userService: UserService,
    private loaderService: LoaderService,
  private categoryService: CategoryService,
  ){
  this.getAllBlog();
  }
  getAllBlog(){
    this.loaderService.showLoading();
    this.categoryService.getAllBlog().subscribe(
      (res: any) => {
        this.getAllBlogDetails = res.data;
        console.log(this.getAllBlogDetails,"3455335");
        
          this.loaderService.hideLoading();
        } ,
      (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

}
