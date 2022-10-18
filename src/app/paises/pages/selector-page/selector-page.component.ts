import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../servicios/paises.service';
import { PaisSamll } from '../../interfaces/paises.interface';
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
    //Forma de desabilitarlo :  frontera : [{value:'', disabled:true},Validators.required]
  })

  // LLnar Selectores
  regiones: string[] = [];
  paises: PaisSamll[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSamll[] = [];

  // UI
  cargando: boolean = false;


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

    //Cambie la región
    this.miForm.get('region')?.valueChanges
      .pipe (
        tap( ( _ ) => {
          this.miForm.get('pais')?.reset('');
          this.cargando = true;
          //this.miForm.get('frontera')?.disable();
        }),
        switchMap ( region => this.paisesService.getPaisesPorRegion( region ) )   
      )       
      .subscribe(paises => {
        this.paises = paises;
        this.cargando = false;
      });

      // Cuamndo Cambia el pais

      this.miForm.get('pais')?.valueChanges      
      .pipe(
        tap( () => {
          //this.fronteras = [];
          this.miForm.get('frontera')?.reset('');
          //this.miForm.get('frontera')?.enable();
          this.cargando = true;
        }),
        switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo)),
        switchMap( pais => this.paisesService.getPaisesprCodigos(pais?.borders!))
      )
        .subscribe( paises => {
          this.fronteras = paises;
          //console.log(paises)
          this.cargando = false;    
      })
      
      
  }

  guardar(){
    console.log(this.miForm.value)
  }

}
