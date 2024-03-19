import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { concatMap, forkJoin, from, map, switchMap } from 'rxjs';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.css']
})
export class PokemonGridComponent implements OnInit {
  pokemons: any[] = [];
  totalCount!: number;
  loading = true;
  constructor(readonly pokemonService: PokemonService,) { }

  ngOnInit(): void {
    this.fetchAllPokemons();
  }
  private fetchAllPokemons(offset: number = 0) {
    if (!this.pokemonService.pokemonDetails.length) {
      this.loading = true;
      this.pokemonService.getAllPokemons(offset).subscribe((data: any) => {
        this.totalCount = data.count;
        this.pokemons = data.results;
        this.loading = false;
      });
    }
  }

  handlePageEvent(event: PageEvent) {
    this.fetchAllPokemons(event.pageIndex * 12);
  }

  trackByFn(index: number) {
    return index;
  }
}
