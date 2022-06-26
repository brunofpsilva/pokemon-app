import React, {createContext, ReactNode, useState} from "react";
import {Pokemon, PokemonList} from "../types/Pokemon";

export type GlobalContextProps = {
    favorites: PokemonList[];
    addToFavorites: (pokemon: PokemonList) => void;
    removeFromFavorites: (pokemon: PokemonList) => void;
    checkFavourites: (pokemon: PokemonList) => boolean;
};

const initialState: GlobalContextProps = {
    favorites: [],
    addToFavorites: (pokemon: PokemonList) => {
    },
    removeFromFavorites: (pokemon: PokemonList) => {
    },
    checkFavourites: (pokemon: PokemonList) => false
};

export const GlobalContext = createContext(initialState);

type GlobalProviderProps = {
    children: ReactNode;
}

export const GlobalProvider = ({children}: GlobalProviderProps) => {

    const [favorites, setFavourites] = useState<PokemonList[]>([]);

    const addToFavorites = (pokemon: PokemonList) => {
        setFavourites(favorites.concat(pokemon));
    }

    const removeFromFavorites = (pokemon: PokemonList) => {
        const index = favorites.indexOf(pokemon);
        favorites.splice(index);
    }

    const checkFavourites = (pokemon: PokemonList) => {
        let find = favorites.find((p) => p.name === pokemon.name);
        return find !== undefined;
    }

    return (
        <GlobalContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                checkFavourites
            }}>
            {children}
        </GlobalContext.Provider>
    );
};