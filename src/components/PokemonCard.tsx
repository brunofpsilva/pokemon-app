import {Pokemon} from "../types/pokemon";
import {Card, Typography} from "@mui/material";

type Props = {
    pokemon: Pokemon
}

export default function PokemonCard({pokemon}: Props) {
    return (
        <Card>
            <Typography variant={"h4"}>{pokemon.name}</Typography>
        </Card>
    )
}