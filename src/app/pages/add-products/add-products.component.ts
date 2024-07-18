
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductService } from "src/app/services/product.service";
import { ProductInfo } from "src/app/models/productInfo";


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  // empolyee : Employee = new Employee();

  productInfo : ProductInfo = new ProductInfo();

  failed = false;
  isLoading = false;

  createProductForm: FormGroup;

  constructor(private productService: ProductService, private router: Router) {
    this.createProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      productId: new FormControl(null, Validators.required),
      productIcon: new FormControl(null, Validators.required),
      categoryType: new FormControl(null, Validators.required),
    });
  }

  onSubmit(){
    this.saveEmployee();
    console.log(this.productInfo);
    this.goToEmployeeList();
  }
  saveEmployee(){
    this.productService.create(this.productInfo).subscribe();
  }

  goToEmployeeList(){
    this.router.navigate(['/seller/product']);
  }
 

  ngOnInit() {



}

}