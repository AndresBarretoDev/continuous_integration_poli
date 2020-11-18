import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.sass']
})
export class RegisterPatientComponent implements OnInit {
  isLinear:Boolean = true;
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  resumeRegister:any;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipo_doc: ['', Validators.required],
      documento: ['', Validators.required],
      edad: ['', Validators.required],
      habitacion: ['', Validators.required],
      eps: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipo_doc: ['', Validators.required],
      documento: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }
  onClick(){
    console.log("hokla");

  }
  handleRegisterPatient(patientInfo:any, userInfo:any){

    console.log("patient: ", patientInfo)
    console.log("userinfo: ",userInfo)
    this.resumeRegister.push(patientInfo)
    console.log("userinfo: ",userInfo)
  }

}
