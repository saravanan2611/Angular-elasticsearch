import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee.interface';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  @Input() Employee: Employee;

  ngOnInit() {
  }

  //Function to open the modal class and to fetch datas to display them in the modal class
  openDetails(targetModal, Employee: Employee) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('id').setAttribute('value', Employee.id);
    document.getElementById('name').setAttribute('value', Employee.name);
    document.getElementById('age').setAttribute('value', Employee.age);
    document.getElementById('image').setAttribute('value',Employee.image);
 }

}
