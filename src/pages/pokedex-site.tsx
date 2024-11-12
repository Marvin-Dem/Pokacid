import PokemonListCard from "~/components/pokemonListCard";
import PokemonGridCard from "~/components/pokemonGridCard";
import getPokemonByType, { Type, buttonTypes } from "~/utils/pokeTypes";
import { getAllPokemon } from "~/utils/pokeAPI";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";
import Layout from "~/components/Layout";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faGrip } from "@fortawesome/free-solid-svg-icons";

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
    const [dexLayout, setDexLayout] = useState<"list" | "grid">("list");

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
            {/* main content wrapper  */}
            <div className="grid desktop:grid-cols-12 grid-cols-4 gap-y-4 col-span-full content-start gap-x-12">
                {/* button wrapper  */}
                <div className="flex flex-col gap-2 col-span-full desktop:col-span-4">
                    <button
                        className="text-3xl font-bold p-4 text-white border-none rounded-lg duration-300 bg-black text-black-shadow"
                        onClick={() => {
                            setShowTypeBox(!showTypeBox);
                        }}
                    >
                        Show pokemon with the following type:
                    </button>
                    <button
                        className="p-4 text-3xl text-white border-none rounded-lg duration-300 bg-black text-black-shadow"
                        onClick={() => {
                            setPokemonType(undefined);
                        }}
                    >
                        Reset Filter
                    </button>
                </div>
                {/* type box  */}
                <div
                    // margin bottom is necessary for enough space for the type filter container, so it wont overlap the elements below
                    className={`col-span-full desktop:col-span-8 mb-40 desktop:mb-8 transition-all duration-500 transform h-[252px] ${
                        showTypeBox
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                    }`}
                >
                    {showTypeBox && (
                        <div className="grid grid-cols-3 desktop:grid-cols-6 border-4 rounded-lg border-black p-2 gap-2">
                            {buttonTypes.map((buttonType) => {
                                return (
                                    <button
                                        key={buttonType}
                                        className={`${getBackgroundColor(
                                            buttonType
                                        )} p-4 rounded-lg font-bold text-xl text-black-shadow text-white`}
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
                {/* layout select box  */}
                <div className="bg-black rounded-lg w-full flex space-around justify-center gap-12 py-2 col-span-full">
                    <button
                        className="p-2 border-2 border-white rounded-sm text-white"
                        onClick={() => {
                            setDexLayout("list");
                        }}
                    >
                        <FontAwesomeIcon icon={faList} />
                    </button>
                    <button
                        className="p-2 border-2 border-white rounded-sm text-white"
                        onClick={() => {
                            setDexLayout("grid");
                        }}
                    >
                        <FontAwesomeIcon icon={faGrip} />
                    </button>
                </div>
                {/* pokemon list  */}
                <div className="hidden desktop:inline-block desktop:col-span-3">
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
                {dexLayout === "list" && (
                    <div
                        id="pokemon-card-wrapper"
                        className="col-span-full desktop:col-span-9"
                    >
                        {filteredList.map((pokemon) => {
                            return (
                                <PokemonListCard
                                    key={pokemon.name}
                                    pokemon={pokemon}
                                    onMouseEnter={() => {
                                        if (
                                            pokemon.sprites.front_default ===
                                            null
                                        ) {
                                            return;
                                        }

                                        setSpriteImage(
                                            pokemon.sprites.front_default
                                        );
                                    }}
                                    onMouseLeave={() =>
                                        setSpriteImage(undefined)
                                    }
                                />
                            );
                        })}
                    </div>
                )}
                {dexLayout === "grid" && (
                    <div
                        id="pokemon-card-wrapper"
                        className="col-span-full grid desktop:grid-cols-3 grid-cols-2"
                    >
                        {filteredList.map((pokemon) => {
                            return (
                                <PokemonGridCard
                                    key={pokemon.name}
                                    pokemon={pokemon}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
}
