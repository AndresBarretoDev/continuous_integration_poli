import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.sass']
})
export class RegisterPatientComponent implements OnInit {
  isLinear:Boolean = true;
  patientInfo:FormGroup;
  patientGuard:FormGroup;
  resumeRegister:any;
  listDoc:any;
  finalResume:any;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.patientInfo = this.formBuilder.group({
      nombre_nono: ['', Validators.required],
      apellido_nono: ['', Validators.required],
      tipo_doc_nono: ['', Validators.required],
      doc_nono: ['', Validators.required],
      edad: ['', Validators.required],
      habitacion: ['', Validators.required],
      eps: ['', Validators.required],
    });
    this.patientGuard = this.formBuilder.group({
      nombre_rep: ['', Validators.required],
      apellido_rep: ['', Validators.required],
      tipo_doc_rep: ['', Validators.required],
      doc_rep: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      tel_rep: ['', Validators.required],
    });
    // fill type document select
    this.listDoc = [
      {
        value:'cc',
        name:'Cédula de ciudadanía'
      },
      {
        value:'ce',
        name:'Cédula de extranjeria'
      },
      {
        value:'pp',
        name:'Pasaporte'
      },
    ]
  }
  prepareResume(abuelo:any, representante:any){
    if (this.patientGuard.invalid) {
      return
    }

    this.resumeRegister = {
      abuelo,
      representante
    }
    this.finalResume = Object.values(this.resumeRegister)
    console.log(this.finalResume)


    console.log("resume: ",this.resumeRegister)
  }
  handleRegisterPatient(info){
    alert("se envia el formulario")
  }

}
