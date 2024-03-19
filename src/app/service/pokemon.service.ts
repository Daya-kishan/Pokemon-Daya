import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allPokemonsUrl, pokemonSpecies } from '../modal/url.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons = <any>[];
  pokemonDetails = <any>[];
  evolutionChainData: any;
  evolutionSubject$ = new BehaviorSubject<any>(null);
  evolutionObservable$ = this.evolutionSubject$.asObservable();
  totalCount!: number;
  loading !: boolean;

  constructor(private http: HttpClient) { }
  /** get all the pokemons **/
  getAllPokemons(offset = 0, limit = 12) {
    this.pokemons.length = 0;
    this.loading = true;
    this.http.get(allPokemonsUrl(offset, limit)).subscribe((data: any) => {
      this.totalCount = data.count;
      data.results.forEach((pokemon: any) => {
        this.pokemons.push(pokemon);
      });
      this.fetchAndPreparePokemonDetails();
    }, (error) => {
      this.loading = false;
      console.log('error while fetching pokemon details')
    })
  }
  /** For all the pokemons fetch details for each pokemon **/
  private fetchAndPreparePokemonDetails() {
    const details = <any>[];
    for (let i = 0; i < this.pokemons.length; i++) {
      this.http.get(this.pokemons[i].url).subscribe((data: any) => {
        details.push(data);
        this.loading = false;
      }, (error: any) => {
        console.log('error while fetching pokemon details');
        this.loading = false;
      })
    }
    this.pokemonDetails = details;
  }
  /** get details for each pokemon specie **/
  getPokemonSpecies(id: number) {
    this.http.get(pokemonSpecies(id)).subscribe((data: any) => {
      if (data.evolution_chain.url) {
        this.fetchEvolutionChain(data.evolution_chain.url);
      }
    })
  }

  private fetchEvolutionChain(url: string) {
    this.http.get(url).subscribe((data: any) => {
      this.evolutionChainData = [];
      var evoData = data.chain;

      do {
        var evoDetails = evoData['evolution_details'][0];

        this.evolutionChainData.push({
          "species_name": evoData.species.name,
          "min_level": !evoDetails ? 1 : evoDetails.min_level,
          "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
          "item": !evoDetails ? null : evoDetails.item
        });

        evoData = evoData['evolves_to'][0];
      } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
      this.evolutionSubject$.next(this.evolutionChainData);

    })
  }
}
