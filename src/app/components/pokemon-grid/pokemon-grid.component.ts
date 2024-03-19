import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.css']
})
export class PokemonGridComponent implements OnInit {

  constructor(readonly pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    if (!this.pokemonService.pokemonDetails.length) {
      this.pokemonService.getAllPokemons();
    }

  }

  showPokemonDetails(id: number) {
    this.router.navigate(['/pokemon-detail', id]);
  }

  handlePageEvent(event: PageEvent) {
    this.pokemonService.getAllPokemons(event.pageIndex * 12);
  }
}
