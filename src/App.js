import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [pmList, setPmList] = useState([]);
    const [displayList, setDisplayList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [disableButton, setDisableButton] = useState(false);
    useEffect(() => {
        const getPmList = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
            const list = await response.json();
            setPmList(list.results);
        };
        getPmList();
    }, []);
    useEffect(() => {
        if (pmList.length > 0) {
            setDisplayList(pmList.slice(0, (pageNumber + 1) * 5));
            if ((pageNumber + 1) * 5 >= pmList.length) {
                setDisableButton(true);
            }
        }
    }, [pageNumber, pmList]);
    function handleLoadMore() {
        setPageNumber((prev) => prev + 1);
    }
    return (
        <>
            <h1>Pokemon list</h1>
            <ul>
                {displayList.map((pokemon) => {
                    return (
                        <li key={pokemon.url + pokemon.name}>{pokemon.name}</li>
                    );
                })}
            </ul>
            <button onClick={handleLoadMore} disabled={disableButton}>
                Load more
            </button>
        </>
    );
}

export default App;
