import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/pokeAPI";
import { Fragment, useEffect, useState } from "react";
import { Pokemon, PokemonSpecies, Ability } from "pokenode-ts";
import { useRef } from "react";
import Image from "next/image";
import { getBackgroundColor } from "~/pages/pokedex-site";
import { Type } from "~/utils/pokeTypes";

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
    const [isShiny, setIsShiny] = useState<boolean>(false);
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
            })
            .catch((reason) => {
                console.log(reason);
            });
    }, [id]);
    if (
        pokemon === undefined ||
        pokemonSpecies === undefined ||
        abilities === undefined
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
            <div className="flex gap-3.5">
                <div className="flex flex-col gap-3.5">
                    <Image
                        alt="Pokemon sprite"
                        width="250"
                        height="250"
                        className="h-min-[250px] w-min-[250px] border-8 border-double border-black rounded-xl cursor-pointer bg-white bg-opacity-20"
                        src={
                            isShiny
                                ? pokemon.sprites.front_shiny!
                                : pokemon.sprites.front_default!
                        }
                        onClick={() => setIsShiny(!isShiny)}
                    />
                    {/* Base Stat Container */}
                    <div className="flex flex-col gap-4 border-2 border-black rounded-lg p-4 bg-white bg-opacity-20">
                        <span className="text-xl border-b-4 font-bold border-black">
                            Base Stats:
                        </span>
                        <div className="grid grid-cols-2 gap-y-1">
                            {pokemon.stats.map((stat) => {
                                return (
                                    <Fragment key={stat.stat.name}>
                                        <span className="text-lg">
                                            {statMap.get(stat.stat.name)}
                                        </span>
                                        <span className="text-lg">
                                            {stat.base_stat || "-"}
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </div>
                        <span className="text-xl font-bold">
                            Total Base Stat: {totalStats}
                        </span>
                    </div>
                    {/* Ability Container */}
                    <div className="flex flex-col border-2 border-black rounded-lg p-4 bg-white bg-opacity-20">
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
                <div className="flex w-full items-start flex-col gap-2.5">
                    {/* Upper Detail Container */}
                    <div className="flex border-2 border-black rounded-lg gap-8 items-center p-3.5 bg-white bg-opacity-20">
                        <div className="flex flex-col gap-3.5">
                            <div className="flex gap-3.5">
                                <span className="text-3xl font-bold">{`#${pokemon.id}`}</span>
                                <span className="text-3xl font-bold">
                                    {pokemon.name}
                                </span>
                            </div>
                            <div>
                                <span className="text-3xl font-bold mt-1">
                                    jap: {japname?.name || "-"}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col text-3xl gap-3.5">
                            <span className="text-3xl font-bold">
                                habitat: {pokemonSpecies.habitat.name}{" "}
                            </span>
                            <span className="text-3xl font-bold">
                                existing since: Generation{" "}
                                {gen?.toUpperCase() || "-"}
                            </span>
                        </div>
                        <div className="gap-3 flex flex-col">
                            {pokemon.types.map((type) => {
                                return (
                                    <span
                                        className={`${getBackgroundColor(
                                            type.type.name as Type
                                        )} border-2 border-black rounded-lg p-1.5 text-3xl`}
                                        key={type.type.name}
                                    >
                                        {type.type.name}
                                    </span>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => {
                                audioRef.current?.play();
                            }}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4028/4028535.png"
                                className="w-auto h-[100px]"
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
