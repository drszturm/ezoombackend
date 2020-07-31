import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

   product: any;

  constructor(private CC: CourseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const pId = paramMap.get('pId');
      console.log('Product ID found: ', pId);
      this.CC.getSingleProduct(pId).subscribe((data) => {
        this.product = data;
        console.log('Single Product: ',this.product);
      });
    });
  }

}

