import PokemonCard from "~/components/pokemonCard";
import { buttonTypes } from "~/utils/pokeTypes";
import { getAllPokemon } from "~/utils/pokeAPI";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";

export default function PokedexSite() {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        getAllPokemon().then((allPokemon) => {
            setAllPokemon(allPokemon);
        });
    }, []);

    return (
        <>
            <div className="header">
                Show Pokemon with the following type:
                <button className="button reset">Reset Filter</button>
            </div>
            <div className="button-wrapper">
                {buttonTypes.map((buttonType) => {
                    return (
                        <button
                            key={buttonType}
                            className={`button ${buttonType} filter-button `}
                        >
                            {buttonType}
                        </button>
                    );
                })}
            </div>
            <div id="pokemon-card-wrapper">
                {allPokemon.map((pokemon) => {
                    return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
                })}
            </div>
        </>
    );
}
