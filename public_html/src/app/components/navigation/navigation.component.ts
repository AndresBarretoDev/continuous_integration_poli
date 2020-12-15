import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  menuOptions:any[]=[];
  panelOpenState = false;
  constructor() { }

  ngOnInit() {
    this.menuOptions = [
      {
        name:'Inicio',
        route:'home',
        icon:'home'
      },
      {
        name:'usuarios',
        route:'user-information',
        icon:'people'
      },
      {
        name:'Medicamentos',
        route:'medical',
        icon:'folder'
      },
      // {
      //   name:'Asignaciones y planes',
      //   route:'asignaciones-planes',
      //   icon:'card_travel'
      // },
    ]
  }
showInfo(link){
  console.log(link);
}

}
