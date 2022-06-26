import {Box, Button, CircularProgress, Container, Grid, styled, Toolbar, Typography} from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import {useGetPokemons} from "../hooks/useGetPokemons";
import {LoadingButton} from "@mui/lab";
import {PokemonList} from "../types/Pokemon";
import {useNavigate} from "react-router-dom";

export const RootStyle = styled(Box)(({theme}) => ({
    width: '100%',
    padding: 10,
    [theme.breakpoints.up('md')]: {
        padding: 30,
    },
}));

export const ContainerStyle = styled(Container)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

export const TitleStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.h5,
    fontWeight: 600
}));

export const ToolbarStyle = styled(Toolbar)(({theme}) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

export default function Home() {
    const navigate = useNavigate();

    const handleToggleFavorites = () => {
        navigate("/favorites");
    };

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
                        variant={"contained"}>
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