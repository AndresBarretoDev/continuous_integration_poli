import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { GlobalAlertComponent } from '../../components/global-alert/global-alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLocalLogin: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userAuth: UserAuthService,
    private router: Router,
    private dialog: MatDialog) {
    this.createLoginForm()
  }

  ngOnInit() {

  }
  // CREATE REACTIVE LOGIN FORM
  createLoginForm() {
    this.loginForm = this.formBuilder.group({ ///^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/   [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    })
  }

  async handleLogin(dataForm) {
    console.log("data form login", dataForm)
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).map(control => {
        control.markAsTouched();
      })
    }
    // handle response server
    try {
      const response: any = await this.userAuth.handleLogin(dataForm);
      console.log("Response login", response)


      response.map((resp: any) => {
        console.log(resp.valor)
        const userInfo = JSON.parse(resp.valor)
        console.log(userInfo)
        if (userInfo.value == 1) {
          alert(userInfo)
          return
          this.router.navigate(['./dashboard/home'])
        } else {
          this.dialog.open(GlobalAlertComponent, {
            data: {
              message: 'El usuario y/o contraseña son incorrectos'
            }
          });
        }
      })

    } catch (error) {
      console.log("Error login", error)
    }
  }
}
