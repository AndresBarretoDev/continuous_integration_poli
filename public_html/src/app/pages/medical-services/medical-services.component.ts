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
      nombre_medicamento: ['', Validators.required],
      nombre_laboratorio: ['', Validators.required],
      fecha_vencimiento: [moment().format("DD/MM/YYYY"), Validators.required],
      fecha_registro: [moment().format("DD/MM/YYYY"), Validators.required],
      dosis_sugerida: ['', Validators.required]
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
      "representante": {
        "nombre_rep": "pedro",
        "apellido_rep": "Diaz",
        "tipo_doc_rep": "CC",
        "doc_rep": "77777777",
        "tel_rep": 45454522,
        "direccion": "Cra 78 sur # 45 h 23",
        "correo": "representante@test.com"
        },
        "abuelo": {
        "nombre_nono": "marta ",
        "apellido_nono": "lopez",
        "tipo_doc_nono": "CC",
        "doc_nono": "11112222333",
        "habitacion": 201,
        "edad": 76,
        "eps": "Compensar"
        }
  }
  console.log("resume to send test!!!: ", paramsTest)  
  }

}
