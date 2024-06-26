import type { Pokemon } from "pokenode-ts";
import { useRef } from "react";

type PokemonCardProps = {
    pokemon: Pokemon;
};
export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <div className={`general ${pokemon.types[0]!.type.name}`}>
            <div className="poke-name">{pokemon.name}</div>
            <p className="poke-number">{pokemon.id}</p>
            <button
                className="audio-button"
                onClick={() => {
                    audioRef.current?.play();
                }}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4028/4028535.png"
                    className="audio-button"
                />
                <audio ref={audioRef} src={pokemon.cries.legacy}></audio>
            </button>
            <img src={pokemon.sprites.front_default!} />
            {pokemon.types.map((type) => {
                return (
                    <p className="poke-type" key={type.type.name}>
                        {type.type.name}
                    </p>
                );
            })}
        </div>
    );
}
