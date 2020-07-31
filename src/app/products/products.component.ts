import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  products: any;
  constructor(private CC: CourseService) { }

  ngOnInit(): void {
  	 this.CC.getAllStoreProducts().subscribe((data) => {
      this.products = data;
      console.log('All Products from Store: ', this.products);
    });
  }

}
