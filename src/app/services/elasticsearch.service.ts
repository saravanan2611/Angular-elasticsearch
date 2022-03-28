import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {

  private client: Client;
  
  //query statements
  private qureyalldocs = {
    'query':{
      'match_all':{}
    }
  };

  constructor() { 
    if(!this.client){
      this.connect();
    }
  }

  //code to get elasticsearch localhost connection
  private connect(){
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }

  //testing the availability of elasticsearch server
  isAvailable(): any{
    return  this.client.ping({
      requestTimeout: Infinity,
      body: 'Hello!' 
    });
  }

  //function to get all the employee details from the document
  getAll(_index,_type){
    return this.client.search({
      index: _index,
      type: _type,
      body: this.qureyalldocs,
      filterPath: ['hits.hits._source']
    });
  }

  //function to search/filter employee details
  textSearch(__index,__type,__field,__queryText): any{
    return  this.client.search({
      index: __index,
      type: __type,
      filterPath: ['hits.hits._source','hits.total','_scroll_id'],
      body:{
        'query': {
          'match_phrase_prefix':{
            [__field]:__queryText,
          }
        }
      },
      '_source':['id','name','age','image']
    });
  }
}
