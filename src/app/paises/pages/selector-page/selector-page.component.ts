import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../servicios/paises.service';
import { PaisSamll } from '../../interfaces/paises.intervace';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {

  miForm : FormGroup = this.fb.group({
    region: ['',Validators.required],
    pais : ['',Validators.required],
    frontera : ['',Validators.required]
  })

  // LLnar Selectores
  regiones: string[] = [];
  paises: PaisSamll[] = [];

  constructor(private fb : FormBuilder,
              private paisesService : PaisesService) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    // FORMA 1
    // Cuando cambie la region
    // this.miForm.get('region')?.valueChanges
    // .subscribe( region => {
    //   console.log(region)

    //   this.paisesService.getPaisesPorRegion( region )
    //     .subscribe( paises => {
    //       console.log(paises)
    //       this.paises = paises;
    //     })
    // })

    //FORMA 2
    this.miForm.get('region')?.valueChanges
      .pipe (
        tap( ( _ ) => {
          this.miForm.get('pais')?.reset('');
        }),
        switchMap ( region => this.paisesService.getPaisesPorRegion( region ) )   
      )       
      .subscribe(paises => {
        this.paises = paises;
        console.log(paises);
      }) 
  }

  guardar(){
    console.log(this.miForm.value)
  }

}
