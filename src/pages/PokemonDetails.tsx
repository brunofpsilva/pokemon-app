import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Pokemon} from "../types/Pokemon";
import {
    alpha,
    Avatar,
    Box,
    Button,
    Card,
    Container,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import {RootStyle} from "./Home";
import {Abilities} from "../types/Ability";
import useGlobalState from "../hooks/useContext";

const CardStyle = styled(Card)(({theme}) => ({
    padding: 5,
    boxShadow: `0px 2px 30px ${alpha("#000", 0.05)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "all .3s",
    [theme.breakpoints.up('md')]: {
        padding: 20,
    },
}));

const TitleStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.h4,
    fontWeight: 600,
    textTransform: "capitalize",
    textAlign: "center"
}))

const BoxStyle = styled(Box)(({theme}) => ({
    marginTop: 30,
    [theme.breakpoints.up('md')]: {
        width: 400,
    },
}))

const ToolBarStyle = styled(Toolbar)(() => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
}))


export default function PokemonDetails() {
    const {id = ''} = useParams();
    const navigate = useNavigate();
    const {addToFavorites, checkFavourites, removeFromFavorites} = useGlobalState();

    const [pokemon, setPokemon] = useState<Pokemon>({
        height: 0,
        abilities: [],
        id: '1',
        base_experience: 0,
        name: '',
        weight: 0,
        url: 'https://pokeapi.co/api/v2/pokemon/1/'
    });

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(data => {
                return data.json()
            })
            .then(data => {
                setPokemon({
                    weight: data.weight,
                    name: data.name,
                    base_experience: data.base_experience,
                    abilities: data.abilities,
                    id: data.id,
                    height: data.height,
                    url: `https://pokeapi.co/api/v2/pokemon/${id}/`
                })
            }).catch(err => {
            console.log(err);
        })
    }, [id]);

    let checkFav: boolean = checkFavourites({
        name: pokemon.name,
        url: pokemon.url
    });

    const handleButtonHome = () => {
        navigate("/");
    }

    const handleAddToFavourites = () => (
        !checkFav ?
            addToFavorites({
                name: pokemon.name,
                url: pokemon.url
            }) :
            null
    )

    const handleRemoveFromFavourites = () => {
        removeFromFavorites({
            name: pokemon.name,
            url: pokemon.url
        });
    }

    return (
        <RootStyle>
            <Container>
                <CardStyle>
                    <ToolBarStyle>
                        <Button onClick={handleButtonHome} variant={"contained"}>Home</Button>
                        {checkFav ?
                            <Button
                                onClick={handleRemoveFromFavourites}
                                color={"warning"}
                                variant={"contained"}>
                                Remove From Favorites
                            </Button>
                            :
                            <Button
                                onClick={handleAddToFavourites}
                                color={"warning"}
                                variant={"outlined"}>
                                Add To Favorites
                            </Button>
                        }
                    </ToolBarStyle>
                    <Avatar
                        sx={{
                            height: "300px",
                            width: "300px"
                        }}
                        alt={pokemon.name}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    />
                    <TitleStyle>{pokemon.name}</TitleStyle>
                    <BoxStyle>
                        <Typography variant={"subtitle1"}><b>ID: </b> {pokemon.id}</Typography>
                        <Typography variant={"subtitle1"}><b>Height: </b> {pokemon.height}</Typography>
                        <Typography variant={"subtitle1"}><b>Weight: </b> {pokemon.weight}</Typography>
                        <Typography variant={"subtitle1"}>
                            <b>Base Experience: </b> {pokemon.base_experience}
                        </Typography>
                        <List subheader={
                            <ListSubheader sx={{p: 0}} component={"div"}>
                                Abilities
                            </ListSubheader>
                        }>
                            {pokemon.abilities.map((ability: Abilities) => {
                                return (
                                    <ListItem key={ability.ability.name} sx={{p: 0}}>
                                        <ListItemText
                                            primaryTypographyProps={{
                                                textTransform: "capitalize"
                                            }}
                                            primary={ability.ability.name}
                                            secondary={"Slot: " + ability.slot}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </BoxStyle>
                </CardStyle>
            </Container>
        </RootStyle>
    )
}