import {Pokemon} from "../types/pokemon";
import {alpha, Avatar, Box, Card, styled, Typography} from "@mui/material";

type Props = {
    pokemon: Pokemon,
    index: number
}

const CardStyle = styled(Card)(() => ({
    padding: 10,
    boxShadow: `0px 2px 30px ${alpha("#000", 0.05)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer"
}));

const TitleStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.body1,
    fontWeight: 600,
    textTransform: "capitalize",
    textAlign: "center"
}))

export default function PokemonCard({pokemon, index}: Props) {
    let index_1: string | undefined = pokemon.url.split("https://pokeapi.co/api/v2/pokemon-species/").pop();
    let index_2: string | undefined = index_1 ? index_1.split("/").pop() : "";

    return (
        <CardStyle>
            <Avatar
                sx={{
                    height: "150px",
                    width: "150px"
                }}
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
            />
            <TitleStyle>{pokemon.name}</TitleStyle>
        </CardStyle>
    )
}