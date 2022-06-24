import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function PokemonDetails() {
    const {id = ''} = useParams();

    const [Pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(data => {
                return data.json()
            })
            .then(data => {
                setPokemon(data)
            }).catch(err => {
            console.log(err);
        })
    }, [id]);

    console.log(Pokemon);

    return (
        <div></div>
    )
}