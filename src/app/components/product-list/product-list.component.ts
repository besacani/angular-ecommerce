import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!: number;
  currentCategoryName!: string;
  searchMode!: boolean;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log("value=" + this.searchMode);
    if (this.searchMode) {
      console.log("calling searchMethod");
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }


  }



  handleSearchProducts() {
    console.log("inside search method");
    const theKeyword = this.route.snapshot.paramMap.get('keyword') + "";
    console.log("read keyword: " + theKeyword);
    //now search products based on keyword

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );



  }

  handleListProducts() {

    //check if id param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    // if(hasCategoryId){
    //get id param string and convert to number using th e + symbol
    const param = this.route.snapshot.paramMap.get('id');
    this.currentCategoryId = param ? +param : 1;

    //get category name
    const nameParam = this.route.snapshot.paramMap.get('name');
    this.currentCategoryName = nameParam ? nameParam : 'Books';

    // }else{
    //   this.currentCategoryId=1;
    //   this.currentCategoryName="Books";
    // }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
