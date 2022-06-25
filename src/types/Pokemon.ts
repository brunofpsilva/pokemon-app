import {Abilities} from "./Ability";

export type PokemonList = {
    url: string;
    name: string;
}
export type Pokemon = {
    id: string;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    abilities: Abilities[];
}
