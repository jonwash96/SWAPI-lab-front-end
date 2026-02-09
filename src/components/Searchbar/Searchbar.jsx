import { useState, useEffect } from 'react'
import * as SWAPI from '../../services/SWAPIService'

export default function Searchbar({props}) {
    const handleChange = (e) => props.setSearchInput(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("@handleSubmit searchInput:", props.searchInput)
        props.setHandleSearch([props.searchInput, {block:1}]);
        props.setSearchInput('');
    };

    return(
        <div id="Searchbar">
            <span>SWAPI Search</span>

            <form id="searchbox" onSubmit={handleSubmit}>
                <input type="search" value={props.searchInput} onChange={handleChange} />
                <button type="submit" className="search-btn">🔎</button>
            </form>

            <nav>
                <ul>
                    {/* <li onClick={()=>props.setPageName('Everything')}>Home</li> */}
                    <li onClick={()=>props.setPageName('Starships')}>Starships</li>
                </ul>
            </nav>
        </div>
    )
}