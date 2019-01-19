import { Injectable } from '@angular/core';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  

  constructor(private db: AngularFireDatabase) { }

  getCategories()
  {
    /* return this.db.list('/categories',ref => ref.
    orderByChild('name')).valueChanges();
 */
    return this.db.list('/categories',ref => ref.
    orderByChild('name')).snapshotChanges()
      .pipe(
        map( products => {
          return products.map( p => ({
            key: p.payload.key, ...p.payload.val()
          }))
        })
      );

   }
}
