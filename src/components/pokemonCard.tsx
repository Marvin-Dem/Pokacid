/* eslint-disable @next/next/no-img-element */
import type { Pokemon } from "pokenode-ts";
import { useRef } from "react";

type PokemonCardProps = {
    pokemon: Pokemon;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};
export default function PokemonCard({
    pokemon,
    onMouseEnter,
    onMouseLeave,
}: PokemonCardProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <div
            className={`${
                pokemon.types[0]!.type.name
            } items-center justify-between p-1.5 flex border-2 border-black rounded-3xl`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="text-3xl flex items-center gap-4 font-bold text-5xl">
                <span className="w-[4ch] text-center">{pokemon.id}</span>
                <a href={`/detailedpokemon/${pokemon.id}`} className="w-[15ch]">
                    {pokemon.name}
                </a>
            </div>
            <div className="flex flex-col h-[72px]">
                {pokemon.types.map((type) => {
                    return (
                        <span className="text-3xl w-[8ch]" key={type.type.name}>
                            {type.type.name}
                        </span>
                    );
                })}
            </div>
            <div className="border-none rounded-full h-[72px] w-[72px]">
                <button
                    onClick={() => {
                        audioRef.current?.play();
                    }}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4028/4028535.png"
                        alt="audio button"
                    />
                    <audio ref={audioRef} src={pokemon.cries.legacy}></audio>
                </button>
            </div>
        </div>
    );
}
