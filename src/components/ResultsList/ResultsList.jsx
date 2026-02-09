import { useState, useEffect } from 'react'

export default function ResultsList({results, filter, index, search}) {
    const [data, setData] = useState(index.ships);
    useEffect(() => setData(index.ships), [index.ships]);
    useEffect(() => results ? setData(results) : null,[results])

    useEffect(() => {
        const regex = new RegExp(filter, 'ig');
        setData(data.filter(datum => JSON.stringify(Object.values(datum)).match(regex)))
    },[filter]);

    const getBlock2 = () => search.set([search.query[0], {block:2}]);

    return(
        <ul>
            {search.query && data.length===0 && <button onClick={getBlock2}>Load Broader Results</button>}
            {data.map(datum =>
                <li key={datum.url}>
                    <ul>
                        <h4>{datum.name}</h4>
                        <li>{datum.model}</li>
                        <li>{datum.manufacturer}</li>
                        <li>{datum.cost_in_credits}</li>
                        <li>{datum[length]}</li>
                        <li>{datum.max_atmosphering_speed}</li>
                        <li>{datum.crew}</li>
                        <li>{datum.passengers}</li>
                        <li>{datum.cargo_capacity}</li>
                        <li>{datum.starship_class}</li>
                    </ul>
                </li>
            )}
        </ul>
    )
}

function fuzzySpaces(term) {return term.replaceAll(' ', '.+')};