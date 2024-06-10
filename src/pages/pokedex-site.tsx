import { buttonTypes } from "~/utils/pokeTypes";

export default function PokedexSite() {
    return (
        <div>
            <div className="header">
                Show Pokemon with the following type:
                <button className="button reset">Reset Filter</button>
            </div>
            <div className="button-wrapper">
                {buttonTypes.map((item) => {
                    return (
                        <button className={`button ${item} filter-button `}>
                            {item}
                        </button>
                    );
                })}
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
