import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gen',
  templateUrl: './gen.component.html',
  styleUrls: ['./gen.component.css']
})
export class GenComponent {

  pokemonGen: any;
  gen= 1;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: { [x: string]: number; }) => {
      this.gen = params['gen'];
    });
    this.pokemonService['getPokemonByGen'](this.gen).subscribe(
      (data) => {
        this.pokemonGen = data;
        console.log(this.pokemonGen)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
