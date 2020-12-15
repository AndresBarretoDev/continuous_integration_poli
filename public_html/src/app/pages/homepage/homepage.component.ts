import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { UserAuthService } from '../../services/user-auth.service';
import { UserPatient } from '../../interfaces/userPatient';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

let ELEMENT_DATA: UserPatient[];

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  displayedColumns: string[] = ['nombre_abuelo', 'apellido_abuelo', 'tipo_doc_abuelo', 'doc_abuelo', 'habitacion', 'edad', 'EPS', 'actions'];
  dataSource = new MatTableDataSource < UserPatient > (ELEMENT_DATA);
  patientForm: FormGroup;
  representantForm: FormGroup;
  dialog: Boolean = false;
  listDoc: any[] = [];
  isPatient: Boolean = false;
  isRepresent: Boolean = false;
  userID:Number = 0;
  userType=''

  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;

  constructor(private userService: UserAuthService,
    private formBuilder: FormBuilder,
    private snackbar:MatSnackBar) {
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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipo_doc: ['', Validators.required],
      doc: ['', Validators.required],
      edad: ['', Validators.required],
      habitacion: ['', Validators.required],
      eps: ['', Validators.required],
    });
    // this.patientForm.controls['nombre_nono'].disable()
    // this.patientForm.controls['apellido_nono'].disable()
    // this.patientForm.controls['tipo_doc_nono'].disable()
    // this.patientForm.controls['doc_nono'].disable()

  }
  createFormDataRepresentant() {
    this.representantForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipo_doc: ['', Validators.required],
      doc: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    // this.representantForm.controls['nombre_rep'].disable()
    // this.representantForm.controls['apellido_rep'].disable()
    // this.representantForm.controls['tipo_doc_rep'].disable()
    // this.representantForm.controls['doc_rep'].disable()

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
      nombre: nombre_abuelo,
      apellido: apellido_abuelo,
      tipo_doc: tipo_doc_abuelo,
      doc: doc_abuelo,
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
      nombre: nombre_repstn,
      apellido: apellido_repstn,
      tipo_doc: tipo_doc_repstn,
      doc: doc_repstn,
      direccion: direccion_repstn,
      correo: correo_repstn,
      telefono: tel_repstn,
    });

  }
  openModalUser(item, userId,user: string) {
    this.userID = userId
    if (user === 'patient') {
      this.isPatient = true;
      this.userType = user
      this.populateFormDataPatient(item);
    } else if (user === 'representant') {
      this.isRepresent = true;
      this.userType = user
      this.populateFormDataRepresentant(item);
    }
    this.dialog = true;

    // OPTIONS TO GENERATE FORMS DINAMICALLY -IN CONSTRUCTION-
    // const test2 = Object.keys(item)
    // console.log("item user arr", test2)
    // const [nombre_abuelo, apellido_abuelo, tipo_doc_abuelo, doc_abuelo, habitacion, edad, EPS] = test2;
    // console.log("arr keys", nombre_abuelo)
  }
  async updateInfoPatient(infopatient) {
    this.closeDialog()
    try {
      const responseUpdate = await this.userService.updateUserInformation(this.userID,infopatient,this.userType)
      if (responseUpdate) {
        this.populateTable();
        this.openSnackBar("actualizado", "prueba")
      }
    } catch (error) {
      alert("algo salio mal al actualizar el usuario")

    }
  }
  async deleteUser(userID){
    try {
      const responseDel = await this.userService.deleteUser(userID);
      if (responseDel) {
        this.populateTable();
      }

    } catch (error) {
      alert("algo salio mal al eliminar el usuario")
    }
  }
  closeDialog() {
    this.dialog = false;
    this.isPatient = false;
    this.isRepresent = false;
    this.patientForm.reset()
    this.representantForm.reset()
  }
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 4000,
    });
  }
}
