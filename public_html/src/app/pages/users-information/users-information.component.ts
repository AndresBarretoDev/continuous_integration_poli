import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UsersEmployes } from 'src/app/interfaces/userEmployes';
import { UserAuthService } from '../../services/user-auth.service';
let ELEMENT_DATA: UsersEmployes[];
@Component({
  selector: 'app-users-information',
  templateUrl: './users-information.component.html',
  styleUrls: ['./users-information.component.sass']
})
export class UsersInformationComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'tipo_doc', 'doc','tel', 'direccion', 'correo', 'actions'];
  dataSource = new MatTableDataSource < UsersEmployes > (ELEMENT_DATA);
  usersForm: FormGroup;
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
    this.createFormUser();
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
      const response = this.userService.getUsersEmployes()
      response.subscribe(data => {
        this.dataSource.data = data as UsersEmployes[];
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
  createFormUser() {
    this.usersForm = this.formBuilder.group({
      id:0,
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      tipo_doc:['', Validators.required],
      doc:['', Validators.required],
      tel:['', Validators.required],
      direccion:['', Validators.required],
      correo:['', Validators.required],

    });
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

    this.usersForm.patchValue({
      nombre: nombre_abuelo,
      apellido: apellido_abuelo,
      tipo_doc: tipo_doc_abuelo,
      doc: doc_abuelo,
      tel: edad,
      direccion: habitacion,
      correo: EPS,
    })
  }


  openModalUser(item) {
    console.log("info", item)

    this.dialog = true;


  }
  handleUserRegister(infopatient) {
    console.log(infopatient)
    this.userService.registerEmployes(infopatient)
    // this.closeDialog()
  }
  closeDialog() {
    this.dialog = false;
    this.isPatient = false;
    this.isRepresent = false;
    // this.patientForm.reset()
    // this.representantForm.reset()
  }

}
