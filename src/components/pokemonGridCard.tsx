import Image from "next/image";
import type { Pokemon } from "pokenode-ts";
import { useRef, useEffect, useState } from "react";
import { getBackgroundColor } from "~/pages/pokedex-site";
import { Type } from "~/utils/pokeTypes";

type PokemonCardProps = {
    pokemon: Pokemon;
};
export default function PokemonGridCard({ pokemon }: PokemonCardProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [listVisible, setListVisible] = useState(false);

    useEffect(() => {
        setListVisible(true);
    }, []);

    return (
        <div className="flex items-center">
            <div
                className={`${getBackgroundColor(
                    pokemon.types[0]!.type.name as Type
                )} justify-between p-2 flex border-2 border-black w-full rounded-3xl transition-all duration-500 ${
                    listVisible
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0"
                }`}
            >
                <div className="flex flex-col gap-y-1 w-full">
                    <div className="flex font-bold text-3xl gap-1">
                        <span className="w-[4ch]">{pokemon.id}</span>
                        <a href={`/detailedpokemon/${pokemon.id}`}>
                            {pokemon.name}
                        </a>
                    </div>
                    {/* Ensures that there is always enough space for two types and the sprite image. */}
                    <div className="flex justify-between items-center px-1.5">
                        <div className="flex flex-col h-[72px] justify-center">
                            {pokemon.types.map((type) => {
                                return (
                                    <span
                                        className="text-2xl w-[8ch] font-semibold"
                                        key={type.type.name}
                                    >
                                        {type.type.name}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="rounded-full h-[72px] w-[72px]">
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
                    </div>
                </div>
                {pokemon.sprites.front_default !== null && (
                    <Image
                        src={pokemon.sprites.front_default}
                        alt="pokemon sprite"
                        width={96}
                        height={96}
                        className="p-2 h-32 w-32"
                    />
                )}
            </div>
        </div>
    );
}
