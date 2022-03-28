import {Url} from 'url';

export interface Employee{
    id: string;
    name: string;
    age: string;
    image: string;
}

export interface EmployeeSource{
    source: [Employee];
}