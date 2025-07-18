
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

async function fetchGifs(query){
    const encodedQuery = encodeURIComponent(query)
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${encodedQuery}&limit=20&rating=g&lang=en`;

    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

function displayResults(gifData) {
    results.innerHTML = "";

    if (gifData.length === 0) {
        results.innerHTML = "<p>Unable to find GIF</p>"
        return;
    }
    gifData.forEach(gif => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.style.margin = "10px";
        results.appendChild(img); 
    });
}
