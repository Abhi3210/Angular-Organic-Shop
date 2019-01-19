import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { AngularFireList } from 'angularfire2/database';
import { ProductService } from './../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs';
import { Category } from './../../models/category';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  
  /* categories=[
      {name:'bread' ,value:'Bread'},
      {name:'dairy' ,value:'Dairy'},
      {name:'fruits' ,value:'Fruits'},
      {name:'seasonings' ,value:'Seasonings and Spices'},
      {name:'vegetables' ,value:'Vegetables'}
  ]; */
  
  categories:Category[];
  product:any={};
 // product:{};
  id;
  
   constructor(
     private router:Router,
     private route:ActivatedRoute,
     private categoryService :CategoryService, 
     private productService:ProductService) {

   // this.categories$=categoryService.getCategories();
       categoryService.getCategories().
        subscribe(categories=>{
        this.categories=categories;
        });
 
     this.id=route.snapshot.paramMap.get('id');
     if(this.id) productService.get(this.id).take(1).subscribe(p=> this.product=p);

   // if(id) this.productService.get(id).take(1).subscribe(p=> this.product=p);
   
  }
   
  save(product)
  {   
     if(this.id) this.productService.update(this.id,product);
     else
      this.productService.create(product);

      this.router.navigate(['/admin/products']);
  }

  delete()
  {
    if(!confirm('Are you sure you want to delete this product?')) return;
    
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    
  }
  ngOnInit() {
  
  }

}
