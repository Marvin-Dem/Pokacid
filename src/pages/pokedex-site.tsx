/* eslint-disable @next/next/no-img-element */
import PokemonCard from "~/components/pokemonCard";
import getPokemonByType, { Type, buttonTypes } from "~/utils/pokeTypes";
import { getAllPokemon } from "~/utils/pokeAPI";
import { useEffect, useState } from "react";
import { Pokemon, PokemonSprites } from "pokenode-ts";
import Layout from "~/components/Layout";

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
            <div className="grid grid-cols-3">
                <div className="flex flex-col w-2/3">
                    <button
                        className="text-3xl font-bold p-4 text-white border-none rounded-3xl cursor-pointer duration-300 bg-gray-500 textshadow"
                        onClick={() => {
                            setShowTypeBox(true);
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
                <div>
                    {showTypeBox && (
                        <div className="grid grid-cols-6 border-2 rounded-xl border-black p-2 gap-2 gap-x-2 w-fit col-span-2 min-w-fit">
                            {buttonTypes.map((buttonType) => {
                                return (
                                    <button
                                        key={buttonType}
                                        className={`${buttonType} h-16 w-32`}
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
                        <img
                            src={spriteImage?.front_default || undefined}
                            alt="pokemon sprite"
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

//type buttons sollen optional sein
//Scrolling anpassen
//Dexlayout fixen
