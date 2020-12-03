import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class UserAuthService {
  urlPath = 'http://localhost:3000';
  userInfo: any;
  constructor(private http: HttpClient,
    private router: Router) {}

  // METHOD LOGIN
  handleLogin(dataForm:any) {
    return new Promise((resolve, reject) => {
      // let headers: HttpHeaders = new HttpHeaders();
      // headers.append('Content-Type', 'application/json');
      this.http.post(`${this.urlPath}/abuesoft/...`,dataForm)
        .toPromise()
        .then(response => {
          console.log("reponse", response)
          return
          resolve(response)
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

  isAuth(){
    return true
  }
}
