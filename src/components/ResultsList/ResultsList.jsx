import { useState, useEffect } from 'react'
import './ResultsList.css'

export default function ResultsList({props}) {
    const { results, searchInput, ships, prevSearch, setPrevSearch, showExpanded, setShowExpanded } = props;
    const [data, setData] = useState(ships);

    useEffect(() => setData(ships), [ships]);
    useEffect(() => results ? setData(results) : setData(ships), [results])

    useEffect(() => {
        const regex = new RegExp(searchInput, 'ig');
        setData(ships.filter(datum => datum.name.match(regex) || datum.model.match(regex)))
    },[searchInput]);

    const resetIndex = () => {setData(ships); setPrevSearch('')}

    const checkPrev = prevSearch.length > 0 && searchInput.length===0;

    return(
        <section id="results-list">
            
                <div id="search-metadata">
                    <span>Showing {data.length} results</span>
                    {checkPrev 
                        ? <span> for: &ldquo;{prevSearch}&rdquo;</span>
                        : <span>. Type to filter by name, or press search for expanded results.</span>}
                    {checkPrev && <button onClick={resetIndex} style={{marginLeft:'1em'}}>Show All Ships</button>}
                    {checkPrev && <span>Please Note. Results may include fields not shown.</span>}
                </div>
            <ul>
                {searchInput.length > 0 && data.length===0 && <p>Press Enter to see more results.</p>}
                {searchInput.length===0 && data.length===0 && <>
                    <p>No results. Try another search.</p>
                    </>}
                {data.map(datum =>
                    <li key={datum.url || 'unique'}>
                        {datum.loading && <p>{datum.loading}</p>}
                        <div className="details">
                            <h3>{datum.name}</h3>
                            <p><strong>Model: </strong>{datum.model}</p>
                            <p><strong>Manufacturer: </strong>{datum.manufacturer}</p>
                            <p><strong>Starship Class: </strong>{datum.starship_class}</p>
                            {showExpanded && <>
                                <p><strong>Cost: </strong>{datum.cost_in_credits}</p>
                                <p><strong>Ship Length: </strong>{datum['length']}</p>
                                <p><strong>Atmosphering Speed: </strong>{datum.max_atmosphering_speed}</p>
                                <p><strong>Crew Capacity: </strong>{datum.crew}</p>
                                <p><strong>Passenger Capacity: </strong>{datum.passengers}</p>
                                <p><strong>Cargo Capacity: </strong>{datum.cargo_capacity}</p>
                                <p><strong>Consumables: </strong>{datum.consumables}</p>
                                <p><strong>Hyperdrive Rating: </strong>{datum.hyperdrive_rating}</p>
                            </>}
                        </div>
                    </li>
                )}
            </ul>
        </section>
    )
}

function fuzzySpaces(term) {return term.replaceAll(' ', '.+')};