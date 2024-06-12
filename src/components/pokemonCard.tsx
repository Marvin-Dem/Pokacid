// function PokemonCard({ pokemon }: PokemonCardProps) {
//     const completeCard = document.createElement("div");
//     completeCard.classList.add("general");

//     const pokeName = document.createElement("div");
//     pokeName.innerText = pokemon.name;
//     pokeName.classList.add("poke-name");
//     completeCard.appendChild(pokeName);

//     const pokeId = document.createElement("p");
//     pokeId.classList.add("poke-number");
//     pokeId.innerText = pokemon.id.toString();
//     completeCard.appendChild(pokeId);

//     const pokeAudio = AudioButton({ url: pokemon.cries.latest });
//     completeCard.appendChild(pokeAudio);

//     if (pokemon.sprites.front_default !== null) {
//         const pokeSprite = PokeSprite({ url: pokemon.sprites.front_default });
//         completeCard.appendChild(pokeSprite);
//     }
//     for (let type of pokemon.types) {
//         const pokeType = document.createElement("p");
//         pokeType.innerText = type.type.name;
//         pokeType.classList.add("poke-type");
//         completeCard.appendChild(pokeType);
//         if (type === pokemon.types[0]) {
//             completeCard.classList.add(type.type.name);
//         }
//     }

//     return completeCard;
// }
import type { Pokemon } from "pokenode-ts";

type PokemonCardProps = {
    pokemon: Pokemon;
};
export default function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div id="pokemon-list-wrapper">
            <div className={`general ${pokemon.types[0]!.type.name}`}>
                <div className="poke-name">{pokemon.name}</div>
                <p className="poke-number">{pokemon.id}</p>
                <button className="audio-button">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4028/4028535.png"
                        className="audio-button"
                    />
                    <audio src={pokemon.cries.legacy}></audio>
                </button>
                <img src={pokemon.sprites.front_default!} />
                {pokemon.types.map((type) => {
                    return (
                        <p
                            className="poke-type"
                            key={type.type.name}
                        >{`${type.type.name}`}</p>
                    );
                })}
            </div>
        </div>
    );
}
