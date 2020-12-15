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
      vencimiento: ['', Validators.required],
      registro: ['', Validators.required],
      dosis: ['', Validators.required]
    });
  }
  prepareResume(infoMedical:any){

    console.log("infommedical ====> ",infoMedical)
    if (this.medicalInfo.invalid) {
      return
    }
    let {vencimiento, registro } = infoMedical
    let formatVen = moment(vencimiento).format("YYYY/MM/DD"),
       formatReg = moment(registro).format("YYYY/MM/DD")
    const newObject = {...infoMedical, vencimiento:formatVen, registro:formatReg}
    this.resumeRegister = {
      ...infoMedical, vencimiento:formatVen, registro:formatReg
    }

    console.log("final register ====> ",this.resumeRegister)

    this.finalResume = Object.values({newObject})
    console.log("final resume:===",this.finalResume)


    // console.log("resume: ",this.resumeRegister)
  }
  handleRegisterPatient(info){
  console.log("resume to send test!!!: ", info)
  this.medicalServi.registerPatients(info)
  }


}
