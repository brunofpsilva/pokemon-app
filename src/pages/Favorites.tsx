import {Button, Grid} from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import {useNavigate} from "react-router-dom";
import useGlobalState from "../hooks/useContext";
import {ContainerStyle, RootStyle, TitleStyle, ToolbarStyle} from "./Home";

export default function Favorites() {
    const navigate = useNavigate();
    const {favorites} = useGlobalState();

    const handleButtonHome = () => {
        navigate("/");
    }

    return (
        <RootStyle>
            <ContainerStyle>
                <ToolbarStyle>
                    <TitleStyle>
                        Favorites
                    </TitleStyle>
                    <Button
                        onClick={handleButtonHome}
                        sx={{my: 3}}
                        color={"warning"}
                        variant={"contained"}>
                        Home
                    </Button>
                </ToolbarStyle>
                <Grid container spacing={3}>
                    {favorites.map((pokemon) =>
                        <Grid key={pokemon.name} item xs={12} md={4}>
                            <PokemonCard pokemon={pokemon}/>
                        </Grid>
                    )}
                </Grid>
            </ContainerStyle>
        </RootStyle>
    )
}