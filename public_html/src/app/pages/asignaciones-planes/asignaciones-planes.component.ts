import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-asignaciones-planes',
  templateUrl: './asignaciones-planes.component.html',
  styleUrls: ['./asignaciones-planes.component.sass']
})


export class AsignacionesPlanesComponent implements OnInit {
  isLinear:Boolean = true;
  CargarDatosAb:FormGroup;
  planServ:FormGroup;
  trataMedic:FormGroup;
  resumeRegister:any;
  listPlan:any;
  finalResume:any;

  constructor(private formBuilder:FormBuilder,
    private userService:UserAuthService) { }

  ngOnInit() {
    this.CargarDatosAb = this.formBuilder.group({
      id_abuelo: ['', Validators.required],
      PriNomAbu: ['a'],
      SegNomAbu: ['a'],
      PriApeAbu: ['a'],
      SegApeAbu: ['a'],
      edadAbu: ['a'],
      generoAbu: ['a'],
      estadoAbu: ['a'],
    });

    this.planServ = this.formBuilder.group({
      tipoPlan: ['', Validators.required],
      DescSer: ['a'],
      preServ: ['a'],
    });

    this.trataMedic = this.formBuilder.group({
      id_medic: ['', Validators.required],
      nom_medic: ['a'],
      cantSum: ['', Validators.required],

    });

    // fill type planes select
    this.listPlan = [
      {
        value:'p1',
        name:'Plan basico'
      },
      {
        value:'p2',
        name:'Plan medio'
      },
      {
        value:'p3',
        name:'Plan plata'
      },
      {
        value:'p4',
        name:'Plan oro'
      },
    ]
  }

}
