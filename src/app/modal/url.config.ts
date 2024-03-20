export const allPokemonsUrl = (offSet: number, limit: number) =>
    `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;
export const pokemonSpeciesUrl = (id: number) =>
    `https://pokeapi.co/api/v2/pokemon-species/${id}`;

export const pokemonDetailUrl = (id: any) => `https://pokeapi.co/api/v2/pokemon/${id}/`