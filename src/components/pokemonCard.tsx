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
            className={`general ${pokemon.types[0]!.type.name}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="text-3xl flex items-center justify-center gap-4 font-bold text-5xl">
                <span>{pokemon.id}</span>
                <a href={`/detailedpokemon/${pokemon.id}`}>{pokemon.name}</a>
            </div>
            <div className="flex flex-col">
                {pokemon.types.map((type) => {
                    return (
                        <span className="poke-type" key={type.type.name}>
                            {type.type.name}
                        </span>
                    );
                })}
            </div>
            <button
                className="audio-button"
                onClick={() => {
                    audioRef.current?.play();
                }}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4028/4028535.png"
                    className="audio-button"
                    alt="audio button"
                />
                <audio ref={audioRef} src={pokemon.cries.legacy}></audio>
            </button>
        </div>
    );
}
