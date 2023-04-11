import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetail!: Pokemon;
  id= 0

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
      this.id = params['id'];
    });
    this.pokemonService['getPokemonById'](this.id).subscribe(
      (data: Pokemon) => {
        this.pokemonDetail = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
