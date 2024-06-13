import { Pokemon } from "pokenode-ts";

export type Type =
    | "water"
    | "fire"
    | "grass"
    | "normal"
    | "flying"
    | "poison"
    | "ghost"
    | "psychic"
    | "ground"
    | "dragon"
    | "ice"
    | "bug"
    | "fighting"
    | "rock"
    | "electric"
    | "steel"
    | "dark"
    | "fairy";

export const buttonTypes: Type[] = [
    "water",
    "fire",
    "grass",
    "normal",
    "flying",
    "poison",
    "ghost",
    "psychic",
    "ground",
    "dragon",
    "ice",
    "bug",
    "fighting",
    "rock",
    "electric",
    "steel",
    "dark",
    "fairy",
];

export default function getPokemonByType(type: Type, pokeList: Pokemon[]) {
    const filteredPokeList = pokeList.filter((pokemon) => {
        const filteredPokeTypes = pokemon.types.filter((pokeType) => {
            if (pokeType.type.name === type) {
                return true;
            } else {
                return false;
            }
        });
        if (filteredPokeTypes.length === 0) {
            return false;
        } else {
            return true;
        }
    });
    return filteredPokeList;
}
