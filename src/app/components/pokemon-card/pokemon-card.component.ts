import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemonData !: { name: string; url: string };
  id !: string;
  image!: string;
  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.pokemonService.fetchPokemonDetails(this.pokemonData.url).subscribe((result: any) => {
      this.id = result.id;
      this.image = result?.sprites?.other?.dream_world?.front_default
    })
  }

  showPokemonDetails() {
    this.router.navigate(['/pokemon-detail', this.id]);
  }

}
