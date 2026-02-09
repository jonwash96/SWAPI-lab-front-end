const BASE_URL = 'http://localhost:3000'

export async function indexStarships() {
    try {
        const response = await fetch(BASE_URL+'/starships');
        if (!response.ok) throw new Error("Fetch /starships Failed.");
        const data = await response.json();
        console.log("@index:", data);
        return data;
    } catch (err) {
        console.error(err)
    }
}

export async function search(query, options) {
    try {
        console.log("@searchSVC:", query, options);
        const response = await fetch(BASE_URL+'/search?q='+query, {
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({options})
        });
        if (!response.ok) throw new Error("Fetch /search Failed.");
        console.log("@searchSVC response-pre-data:", response);
        const data = await response.json();
        console.log("@searchSVC response:", data);
        return data;
    } catch (err) {
        console.error(err)
    }
}