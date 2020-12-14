import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserPatient } from 'src/app/interfaces/userPatient';
import { UserAuthService } from '../../services/user-auth.service';
let ELEMENT_DATA: UserPatient[];
@Component({
  selector: 'app-users-information',
  templateUrl: './users-information.component.html',
  styleUrls: ['./users-information.component.sass']
})
export class UsersInformationComponent implements OnInit {
  displayedColumns: string[] = ['nombre_abuelo', 'apellido_abuelo', 'tipo_doc_abuelo', 'doc_abuelo', 'habitacion', 'edad', 'EPS', 'actions'];
  dataSource = new MatTableDataSource < UserPatient > (ELEMENT_DATA);
  patientForm: FormGroup;
  representantForm: FormGroup;
  dialog: Boolean = false;
  listDoc: any[] = [];
  isPatient: Boolean = false;
  isRepresent: Boolean = false;

  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;

  constructor(private userService: UserAuthService,
    private formBuilder: FormBuilder) {
    this.populateTable();
    this.createFormDataPatient();
    this.createFormDataRepresentant();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    // fill type document select
    this.listDoc = [{
        value: 'cc',
        name: 'Cédula de ciudadanía'
      },
      {
        value: 'ce',
        name: 'Cédula de extranjeria'
      },
      {
        value: 'pp',
        name: 'Pasaporte'
      },
    ]
  }
  populateTable() {
    try {
      const response = this.userService.getPatientUsers()
      response.subscribe(data => {
        this.dataSource.data = data as UserPatient[];
        console.log("response usersss", this.dataSource.data)
      });

    } catch (error) {
      console.log(error)
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // CREATE USERS FORMS
  createFormDataPatient() {
    this.patientForm = this.formBuilder.group({
      nombre_nono: ['', Validators.required],
      apellido_nono: ['', Validators.required],
      tipo_doc_nono: ['', Validators.required],
      doc_nono: ['', Validators.required],
      edad: ['', Validators.required],
      habitacion: ['', Validators.required],
      eps: ['', Validators.required],
    });
    this.patientForm.controls['nombre_nono'].disable()
    this.patientForm.controls['apellido_nono'].disable()
    this.patientForm.controls['tipo_doc_nono'].disable()
    this.patientForm.controls['doc_nono'].disable()

  }
  createFormDataRepresentant() {
    this.representantForm = this.formBuilder.group({
      nombre_rep: ['', Validators.required],
      apellido_rep: ['', Validators.required],
      tipo_doc_rep: ['', Validators.required],
      doc_rep: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      tel_rep: ['', Validators.required],
    });
    this.representantForm.controls['nombre_rep'].disable()
    this.representantForm.controls['apellido_rep'].disable()
    this.representantForm.controls['tipo_doc_rep'].disable()
    this.representantForm.controls['doc_rep'].disable()

  }
  // POPULATE FORMS WITH USERS DATA
  populateFormDataPatient(data: any) {
    const {
      nombre_abuelo,
      apellido_abuelo,
      tipo_doc_abuelo,
      doc_abuelo,
      habitacion,
      edad,
      EPS } = data;

    this.patientForm.patchValue({
      nombre_nono: nombre_abuelo,
      apellido_nono: apellido_abuelo,
      tipo_doc_nono: tipo_doc_abuelo,
      doc_nono: doc_abuelo,
      edad: edad,
      habitacion: habitacion,
      eps: EPS,
    })
  }

  populateFormDataRepresentant(data: any) {
    const {
      nombre_repstn,
      apellido_repstn,
      tipo_doc_repstn,
      doc_repstn,
      direccion_repstn,
      correo_repstn,
      tel_repstn } = data;

    this.representantForm.patchValue({
      nombre_rep: nombre_repstn,
      apellido_rep: apellido_repstn,
      tipo_doc_rep: tipo_doc_repstn,
      doc_rep: doc_repstn,
      direccion: direccion_repstn,
      correo: correo_repstn,
      tel_rep: tel_repstn,
    });

  }
  openModalUser(item, user: string) {
    if (user === 'patient') {
      this.isPatient = true;
      this.populateFormDataPatient(item);
      console.log("PATIENT!!!!!")
    } else if (user === 'representant') {
      this.isRepresent = true;
      this.populateFormDataRepresentant(item);
      console.log("REPRESENTANT!!!!!")
    }
    this.dialog = true;

    // OPTIONS TO GENERATE FORMS DINAMICALLY -IN CONSTRUCTION-
    // const test2 = Object.keys(item)
    // console.log("item user arr", test2)
    // const [nombre_abuelo, apellido_abuelo, tipo_doc_abuelo, doc_abuelo, habitacion, edad, EPS] = test2;
    // console.log("arr keys", nombre_abuelo)
  }
  updateInfoPatient(infopatient) {
    console.log(infopatient)
    this.closeDialog()
  }
  closeDialog() {
    this.dialog = false;
    this.isPatient = false;
    this.isRepresent = false;
    this.patientForm.reset()
    this.representantForm.reset()
  }

}
