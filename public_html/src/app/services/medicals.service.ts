import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalsService {

  urlPath = 'http://localhost:3000';
  userInfo: any;
  constructor(private http: HttpClient,
    private router: Router,
    private storage:StorageService) {}

  // REGISTER PATIENTS USERS
  registerPatients(params:any){
    console.log(params)
    return new Promise( (resolve, reject)=>{
      this.http.post(`${this.urlPath}/abuesoft/medicamento/`,params)
      .toPromise()
      .then(response =>{
        console.log("response medical", response)
        resolve(response)
      }).catch(error=>{
        reject(error)
      })
    })
  }
}
