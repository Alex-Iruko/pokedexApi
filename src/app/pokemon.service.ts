import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Pokemon } from './pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<any>('https://api-pokemon-fr.vercel.app/api/v1/pokemon').pipe(
      mergeMap((res: any[]) => forkJoin(res.map((pokemon:any) =>
        this.http.get<any>(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${pokemon.name}`)
          .pipe(map(species => ({
            id: pokemon.pokedexId,
            name: pokemon.name,
            nameFr: pokemon.name.fr,
            image: pokemon.sprites.regular,
            types: pokemon.types,
          })))
      )))
    );
  }

  getPokemonById(id?: number): Observable<any> {
    return this.http.get("https://api-pokemon-fr.vercel.app/api/v1/pokemon/"+id)
  }
  
  
  
  
  
}
