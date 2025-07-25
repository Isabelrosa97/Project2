
const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");
const results= document.getElementById("gifResults");

const APIkey = 'VpBvHIoCfYtKnr2JvLPKPV8GnrkUfvIQ';
    
// Activate search when search button is clicked or Enter is pressed 
button.addEventListener("click", handleSearch);
input.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        event.preventDefault();
        handleSearch(event);
    }
});

// Main async function 
async function handleSearch(event){
    event.preventDefault();
    const query = input.value.trim(); 

    if (!query) {
        results.innerHTML = "<p>Error. Try again</p>"
        return;
    } 
    const gifs = await fetchGifs(query);
    displayResults(gifs);
    
}

// Fetch data from API
async function fetchGifs(query){
    const encodedQuery = encodeURIComponent(query)
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${encodedQuery}&limit=25&rating=g&lang=en`;

    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

// Display gifs on webpage 
function displayResults(gifData) {
    results.innerHTML = "";

    if (gifData.length === 0) {
        results.innerHTML = "<p>Unable to display GIF</p>"
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
