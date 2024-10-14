import PokemonCard from "~/components/pokemonCard";
import getPokemonByType, { Type, buttonTypes } from "~/utils/pokeTypes";
import { getAllPokemon } from "~/utils/pokeAPI";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";
import Layout from "~/components/Layout";
import Image from "next/image";

export function getBackgroundColor(pokeType: Type) {
    if (pokeType === "water") {
        return "bg-water";
    } else if (pokeType === "fire") {
        return "bg-fire";
    } else if (pokeType === "grass") {
        return "bg-grass";
    } else if (pokeType === "normal") {
        return "bg-normal";
    } else if (pokeType === "rock") {
        return "bg-rock";
    } else if (pokeType === "ground") {
        return "bg-ground";
    } else if (pokeType === "electric") {
        return "bg-electric";
    } else if (pokeType === "flying") {
        return "bg-flying";
    } else if (pokeType === "ice") {
        return "bg-ice";
    } else if (pokeType === "dragon") {
        return "bg-dragon";
    } else if (pokeType === "ghost") {
        return "bg-ghost";
    } else if (pokeType === "psychic") {
        return "bg-psychic";
    } else if (pokeType === "poison") {
        return "bg-poison";
    } else if (pokeType === "bug") {
        return "bg-bug";
    } else if (pokeType === "steel") {
        return "bg-steel";
    } else if (pokeType === "fairy") {
        return "bg-fairy";
    } else if (pokeType === "fighting") {
        return "bg-fighting";
    } else if (pokeType === "dark") {
        return "bg-dark";
    }
}

export default function PokedexSite() {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [pokemonType, setPokemonType] = useState<Type>();
    const [spriteImage, setSpriteImage] = useState<string>();
    const [showTypeBox, setShowTypeBox] = useState<boolean>(false);

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
            <div className="grid grid-cols-3 gap-2 gap-x-12">
                <div className="flex flex-col gap-2">
                    <button
                        className="text-3xl font-bold p-4 text-white border-none rounded-3xl duration-300 bg-gray-500 text-shadow"
                        onClick={() => {
                            setShowTypeBox(!showTypeBox);
                        }}
                    >
                        Show pokemon with the following type:
                    </button>
                    <button
                        className="p-4 text-3xl text-white border-none rounded-3xl duration-300 bg-gray-500 text-shadow"
                        onClick={() => {
                            setPokemonType(undefined);
                        }}
                    >
                        Reset Filter
                    </button>
                </div>
                {/* Ensures that there is enough space for the type filter container, so the elements positions below are not affected by it by the state. */}
                <div
                    className={`col-span-2 mb-8 transition-all duration-500 transform h-[252px] ${
                        showTypeBox
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                    }`}
                >
                    {showTypeBox && (
                        <div className="grid grid-cols-6 border-4 rounded-xl border-black p-2 gap-2">
                            {buttonTypes.map((buttonType) => {
                                return (
                                    <button
                                        key={buttonType}
                                        className={`${getBackgroundColor(
                                            buttonType
                                        )} p-4 rounded-lg font-bold text-xl text-shadow text-white`}
                                        onClick={() => {
                                            setPokemonType(buttonType);
                                        }}
                                    >
                                        {buttonType}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div>
                    {spriteImage !== undefined && (
                        <Image
                            src={spriteImage || ""}
                            alt="pokemon sprite"
                            className="pixelated sticky top-0 w-full"
                            width={96}
                            height={96}
                        />
                    )}
                </div>
                <div id="pokemon-card-wrapper" className="col-span-2">
                    {filteredList.map((pokemon) => {
                        return (
                            <PokemonCard
                                key={pokemon.name}
                                pokemon={pokemon}
                                onMouseEnter={() => {
                                    if (
                                        pokemon.sprites.front_default === null
                                    ) {
                                        return;
                                    }

                                    setSpriteImage(
                                        pokemon.sprites.front_default
                                    );
                                }}
                                onMouseLeave={() => setSpriteImage(undefined)}
                            />
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
