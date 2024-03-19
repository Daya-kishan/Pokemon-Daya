import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { pokemonDetail } from 'src/app/modal/url.config';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  id: any;
  loading: boolean | undefined;
  evolutionDetails: any[] = [];
  evolutionChain: any[] = [];
  pokemonDetail: any;

  constructor(private route: ActivatedRoute, readonly pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(param => {
      this.id = param['id'];
      const url = pokemonDetail(this.id);
      this.pokemonService.fetchPokemonDetails(url).subscribe((data: any) => {
        this.pokemonDetail = data;
      });
    });
  }

  ngOnDestroy(): void {
    console.log('unsubscribe called');
    this.sub.unsubscribe();

  }

  loadEvolutionChain(event: any) {
    if (event.index === 1) {
      this.evolutionChain.length = 0
        ; this.loading = true;
      this.pokemonService.getPokemonSpecies(this.id).subscribe((data: any) => {
        this.evolutionDetails = this.pokemonService.fetchEvolutionChain(data);
        this.pokemonService.fetchEvolutionStageDetails(this.evolutionDetails).subscribe((result: any) => {
          this.evolutionChain.push(result);
          this.loading = false;
        });
      });
    }
  }

  trackByFn(index: number) {
    return index;
  }
}
