import PokemonCard from "~/components/pokemonCard";
import getPokemonByType, { Type, buttonTypes } from "~/utils/pokeTypes";
import { getAllPokemon } from "~/utils/pokeAPI";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";
import Layout from "~/components/Layout";

export default function PokedexSite() {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [pokemonType, setPokemonType] = useState<Type>();

    let filteredList: Pokemon[];
    if (pokemonType === undefined) {
        filteredList = allPokemon;
    } else {
        filteredList = getPokemonByType(pokemonType, allPokemon);
    }

    useEffect(() => {
        getAllPokemon().then((allPokemon) => {
            setAllPokemon(allPokemon);
        });
    }, []);

    return (
        <Layout>
            <div>
                <p className="dex-header-text">
                    Show Pokemon with the following type:
                </p>
                <button
                    className="button reset"
                    onClick={() => {
                        setPokemonType(undefined);
                    }}
                >
                    Reset Filter
                </button>
            </div>
            <div className="button-wrapper">
                {buttonTypes.map((buttonType) => {
                    return (
                        <button
                            key={buttonType}
                            className={`button ${buttonType} filter-button `}
                            onClick={() => {
                                setPokemonType(buttonType);
                            }}
                        >
                            {buttonType}
                        </button>
                    );
                })}
            </div>
            <div id="pokemon-card-wrapper">
                {filteredList.map((pokemon) => {
                    return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
                })}
            </div>
        </Layout>
    );
}
