import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    // console.log({param})
    return new Promise((resolve, reject) => {
        let param = {
          usuario:dataForm.email,
          contrasena:dataForm.password
        }
      // let headers: HttpHeaders = new HttpHeaders();
      // headers.append('Content-Type', 'application/json');
      const params = new HttpParams().append(param.usuario, param.contrasena);
      this.http.get(`${this.urlPath}/abuesoft/login/${param.usuario}&${param.contrasena}`)
        .toPromise()
        .then(response => {
          console.log("reponse", response)
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
