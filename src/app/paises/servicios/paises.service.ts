import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisSamll } from '../interfaces/paises.intervace';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {


  private baseUrl: string = 'https://restcountries.com/v2'
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get regiones() : string[] {
    return [...this._regiones]
  }

  constructor( private http: HttpClient) { }

  getPaisesPorRegion( region: string): Observable<PaisSamll[]> {

    const url : string = `${ this.baseUrl }/region/${ region }?fields=name;capital`
    return this.http.get<PaisSamll[]>( url );

  }
}
