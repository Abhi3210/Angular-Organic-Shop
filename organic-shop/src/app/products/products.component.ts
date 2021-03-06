import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  
  products:Product[]=[];
  filteredProducts:Product[]=[];
  //subscription:Subscription;
  
  category:string;

  constructor(
    route:ActivatedRoute,
    productService:ProductService 
    )
     {
        productService.getAll().
        switchMap(products=>{
        this.products=products;
        return route.queryParamMap;
        })
        .subscribe(params=>{
          this.category=params.get('category');

          this.filteredProducts=(this.category) ?
          this.products.filter(p=>p.category===this.category):this.products;
         });
     }

  }
