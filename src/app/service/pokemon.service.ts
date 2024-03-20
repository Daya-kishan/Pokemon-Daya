import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allPokemonsUrl, pokemonDetailUrl, pokemonSpeciesUrl } from '../modal/url.config';
import { concatMap, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemons = <any>[];
  pokemonDetails = <any>[];
  loading!: boolean;
  totalCount!: number;
  pageIndex: number = 0;

  constructor(private http: HttpClient) { }

  /** get all the pokemons **/
  getAllPokemons(offset: number, limit = 12) {
    return this.http.get(allPokemonsUrl(offset, limit));
  }

  /** For all the pokemons fetch details for each pokemon **/
  fetchPokemonDetails(url: any) {
    return this.http.get(url);
  }

  /** get details for each pokemon specie **/
  getPokemonSpecies(id: number) {
    return this.http
      .get(pokemonSpeciesUrl(id))
      .pipe(
        switchMap((response: any) =>
          this.http.get(response.evolution_chain.url)
        )
      );
  }

  fetchEvolutionChain(data: any) {
    const evolutionChainData = [];
    var evoData = data.chain;
    do {
      var evoDetails = evoData['evolution_details'][0];

      evolutionChainData.push({
        "species_name": evoData.species.name,
        "min_level": !evoDetails ? 1 : evoDetails.min_level,
        "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
        "item": !evoDetails ? null : evoDetails.item
      });
      evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    return evolutionChainData;
  }

  fetchEvolutionStageDetails(stages: any[]) {
    return from(stages).pipe(
      concatMap((stage) => {
        return this.http.get(pokemonDetailUrl(stage.species_name));
      })
    );
  }
}
