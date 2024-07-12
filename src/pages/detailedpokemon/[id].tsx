import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/pokeAPI";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";

export default function DetailedPokemon() {
    const [pokemon, setPokemon] = useState<Pokemon>();
    const router = useRouter();
    if (Array.isArray(router.query.id)) {
        throw "Error: router.query.id is a string array";
    }

    const id = Number(router.query.id);
    useEffect(() => {
        if (Number.isNaN(id)) {
            return;
        }
        api.getPokemonById(id)
            .then((pokemon) => {
                setPokemon(pokemon);
            })
            .catch((reason) => {
                console.log(reason);
            });
    }, [id]);

    if (pokemon === undefined) {
        return (
            <Layout>
                <p>Loading</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <img src={pokemon.sprites.front_default!} />
        </Layout>
    );
}
