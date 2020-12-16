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
  displayedColumns: string[] = ['nombre', 'apellido', 'tipo_doc', 'documento','telefono', 'direccion', 'correo', 'actions'];
  dataSource = new MatTableDataSource < UsersEmployes > (ELEMENT_DATA);
  usersForm: FormGroup;
  dialog: Boolean = false;
  listDoc: any[] = [];
  toggleTitle='Agregar usuario'
  isAddUser: Boolean = true;
  userID:any;

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
  populateFormDataEmploye(data: any) {
    const {
      nombre,
      apellido,
      tipo_doc,
      documento,
      telefono,
      direccion,
      correo } = data;

    this.usersForm.patchValue({
      id:0,
      nombre: nombre,
      apellido: apellido,
      tipo_doc: tipo_doc,
      doc: documento,
      tel: telefono,
      direccion: direccion,
      correo: correo,
    })
  }


  addEmployes() {
    this.dialog = true;
    this.toggleTitle = 'Agregar usuario';
  }
  openModalUser(item, userId) {
    console.log("info", item, userId)
    this.populateFormDataEmploye(item)
    this.dialog = true;
    this.toggleTitle = 'Editar usuario';
    this.isAddUser = false;
    this.userID = userId

  }
  async handleUserRegister(infopatient) {
    if (this.usersForm.invalid) {
      return
    }
    console.log({infopatient})
    try {
      const responseRegister = await this.userService.registerEmployes(infopatient);
      if (responseRegister) {
        this.populateTable();
      }

    } catch (error) {

    }
    this.closeDialog()
  }
  // UPDATE USER
  async handleUserUpdate(infopatient,) {
    console.log("INFO UPDATE ::: ",{infopatient})
    if (this.usersForm.invalid) {
      return
    }
    try {
      const responseUpdate = await this.userService.updateEmployes(this.userID,infopatient);
      if (responseUpdate) {
        // this.populateTable();
      }

    } catch (error) {

    }
    this.closeDialog()
  }
  // UPDATE USER
  async handleDeleteUser(userID) {
    console.log("INFO DELETE ::: ",{userID})

    try {
      const responseDelete = await this.userService.deleteEmployes(userID);
      if (responseDelete) {
        this.populateTable();
      }

    } catch (error) {

    }
    this.closeDialog()
  }
  closeDialog() {
    this.dialog = false;
    this.usersForm.reset();
    this.isAddUser = true;
    // this.userID = 0
  }

}
