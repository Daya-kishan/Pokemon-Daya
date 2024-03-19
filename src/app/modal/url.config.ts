export const allPokemonsUrl = (offSet: number, limit: number) =>
    `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;
export const pokemonSpecies = (id: number) =>
    `https://pokeapi.co/api/v2/pokemon-species/${id}`;