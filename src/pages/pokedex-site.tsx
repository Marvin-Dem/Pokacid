import PokemonCard from "~/components/pokemonCard";
import getPokemonByType, { Type, buttonTypes } from "~/utils/pokeTypes";
import { getAllPokemon } from "~/utils/pokeAPI";
import { useEffect, useState } from "react";
import { Pokemon, PokemonSprites } from "pokenode-ts";
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
    const [spriteImage, setSpriteImage] = useState<PokemonSprites>();
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
            <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-2 w-3/4">
                    <button
                        className="text-3xl font-bold p-4 text-white border-none rounded-3xl cursor-pointer duration-300 bg-gray-500 textshadow"
                        onClick={() => {
                            setShowTypeBox(!showTypeBox);
                        }}
                    >
                        Show pokemon with the following type:
                    </button>
                    <button
                        className="p-4 text-3xl text-white border-none rounded-3xl cursor-pointer duration-300 bg-gray-500 textshadow"
                        onClick={() => {
                            setPokemonType(undefined);
                        }}
                    >
                        Reset Filter
                    </button>
                </div>
                <div
                    className={`col-span-2 mb-8 transition-all duration-500 ease-in-out transform h-[252px] ${
                        showTypeBox
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                    }`}
                >
                    {showTypeBox && (
                        <div className="grid grid-cols-6 border-4 rounded-xl border-black p-2 gap-2 min-w-fit">
                            {buttonTypes.map((buttonType) => {
                                return (
                                    <button
                                        key={buttonType}
                                        className={`${getBackgroundColor(
                                            buttonType
                                        )} p-4 rounded-lg font-bold text-xl textshadow text-white`}
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
                    {spriteImage?.front_default !== undefined && (
                        <Image
                            src={spriteImage?.front_default || ""}
                            alt="pokemon sprite"
                            className="w-2/3 pixelated sticky top-0"
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
                                onMouseEnter={() =>
                                    setSpriteImage(pokemon.sprites)
                                }
                                onMouseLeave={() => setSpriteImage(undefined)}
                            />
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
