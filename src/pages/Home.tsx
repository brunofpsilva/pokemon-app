import {Box, Container, Grid, LinearProgress, styled, Typography} from "@mui/material";
import {useGetPokemons} from "../hooks/useGetPokemons";
import {useState} from "react";
import PokemonCard from "../components/PokemonCard";
import {Pokemon} from "../types/pokemon";
import {LoadingButton} from "@mui/lab";

const RootStyle = styled(Box)(() => ({
    width: '100%',
    padding: 50
}));

const ContainerStyle = styled(Container)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

export default function Home() {
    const [page, setPage] = useState(0);
    const {isLoading, isSuccess, data} = useGetPokemons(page);

    return (
        <RootStyle>
            <ContainerStyle>
                <Typography sx={{mb: 5}} variant={"h5"}>Pokemon App</Typography>
                <Grid container spacing={3}>
                    {
                        isLoading && <LinearProgress/>
                    }
                    {
                        isSuccess && data.results.map((pokemon: Pokemon, index: number) => (
                            <Grid item md={4} xs={12}>
                                <PokemonCard key={pokemon.name} pokemon={pokemon} index={index + 1}/>
                            </Grid>
                        ))
                    }
                </Grid>
                <LoadingButton sx={{mt: 10}} variant={"contained"}>Load More</LoadingButton>
            </ContainerStyle>
        </RootStyle>
    )
}