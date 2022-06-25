import {Box, Button, CircularProgress, Container, Grid, styled, Toolbar, Typography} from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import {useGetPokemons} from "../hooks/useGetPokemons";
import {LoadingButton} from "@mui/lab";
import {useState} from "react";
import {PokemonList} from "../types/Pokemon";

export const RootStyle = styled(Box)(() => ({
    width: '100%',
    padding: 50
}));

export const ContainerStyle = styled(Container)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

const TitleStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.h5,
    fontWeight: 600
}));

const ToolbarStyle = styled(Toolbar)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
}));

export default function Home() {
    const [toggleFavorites, setToggleFavorites] = useState(false);
    const handleToggleFavorites = () => setToggleFavorites(value => !value);

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useGetPokemons();

    return (
        <RootStyle>
            <ContainerStyle>
                <ToolbarStyle>
                    <TitleStyle>
                        Pokemon App
                    </TitleStyle>
                    <Button
                        onClick={handleToggleFavorites}
                        sx={{my: 3}}
                        color={"warning"}
                        variant={toggleFavorites ? "contained" : "outlined"}>
                        Favorites
                    </Button>
                </ToolbarStyle>

                {isLoading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {data?.pages.map((group, i) =>
                                group.response.map((pokemon: PokemonList) =>
                                    <Grid key={pokemon.name} item xs={12} md={4}>
                                        <PokemonCard pokemon={pokemon}/>
                                    </Grid>)
                            )}
                        </Grid>
                        <LoadingButton
                            sx={{mt: 5}}
                            loading={isFetchingNextPage}
                            variant={"contained"}
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}>
                            {isFetchingNextPage
                                ? "Loading more..."
                                : hasNextPage
                                    ? "Load More"
                                    : "Nothing more to load"}
                        </LoadingButton>
                    </>
                )}
            </ContainerStyle>
        </RootStyle>
    )
}