import {useInfiniteQuery, useQuery} from "react-query";

export function useGetPokemons() {
    const fetchPokemon = async ({pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=9"}) => {
        const request = await fetch(pageParam);
        const {results, next} = await request.json();
        return {response: results, nextPage: next};
    };

    return useInfiniteQuery("pokemon", fetchPokemon, {
        getNextPageParam: (lastPage) => lastPage.nextPage
    });
}