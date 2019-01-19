import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../../product.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/';
import { Subscription} from 'rxjs/Subscription';
//import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Product } from './../../models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  
  /*  products: AngularFireList<any>;
  products$:Observable<Product[]>;
  //filteredProducts$:Observable<Product[]>; 
 // filteredProducts:any[];
 // subscription:Subscription;


   constructor(private productService: ProductService) {
    this.products=productService.getAll();
    this.products$ = this.products.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
}   */

    products: Product[];
    subscription:Subscription;
    tableResource:DataTableResource<Product>;
    items:Product[]=[];
    itemCount:number;
   
   constructor(private productService: ProductService) {
     this.subscription= productService.getAll().
      subscribe(products=>{
        this.products=products;

        this.initializeTable(products);
      });
   } 

   private initializeTable(products: Product[])
    {
      this.tableResource=new DataTableResource(products);
      this.tableResource.query({ offset:0})
      .then(items=>this.items=items);

      this.tableResource.count()
      .then(count=>this.itemCount=count);
    }

    reloadItems(params)
    {  
      if(!this.tableResource) return;

      this.tableResource.query(params)
      .then(items=>this.items=items);
    }
 
   filter(query:string)
   {
    // console.log(query);
    let filteredProducts=(query)?
    this.products.filter(p=>p.title.toLowerCase().
    includes(query.toLocaleLowerCase())) : this.products;

    this.initializeTable(filteredProducts);
    
   }

  ngOnInit() {
  }

   ngOnDestroy()
  {
     this.subscription.unsubscribe();
  } 

}
