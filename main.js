
const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");
const results= document.getElementById("gifResults");
    
const APIkey = 'VpBvHIoCfYtKnr2JvLPKPV8GnrkUfvIQ';

button.addEventListener("click", handleSearch);

input.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        event.preventDefault();
        handleSearch(event);
    }
});

async function handleSearch(event){
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        return;
    } 
    const gifs = await fetchGifs(query);
    displayResults(gifs);
    
}


