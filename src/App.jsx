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
    const [prevSearch, setPrevSearch] = useState('');
    const [showExpanded, setShowExpanded] = useState(false);

    useEffect(() => { console.log("@App. Fetching. . .")
        const fetchData = async () => {
            const retrievedData = await SWAPI.indexStarships();
            if (!retrievedData) {
                console.error(retrievedData.err || "fetchData Failed @App")
            };
            setShips(retrievedData);
        }; fetchData();
    },[]);

    useEffect(() => {
        if (!handleSearch) return;
        const performSearch = async () => {
            setResults([{loading:'Loading. . .'}])
            const retrievedData = await SWAPI.search(handleSearch[0], handleSearch[1]);
            if (!retrievedData || retrievedData.err) {
                console.error(retrievedData.err || "fetchData Failed @App")
            };
            console.log("@App > performSearch:", retrievedData);
            setResults(retrievedData);
            setHandleSearch(null);
        }; performSearch();
    },[handleSearch]);

    const resetShips = () => {setResults(ships); setPrevSearch('')};

	return (
		<main>
            <Searchbar props={{ resetShips, searchInput, setSearchInput, setHandleSearch, setPrevSearch, showExpanded, setShowExpanded }} />
            <ResultsList props={{ results, searchInput, ships, prevSearch, setPrevSearch, showExpanded, setShowExpanded }} />
		</main>
	)
}

export default App
