import {PokemonList} from "../types/Pokemon";
import {alpha, Avatar, Card, styled, Typography} from "@mui/material";
import {getIndexByUrl} from "../utils/stringutils";
import {useNavigate} from "react-router-dom";

type Props = {
    pokemon: PokemonList
}

const CardStyle = styled(Card)(() => ({
    padding: 10,
    boxShadow: `0px 2px 30px ${alpha("#000", 0.05)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "all .3s",
    '&:hover': {
        backgroundColor: alpha("#000", 0.05)
    }
}));

const TitleStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.body1,
    fontWeight: 600,
    textTransform: "capitalize",
    textAlign: "center"
}))

export default function PokemonCard({pokemon}: Props) {
    const navigate = useNavigate();

    const index = getIndexByUrl(pokemon.url);

    const handleRedirect = () => {
        navigate(`/${index}`);
    }

    return (
        <CardStyle onClick={handleRedirect}>
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