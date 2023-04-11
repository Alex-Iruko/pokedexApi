import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pokemons: Pokemon[]=[];
  selectedPokemon!: Pokemon; 
  router: any;


  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe(
      (data) => {
        this.pokemons = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showDetails(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
}

