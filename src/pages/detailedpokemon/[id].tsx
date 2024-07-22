import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/pokeAPI";
import { Fragment, useEffect, useState } from "react";
import { Pokemon, PokemonSpecies } from "pokenode-ts";
import { useRef } from "react";
import Image from "next/image";

const statMap = new Map();
statMap.set("hp", "HP");
statMap.set("attack", "ATK");
statMap.set("defense", "DEF");
statMap.set("special-attack", "SP.ATK");
statMap.set("special-defense", "SP.DEF");
statMap.set("speed", "SPEED");

export default function DetailedPokemon() {
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement>(null);

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
    const gen = pokemonSpecies.generation.name.split("-")[1];

    const totalStats = pokemon.stats.reduce((total, current) => {
        return total + current.base_stat;
    }, 0);

    return (
        <Layout>
            <div className="detail-wrapper">
                <div className="detail-left-container">
                    <Image
                        alt="Pokemon sprite"
                        width="250"
                        height="250"
                        className="poke-detail-sprite"
                        src={pokemon.sprites.front_default!}
                    />
                    <div className="stat-container">
                        <span className="base-stats-header">Base Stats:</span>
                        <div className="stat-wrapper">
                            {pokemon.stats.map((stat) => {
                                return (
                                    <Fragment key={stat.stat.name}>
                                        <span className="stat">
                                            {statMap.get(stat.stat.name)}
                                        </span>
                                        <span className="stat">
                                            {stat.base_stat || "-"}
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </div>
                        <span className="base-stats-footer">
                            Total Base Stat: {totalStats}
                        </span>
                    </div>
                </div>
                <div className="detail-body">
                    <div className="detail-upper-container">
                        <div className="name-number-wrapper">
                            <div className="name-number-inner">
                                <span className="poke-detail-number">{`#${pokemon.id}`}</span>
                                <span className="poke-detail-name">
                                    {pokemon.name}
                                </span>
                            </div>
                            <div>
                                <span className="poke-detail-japname">
                                    jap: {japname?.name || "-"}
                                </span>
                            </div>{" "}
                        </div>
                        <div className="habitat-gen-wrapper">
                            <span className="habitat">
                                habitat: {pokemonSpecies.habitat.name}{" "}
                            </span>
                            <span className="gen">
                                existing since: Generation{" "}
                                {gen?.toUpperCase() || "-"}
                            </span>
                        </div>
                        <div className="type-wrapper">
                            {pokemon.types.map((type) => {
                                return (
                                    <span
                                        className={`poke-detail-type  ${type.type.name}`}
                                        key={type.type.name}
                                    >
                                        {type.type.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div className="button-chain-container">
                        <button
                            className="audio-button"
                            onClick={() => {
                                audioRef.current?.play();
                            }}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4028/4028535.png"
                                className="audio-button"
                            />
                            <audio
                                ref={audioRef}
                                src={pokemon.cries.legacy}
                            ></audio>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
