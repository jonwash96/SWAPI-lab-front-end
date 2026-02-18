import './Searchbar.css'

export default function Searchbar({props}) {
    const {resetShips, searchInput, setSearchInput, setHandleSearch, setPrevSearch, showExpanded, setShowExpanded } = props
    const handleChange = (e) => setSearchInput(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("@handleSubmit searchInput:", searchInput);
        if (searchInput.length === 0) return;
        setHandleSearch([searchInput, {block:1}]);
        setPrevSearch(searchInput);
        setSearchInput('');
    };

    return(
        <div id="Searchbar">
            <span>S.W.A.P.I. Search</span>

            <form id="searchbox" onSubmit={handleSubmit}>
                <input type="search" value={searchInput} onChange={handleChange} placeholder="Search" />
                <button type="submit" className="search-btn">🔎</button>
            </form>

            <nav>
                <ul>
                    <button type="button" onClick={resetShips}>Starships</button>
                    <button type="button" onClick={()=>setShowExpanded(!showExpanded)}>{showExpanded ? "Hide Extra Details" : "Show Extra Details"}</button>
                </ul>
            </nav>
        </div>
    )
}
