import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalsService } from 'src/app/services/medicals.service';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-medical-services',
  templateUrl: './medical-services.component.html',
  styleUrls: ['./medical-services.component.sass']
})
export class MedicalServicesComponent implements OnInit {
  isLinear:Boolean = true;
  medicalInfo:FormGroup;  
  resumeRegister:any;  
  finalResume:any;
  
  constructor(private formBuilder:FormBuilder,
    private  medicalServi:MedicalsService) {       
    }

  ngOnInit() {
  
    this.medicalInfo = this.formBuilder.group({
      id: ['0'],
      nombre: ['', Validators.required],
      laboratorio: ['', Validators.required],
      vencimiento: [moment().format("DD/MM/YYYY"), Validators.required],
      registro: [moment().format("DD/MM/YYYY"), Validators.required],
      dosis: ['', Validators.required]
    });    
  }
  prepareResume(abuelo:any){
    if (this.medicalInfo.invalid) {  
      return
    }

    this.resumeRegister = {
      abuelo      
    }
    this.finalResume = Object.values(this.resumeRegister)
    console.log("final resume:===",this.finalResume)


    // console.log("resume: ",this.resumeRegister)
  }
  handleRegisterPatient(info){
    console.log("resume to send: ", info)
    let paramsTest = {
      "Meicamento": {
        "id": "0",
        "nombre": info.nombre,
        "laboratorio": info.laboratorio,
        "vencimiento": info.vencimiento,
        "registro": info.registro,
        "dosis": info.dosis        
        }
  }
  console.log("resume to send test!!!: ", paramsTest)  
  this.medicalServi.registerPatients(info)
  }

}
