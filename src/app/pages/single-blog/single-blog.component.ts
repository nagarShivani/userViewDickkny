import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent {
  getBlogDetails: any;
  blogID: any;

  constructor(private userService: UserService,
    private loaderService: LoaderService,
    private route :ActivatedRoute,
  private categoryService: CategoryService,){
    this.route.params.subscribe(params => {
      this.blogID = params['id'];
      this.getBlog(this.blogID)
    });
  }

  getBlog(id:any){
    this.loaderService.showLoading();
    this.categoryService.getAllBlogById(id).subscribe(
      (res: any) => {
        this.getBlogDetails = res;
        console.log(this.getBlogDetails,"@33434");
        
          this.loaderService.hideLoading();
        } ,
      (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
      }
    );
  }

}
