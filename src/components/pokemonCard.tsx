/* eslint-disable @next/next/no-img-element */
import type { Pokemon } from "pokenode-ts";
import { useRef } from "react";

type PokemonCardProps = {
    pokemon: Pokemon;
};
export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <div className={`general ${pokemon.types[0]!.type.name}`}>
            <a className="poke-name" href={`/detailedpokemon/${pokemon.id}`}>
                {pokemon.name}
            </a>
            <div className="inner-card-wrapper">
                <div className="poke-card-wrap-1">
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
                        <audio
                            ref={audioRef}
                            src={pokemon.cries.legacy}
                        ></audio>
                    </button>
                    <span className="poke-number">{pokemon.id}</span>
                </div>
                <div className="poke-card-wrap-2">
                    {pokemon.types.map((type) => {
                        return (
                            <span className="poke-type" key={type.type.name}>
                                {type.type.name}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
