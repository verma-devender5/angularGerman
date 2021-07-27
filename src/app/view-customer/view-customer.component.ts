import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../createcustomer/customer.service';
import Customer from '../models/customer/customer.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  customerList: any;
  isLoading: boolean = false;
  constructor(
    private _customerService: CustomerService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    
    this.getCustomer();
  }

  getCustomer(): void {
    this.isLoading = true;
    this._customerService.getCustomer().subscribe((res) => {
      this.customerList = res;
      console.log(this.customerList);
      this.isLoading = false;
    });
  }
}
