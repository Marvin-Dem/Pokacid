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

export default function PokemonCard() {}
