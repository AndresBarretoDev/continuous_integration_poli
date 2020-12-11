import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })

export class UserAuthService {
  urlPath = 'http://localhost:3000';
  userInfo: any;
  constructor(private http: HttpClient,
    private router: Router,
    private storage:StorageService) {}

  // METHOD LOGIN
  handleLogin(dataForm:any) {
    // console.log({param})
    return new Promise((resolve, reject) => {
        let param = {
          usuario:dataForm.userName,
          contrasena:dataForm.password
        }
      // let headers: HttpHeaders = new HttpHeaders();
      // headers.append('Content-Type', 'application/json');
      this.http.get(`${this.urlPath}/abuesoft/login/${param.usuario}&${param.contrasena}`)
        .toPromise()
        .then(response => {
          console.log({response})
          this.storage.setObject('userInfo', response)
          resolve(response);
        }).catch(error => {
          reject(error)
        })
    })
  }

  // METHOD GET ROLES
  getRoles() {

    return new Promise((resolve, reject) => {
      // let headers: HttpHeaders = new HttpHeaders();
      // headers.append('Content-Type', 'application/json');
      this.http.get(`${this.urlPath}/abuesoft/rol`)
        .toPromise()
        .then(response => {
          console.log("reponse rol", response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
  // METHOD GET PATIENTS USER REGISTERED
  getPatientUsers() {
    return new Promise((resolve, reject) => {
      // let headers: HttpHeaders = new HttpHeaders();
      // headers.append('Content-Type', 'application/json');
      this.http.get(`${this.urlPath}/abuesoft/user`)
        .toPromise()
        .then(response => {
          console.log("reponse users!!!!", response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
  }
  // REGISTER PATIENTS USERS
  registerPatients(params:any){
    console.log(params)
    return new Promise( (resolve, reject)=>{
      this.http.post(`${this.urlPath}/abuesoft/user`,params)
      .toPromise()
      .then(response =>{
        resolve(response)
      }).catch(error=>{
        reject(error)
      })
    })
  }

  isAuth(){
    return true
  }
}
