import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  isLocalLogin:Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userAuth :UserAuthService, private router:Router) {
    this.createLoginForm()
  }

  ngOnInit() {

  }
  // CREATE REACTIVE LOGIN FORM
  createLoginForm() {
    this.loginForm = this.formBuilder.group({ ///^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/   [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    })
  }

  async handleLogin(dataForm){
    console.log("data form login",dataForm)
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).map(control=>{
        control.markAsTouched();
      })
    }
    if (this.isLocalLogin) {
      this.router.navigate(['./dashboard/home'])
      return
    }
    // handle response server
    try {
      const response:any =  await this.userAuth.handleLogin(dataForm);
      console.log("Response login", response)
     response.map((resp:any)=> {
       if (resp.valor == 1) {
         alert("es 1")
       } else{
         alert("es 0")
       }
     })

    } catch (error) {
      console.log("Error login", error)
    }
  }
}
