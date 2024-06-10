export default function PokedexSite() {
    return (
        <div>
            <div className="header">
                Show Pokemon with the following type:
                <button className="button reset">Reset Filter</button>
            </div>
            <div className="button-wrapper">
                <button className="button water filter-button">water</button>
                <button className="button fire filter-button">fire</button>
            </div>
            <div id="pokemon-list-wrapper">
                <div className="general grass">
                    <div className="poke-name">bulbasaur</div>
                    <p className="poke-number">1</p>
                    <button className="audio-button">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4028/4028535.png"
                            className="audio-button"
                        />
                        <audio src="https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg"></audio>
                    </button>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" />
                    <p className="poke-type">grass</p>
                    <p className="poke-type">poison</p>
                </div>
            </div>
        </div>
    );
}

// function Avatar({ person, size }: AvatarProps) {
//     return (
//         <img
//             className="avatar"
//             src={
//                 "https://profile-images.xing.com/images/69f8e0b08c631937469942a9f88c7ce6-1/marvin-demirkaya.1024x1024.jpg"
//             }
//             alt={person.name}
//             width={size}
//             height={size}
//         />
//     );
// }
