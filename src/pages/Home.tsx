import {Box, Container, Grid, LinearProgress, styled} from "@mui/material";
import {useGetPokemons} from "../hooks/useGetPokemons";
import {useState} from "react";
import PokemonCard from "../components/PokemonCard";
import {Pokemon} from "../types/pokemon";

const RootStyle = styled(Box)(() => ({
    width: '100%',
    height: '100vh',
}));

export default function Home() {
    const [page, setPage] = useState(0);
    const {isLoading, isSuccess, data} = useGetPokemons(page);

    return (
        <RootStyle>
            <Container>
                <Grid container spacing={3}>
                    {
                        isLoading && <LinearProgress/>
                    }
                    {
                        isSuccess && data.results.map((pokemon: Pokemon) => (
                            <Grid md={4} xs={12}>
                                <PokemonCard key={pokemon.name} pokemon={pokemon}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </RootStyle>
    )
}