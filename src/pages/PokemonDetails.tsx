import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Pokemon} from "../types/Pokemon";
import {
    alpha,
    Avatar,
    Box,
    Card,
    Container,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    styled,
    Typography
} from "@mui/material";
import {RootStyle} from "./Home";
import {Abilities} from "../types/Ability";

const CardStyle = styled(Card)(() => ({
    padding: 10,
    boxShadow: `0px 2px 30px ${alpha("#000", 0.05)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "all .3s",
}));

const TitleStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.h4,
    fontWeight: 600,
    textTransform: "capitalize",
    textAlign: "center"
}))

const BoxStyle = styled(Box)(({theme}) => ({
    marginTop: 30,
    width: 400
}))


export default function PokemonDetails() {
    const {id = ''} = useParams();

    const [pokemon, setPokemon] = useState<Pokemon>({
        height: 0,
        abilities: [],
        id: '',
        base_experience: 0,
        name: '',
        weight: 0
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
                    height: data.height
                })
            }).catch(err => {
            console.log(err);
        })
    }, [id]);

    return (
        <RootStyle>
            <Container>
                <CardStyle>
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
                                    <ListItem sx={{p: 0}}>
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