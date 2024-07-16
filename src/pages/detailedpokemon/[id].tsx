import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/pokeAPI";
import { useEffect, useState } from "react";
import { Pokemon, PokemonSpecies } from "pokenode-ts";

export default function DetailedPokemon() {
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();
    const router = useRouter();

    if (Array.isArray(router.query.id)) {
        throw "Error: router.query.id is a string array";
    }

    const id = Number(router.query.id);
    useEffect(() => {
        if (Number.isNaN(id)) {
            return;
        }
        api.getPokemonById(id)
            .then((pokemon) => {
                setPokemon(pokemon);
            })
            .catch((reason) => {
                console.log(reason);
            });
        api.getPokemonSpeciesById(id)
            .then((pokemonSpecies) => {
                setPokemonSpecies(pokemonSpecies);
            })
            .catch((reason) => {
                console.log(reason);
            });
    }, [id]);

    if (pokemon === undefined || pokemonSpecies === undefined) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }
    const japname = pokemonSpecies.names.find(
        (pokename) => pokename.language.name === "ja-Hrkt"
    );

    return (
        <Layout>
            <div className="detail-wrapper">
                <div className="detail-left-container">
                    <img
                        className="poke-detail-sprite"
                        src={pokemon.sprites.front_default!}
                    />
                </div>
                <div className="detail-body">
                    <div className="detail-container">
                        <div className="name-number-wrapper">
                            <span className="poke-detail-number">{`#${pokemon.id}`}</span>
                            <span className="poke-detail-name">
                                {pokemon.name}
                            </span>
                        </div>
                        <div>
                            <p className="poke-detail-name">
                                jap: {japname?.name || "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
