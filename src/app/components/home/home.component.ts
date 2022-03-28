import { Component,ChangeDetectorRef } from '@angular/core';
import {ElasticsearchService} from 'src/app/services/elasticsearch.service';
import {EmployeeSource} from 'src/app/models/employee.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

 
  isConnected = false;
  status: string;

  private static readonly INDEX = 'employee';
  private static readonly TYPE = '_doc';

  employeeSource: EmployeeSource[];

  private queryText = '';
  private lastKeypress = 0;

  constructor(private es:ElasticsearchService, private cd: ChangeDetectorRef ){
    this.isConnected = false;
    this.queryText = '';
  }

  //function to display all the employee details
  ngOnInit():any{
    this.es.getAll(HomeComponent.INDEX,HomeComponent.TYPE).then(
      response => {
        this.employeeSource = response.hits.hits;
        console.log(response);
        console.log(this.employeeSource);
        //console.log(employee);
      }, error => {
        console.log(error);
      }).then(() => {
        console.log("Completed");
      });
      /*this.es.isAvailable().then(() => {
        this.status = 'OK';
        this.isConnected = true;
      }, error => {
        this.status = 'ERROR';
        this.isConnected = false;
        console.error('Server is down', error);
      }).then(() => {
        this.cd.detectChanges();
      });*/
  }

  seacrhName(searchform){
    this.queryText = searchform.value;
      this.es.textSearch(
        HomeComponent.INDEX, HomeComponent.TYPE,'name',this.queryText).then(
          response => {
            this.employeeSource = response.hits.hits;
            console.log(response);
            console.log(this.employeeSource);
          }, error => {
            console.log(error);
          }).then(() => {
            console.log("Search Completed");
          });
  }
  
  //function to perform the search operation 
  search($event){
    if($event.timeStamp - this.lastKeypress > 1000){
      this.queryText = $event.target.value;
      this.es.textSearch(
        HomeComponent.INDEX, HomeComponent.TYPE,'name',this.queryText).then(
          response => {
            this.employeeSource = response.hits.hits;
            console.log(response);
            console.log(this.employeeSource);
          }, error => {
            console.log(error);
          }).then(() => {
            console.log("Search Completed");
          });
    }
    this.lastKeypress = $event.timeStamp;
  }

}
