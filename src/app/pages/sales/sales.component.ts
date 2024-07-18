
import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/Order";
import {OrderStatus} from "../../enum/OrderStatus";
import {UserService} from "../../services/user.service";
import {JwtResponse} from "../../response/JwtResponse";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../enum/Role";
import { toASCII } from 'punycode';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  page: any;
  getValue : number;
  total = 0;

  OrderStatus = OrderStatus;
  currentUser: JwtResponse;
  Role = Role;
  
  constructor(private httpClient: HttpClient,
              private orderService: OrderService,
              private userService: UserService,
              private route: ActivatedRoute
  ) {
  }

  querySub: Subscription;

  ngOnInit() {
      this.currentUser = this.userService.currentUserValue;
      this.querySub = this.route.queryParams.subscribe(() => {
          this.update();
      });

      this.total = this.total + this.getValue;


  }

  update() {
      let nextPage = 1;
      let size = 10;
      if (this.route.snapshot.queryParamMap.get('page')) {
          nextPage = +this.route.snapshot.queryParamMap.get('page');
          size = +this.route.snapshot.queryParamMap.get('size');
      }
      this.orderService.getPage(nextPage, size).subscribe(page => this.page = page, _ => {
          console.log("Get Orde Failed")
      });
  }


  cancel(order: Order) {
      this.orderService.cancel(order.orderId).subscribe(res => {
          if (res) {
              order.orderStatus = res.orderStatus;
          }
      });
  }

  finish(order: Order) {
      this.orderService.finish(order.orderId).subscribe(res => {
          if (res) {
              order.orderStatus = res.orderStatus;
          }
      })
  }

  ngOnDestroy(): void {
  }
  selected( val:any){
    this.total= this.total - this.total*0.2;
    console.log(this.total);
}
 
}
