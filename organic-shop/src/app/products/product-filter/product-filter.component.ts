import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from './../../category.service';
import { Category } from './../../models/category';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  categories:Category[];

  constructor(categoryService:CategoryService) { 
    categoryService.getCategories().
        subscribe(categories=>{
        this.categories=categories;
        });
  }

  ngOnInit() {
  }

}
