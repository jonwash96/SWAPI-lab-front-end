import { useState, useEffect } from 'react'
import './App.css'
import * as SWAPI from './services/SWAPIService'
import Searchbar from './components/Searchbar/Searchbar.jsx'
import ResultsList from './components/ResultsList/ResultsList.jsx'

function App() {
    const [ships, setShips] = useState([]);
    const [results, setResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [handleSearch, setHandleSearch] = useState(null);

    useEffect(() => { console.log("@App. Fetching. . .")
        const fetchData = async () => {
            const retrievedData = await SWAPI.indexStarships();
            if (!retrievedData) {
                console.error(retrievedData.err || "fetchData Failed @App")
            };
            console.log("@App > fetchData:", retrievedData);
            setShips(retrievedData);
        }; fetchData();
    },[]);

    useEffect(() => {
        console.log("@App > useEffect. handleSearch:", handleSearch)
        if (!handleSearch) return;
        const performSearch = async () => {
            console.log("@App > performSearch:", handleSearch[0])
            const retrievedData = await SWAPI.search(handleSearch[0], handleSearch[1]);
            if (!retrievedData || retrievedData.err) {
                console.error(retrievedData.err || "fetchData Failed @App")
            };
            console.log("@App > performSearch:", retrievedData);
            setResults(retrievedData);
            // setHandleSearch(null);
        }; performSearch();
    },[handleSearch]);

    const reset = () => setResults([]);

	return (
		<main>
            <Searchbar props={{ships, setShips, setResults, searchInput, setSearchInput, setHandleSearch}} />
            <ResultsList results={results} filter={searchInput} index={{ships, reset}} search={{query:handleSearch, set:setHandleSearch}} />
		</main>
	)
}

export default App
