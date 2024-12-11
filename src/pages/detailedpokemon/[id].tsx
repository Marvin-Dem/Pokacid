import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api, evolutionApi } from "~/utils/pokeAPI";
import { Fragment, useEffect, useState } from "react";
import {
    Pokemon,
    PokemonSpecies,
    Ability,
    EvolutionChain,
    ChainLink,
} from "pokenode-ts";
import { useRef } from "react";
import Image from "next/image";
import { getBackgroundColor } from "~/pages/pokedex-site";
import { Type } from "~/utils/pokeTypes";
import Link from "next/link";

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
    const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>();
    const [evolutionSpecies, setEvolutionSpecies] = useState<PokemonSpecies[]>(
        []
    );
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
                        const evolutionNames: string[] = [];
                        function getEvolutionName(chainLink: ChainLink) {
                            evolutionNames.push(chainLink.species.name);
                            chainLink.evolves_to.forEach((chainLinkChild) => {
                                getEvolutionName(chainLinkChild);
                            });
                        }
                        getEvolutionName(evolutionChain.chain);
                        const promises = evolutionNames.map((evolutionName) => {
                            const promise =
                                api.getPokemonSpeciesByName(evolutionName);
                            return promise;
                        });
                        Promise.all(promises).then((evolutionSpecies) => {
                            setEvolutionSpecies(evolutionSpecies);
                        });
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

    const engName = pokemonSpecies.names.find(
        (pokename) => pokename.language.name === "en"
    );
    if (engName === undefined) {
        return "Pokemon Name is missing.";
    }

    const evolutionNames = evolutionSpecies.map((evolutionSpecies) => {
        return evolutionSpecies.names.find(
            (evolutionName) => evolutionName.language.name === "en"
        );
    });
    if (evolutionNames === undefined) {
        return "Pokemon Name is missing.";
    }

    return (
        <Layout>
            <div className="grid desktop:grid-cols-12 grid-cols-4 gap-4">
                {/* left wrapper */}
                <div className="grid gap-3.5 grid-cols-subgrid desktop:col-span-3 col-span-full content-start">
                    <Image
                        alt="Pokemon sprite"
                        width="96"
                        height="96"
                        className="pixelated w-full border-8 border-double border-black rounded-xl cursor-pointer bg-white/20 col-span-full hover:bg-white/30 transition-colors duration-300"
                        src={
                            isShiny
                                ? pokemon.sprites.front_shiny!
                                : pokemon.sprites.front_default!
                        }
                        onClick={() => setIsShiny(!isShiny)}
                    />
                    {/* Base Stat Container */}
                    <div className="flex flex-col gap-4 border-2 border-black rounded-lg p-4 bg-white/20 col-span-full">
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
                    <div className="flex flex-col border-2 border-black rounded-lg p-4 bg-white/20 col-span-full">
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
                {/* right wrapper */}
                <div className="grid grid-cols-subgrid desktop:col-span-9 col-span-full content-start gap-2">
                    {/* Upper Detail Container */}
                    <div className="flex desktop:flex-row flex-col gap-8 col-span-full border-2 border-black rounded-lg p-3.5 bg-white/20">
                        {/* name wrapper */}
                        <div className="flex flex-col gap-3.5">
                            <div className="flex gap-3.5">
                                <span className="text-3xl font-bold">{`#${pokemon.id}`}</span>
                                <span className="text-3xl font-bold">
                                    {engName.name}
                                </span>
                            </div>
                            <div>
                                <span className="text-3xl font-bold mt-1">
                                    jap: {japname?.name || "-"}
                                </span>
                            </div>
                        </div>
                        {/* habitat gen wrapper */}
                        <div className="flex flex-col text-3xl gap-3.5">
                            <span className="text-3xl font-bold">
                                habitat: {pokemonSpecies.habitat?.name || "-"}{" "}
                            </span>
                            <span className="text-3xl font-bold">
                                existing since: Generation{" "}
                                {gen?.toUpperCase() || "-"}
                            </span>
                        </div>
                        {/* pokemon type wrapper */}
                        <div className="gap-3 flex desktop:flex-col">
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
                            <Image
                                src="/PlayButton.png"
                                alt="audio button"
                                width={96}
                                height={96}
                            />
                            <audio
                                ref={audioRef}
                                src={pokemon.cries.legacy}
                            ></audio>
                        </button>
                    </div>
                    {/* evolution wrapper  */}
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 col-span-full border-2 border-black rounded-lg p-2 bg-white/20">
                        {evolutionSpecies.length > 0 &&
                            evolutionNames.length > 0 && (
                                <Link
                                    href={`/detailedpokemon/${evolutionSpecies[0]?.id}`}
                                    className="text-xl border-2 border-black rounded-lg p-1 gap-0.5  hover:bg-white/30 transition-colors duration-300"
                                >
                                    {evolutionNames[0]?.name}
                                </Link>
                            )}
                        {evolutionChain.chain.evolves_to.map((chainLink) => {
                            return (
                                <EvolvesTo
                                    key={chainLink.species.name}
                                    chainLink={chainLink}
                                    evoStage={1}
                                    evolutionSpecies={evolutionSpecies}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

type EvolvesToProps = {
    chainLink: ChainLink;
    evoStage: number;
    evolutionSpecies: PokemonSpecies[];
};

function EvolvesTo({ chainLink, evoStage, evolutionSpecies }: EvolvesToProps) {
    let className;
    if (evoStage < 1) {
        console.error("Value of evoStage is <1");
        return null;
    } else if (evoStage === 1) {
        className = "col-start-1";
    } else if (evoStage === 2) {
        className = "col-start-2";
    }
    const pokemonSpecies = evolutionSpecies.find(
        (pokemonSpecies) => chainLink.species.name === pokemonSpecies.name
    );
    if (pokemonSpecies === undefined) {
        return null;
    }

    const engSpeciesName = pokemonSpecies.names.find(
        (evolutionName) => evolutionName.language.name === "en"
    );

    return (
        <>
            <div className={className}>
                <div className={className}>
                    {(() => {
                        const evoCondition = chainLink.evolution_details[0];

                        if (evoCondition === undefined) {
                            return;
                        }
                        if (
                            evoCondition.trigger.name === "level-up" &&
                            evoCondition.min_level !== null
                        ) {
                            return `Level ${evoCondition.min_level}`;
                        }

                        if (
                            evoCondition.trigger.name === "trade" &&
                            evoCondition.held_item !== null
                        ) {
                            return `Trade with ${evoCondition.held_item.name}`;
                        }

                        if (
                            evoCondition.trigger.name === "trade" &&
                            evoCondition.held_item === null
                        ) {
                            return "Trade";
                        }

                        if (evoCondition.trigger.name === "use-item") {
                            return evoCondition.item?.name;
                        }
                        if (evoCondition.min_happiness !== null) {
                            return `Friendship Level ${evoCondition.min_happiness}`;
                        }
                        if (evoCondition.location !== null) {
                            return `Level up at ${evoCondition.location?.name}`;
                        }
                        if (
                            evoCondition.min_affection !== null &&
                            evoCondition.trigger.name === "level-up"
                        ) {
                            return `Level up at min affection ${evoCondition.min_affection}`;
                        }
                        return "Evolution Condition not found yet.";
                    })()}
                </div>
                <div className="text-3xl"> {"\u21B3"} </div>
            </div>
            <Link
                href={`/detailedpokemon/${pokemonSpecies.id}`}
                className="border-2 border-black rounded-lg text-xl p-1 flex items-center  hover:bg-white/30 transition-colors duration-300"
            >
                {engSpeciesName?.name}
            </Link>
            {chainLink.evolves_to.map((evoChainLink) => {
                return (
                    <EvolvesTo
                        key={evoChainLink.species.name}
                        chainLink={evoChainLink}
                        evoStage={evoStage + 1}
                        evolutionSpecies={evolutionSpecies}
                    />
                );
            })}
        </>
    );
}
