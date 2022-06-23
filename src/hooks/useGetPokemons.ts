import axios from "../utils/axios";
import {useQuery} from "react-query";

export function useGetPokemons(page: number) {
    const getVehicles = async () => {
        const response = await axios.get(`pokemon-species/`)
        return response.data;
    }

    return useQuery("pokemonlist", getVehicles, {
        retry: 1,
    });
}