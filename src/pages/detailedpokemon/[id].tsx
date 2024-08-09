import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api, evolutionApi } from "~/utils/pokeAPI";
import { Fragment, useEffect, useState } from "react";
import { Pokemon, PokemonSpecies, Ability, EvolutionChain } from "pokenode-ts";
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
    const [abilities, setAbilities] = useState<Ability[]>();
    const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>();
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
                const promises = pokemon.abilities.map((pokemonAbility) => {
                    const promise = api.getAbilityByName(
                        pokemonAbility.ability.name
                    );
                    return promise;
                });
                Promise.all(promises).then((abilities) => {
                    setAbilities(abilities);
                });
            })
            .catch((reason) => {
                console.log(reason);
            });
        api.getPokemonSpeciesById(id)
            .then((pokemonSpecies) => {
                setPokemonSpecies(pokemonSpecies);
                const url = pokemonSpecies.evolution_chain.url;
                const parts = url.split("/");
                const evolutionId = Number(parts[parts.length - 2]);
                evolutionApi
                    .getEvolutionChainById(evolutionId)
                    .then((evolutionChain) => {
                        setEvolutionChain(evolutionChain);
                    })
                    .catch((reason) => {
                        console.log(reason);
                    });
            })
            .catch((reason) => {
                console.log(reason);
            });
    }, [id]);
    if (
        pokemon === undefined ||
        pokemonSpecies === undefined ||
        abilities === undefined ||
        evolutionChain === undefined
    ) {
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
                    {/* Base Stat Container */}
                    <div className="flex flex-col gap-4 border-2 border-black rounded-lg p-4">
                        <span className="text-xl border-b-4 font-bold border-black">
                            Base Stats:
                        </span>
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
                    {/* Ability Container */}
                    <div className="flex flex-col border-2 border-black rounded-lg p-4">
                        <span className="text-xl font-bold">Abilities:</span>
                        <div className="flex flex-col">
                            {pokemon.abilities.map((pokemonAbility) => {
                                const pokeAbility = abilities.find(
                                    (ability) => {
                                        return (
                                            pokemonAbility.ability.name ===
                                            ability.name
                                        );
                                    }
                                );
                                if (pokeAbility === undefined) {
                                    return null;
                                }
                                const engAbilityName = pokeAbility.names.find(
                                    (abilityName) => {
                                        return (
                                            abilityName.language.name === "en"
                                        );
                                    }
                                );
                                if (engAbilityName === undefined) {
                                    return null;
                                }
                                if (pokemonAbility.is_hidden === false) {
                                    return (
                                        <span key={pokeAbility.name}>
                                            {engAbilityName.name}
                                        </span>
                                    );
                                } else {
                                    return (
                                        <div
                                            className="flex flex-col"
                                            key={pokeAbility.name}
                                        >
                                            <span className="text-xl font-bold">
                                                Hidden Ability:
                                            </span>
                                            <span>{engAbilityName.name}</span>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="detail-body">
                    {/* Upper Detail Container */}
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
                    {/* audiobutton-chain-container */}
                    <div className="button-chain-container">
                        <button
                            className="audio-button"
                            onClick={() => {
                                audioRef.current?.play();
                            }}
                        >
                            <Image
                                src={"/PlayButton.png"}
                                className="audio-button"
                                alt="Audio Button Cry"
                                width={512}
                                height={512}
                            />
                            <audio
                                ref={audioRef}
                                src={pokemon.cries.legacy}
                            ></audio>
                        </button>
                        <div>
                            <div>{evolutionChain.chain.species.name}</div>
                            <div>
                                {evolutionChain.chain.evolves_to.map(
                                    (speciesName) => {
                                        return (
                                            <div key={speciesName.species.name}>
                                                <div>
                                                    {speciesName.species.name}
                                                </div>
                                                <div>
                                                    {speciesName.evolves_to.map(
                                                        (evoSpeciesName) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        evoSpeciesName
                                                                            .species
                                                                            .name
                                                                    }
                                                                >
                                                                    {
                                                                        evoSpeciesName
                                                                            .species
                                                                            .name
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
