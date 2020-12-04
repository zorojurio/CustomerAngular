import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router,} from '@angular/router';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer.model';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = new Customer();
  customerName = '';
  customerPhone = '';
  allowEdit = false;

  // changesSaved = false;

  constructor(private customerService: CustomerService,
              private  route: ActivatedRoute,
              private  router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.customerService.getCustomer(+id).subscribe(
      customer => {
        this.customer = customer;
        this.customerName = this.customer.name;
        this.customerPhone = this.customer.telephone;
      },
      error => {
        console.log(error);
      }
    );

    // getting the data from router parameter
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        if (queryParams.allowEdit === '1') {
          this.allowEdit = true;
        }
      }
    );
  }

  onUpdateCustomer(id: number) {
    if (this.allowEdit) {
      this.customer = {id, name: this.customerName, telephone: this.customerPhone};
      this.customerService.updateCustomer(id, this.customer).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/customers']);
        }, error => {
          console.log(error);
        }
      );

    }
  }

  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean  {
  //   if (!this.allowEdit){
  //     return true;
  //   }
  //   if ((this.customerName !== this.customer.name || this.customerPhone !== this.customer.phone)
  //     && !this.changesSaved  ){
  //     return confirm('Do you want to discard the changes ?');
  //   }
  // }

}
