import Image from "next/image";
import type { Pokemon } from "pokenode-ts";
import { useRef, useEffect, useState } from "react";
import { getBackgroundColor } from "~/pages/pokedex-site";
import { Type } from "~/utils/pokeTypes";

type PokemonCardProps = {
    pokemon: Pokemon;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};
export default function PokemonListCard({
    pokemon,
    onMouseEnter,
    onMouseLeave,
}: PokemonCardProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [listVisible, setListVisible] = useState(false);

    useEffect(() => {
        setListVisible(true);
    }, []);

    return (
        <div
            className={`${getBackgroundColor(
                pokemon.types[0]!.type.name as Type
            )} items-center justify-between p-1.5 flex border-2 border-black rounded-3xl transition-all duration-500 ${
                listVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="flex items-center gap-4 font-bold text-5xl">
                <span className="w-[4ch] text-center">{pokemon.id}</span>
                <a href={`/detailedpokemon/${pokemon.id}`} className="w-[15ch]">
                    {pokemon.name}
                </a>
            </div>
            {/* Ensures that there is always enough space for two types. */}
            <div className="flex flex-col h-[72px]">
                {pokemon.types.map((type) => {
                    return (
                        <span
                            className="text-3xl w-[8ch] font-semibold"
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
                    <audio ref={audioRef} src={pokemon.cries.legacy}></audio>
                </button>
            </div>
        </div>
    );
}
