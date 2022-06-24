export const getIndexByUrl = (url: string) => {
    let index: string | undefined = url.split("https://pokeapi.co/api/v2/pokemon/").pop();

    if (index)
        return index.substring(0, index.length - 1);
    return "0"
}