import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  pokemonDetail: any;
  id: any;
  loading: boolean | undefined;
  evolutionDetails: any[] = [];

  constructor(private route: ActivatedRoute, readonly pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(param => {
      this.id = param['id'];
      this.getSpecificPokemonData();
    });
    this.sbscribeToEvolutionData();
  }

  private sbscribeToEvolutionData() {
    this.pokemonService.evolutionObservable$.subscribe((data: any) => {
      this.evolutionDetails = data;
      this.loading = false;
    })
  }

  private getSpecificPokemonData() {
    this.pokemonService.pokemonDetails.forEach((data: any) => {
      if (data.id == this.id) {
        this.pokemonDetail = data;
      };
    });
  }

  ngOnDestroy(): void {
    console.log('unsubscribe called');
    this.sub.unsubscribe();

  }

  loadEvolutionChain(event: any) {
    console.log(this.evolutionDetails);
    if (event.index === 1) {
      this.loading = true;
      this.pokemonService.getPokemonSpecies(this.id);
    }
  }
}
