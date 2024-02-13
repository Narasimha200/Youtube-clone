const videoContainer = document.querySelector('.search-videos-container');
const inputText = document.querySelector(".input");
const searchBar = document.querySelector(".search");
let key = "[Place your youtube data v3 api key here]";
const search_url = "https://www.googleapis.com/youtube/v3/search?"

inputText.value = sessionStorage.getItem("queryTerms");

var nextPageToken = null;
function loadVideos() {
    const query = inputText.value;
    if(!query){
        return;
    }
    let fetchUrl = search_url +
    new URLSearchParams({
      key: key,
      part: "snippet",
      maxResults: 25,
      q: query
    });
    if(nextPageToken){
      fetchUrl += "&pageToken="+nextPageToken;
    }
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        data.items.forEach(item =>{
            makeVideoCard(item);
        })
        nextPageToken = data.nextPageToken;
    })
    .catch((err) => console.log(err));
}

loadVideos();

function makeVideoCard(data){
    const videoCard = document.createElement("div");
    videoCard.classList.add('search-video');
    videoCard.innerHTML = `
        <img class="search-thumbnail" src=${data.snippet.thumbnails.medium.url} alt="thunail">
        <div class="search-content">
            <h4 class="search-title">${data.snippet.title}</h4>
            <p class="search-channel-name">${data.snippet.channelTitle}</p>
            <p class="search-description">${data.snippet.description}</p>
        </div>
    `;
    videoContainer.appendChild(videoCard);
    videoCard.addEventListener('click',()=>{
        sessionStorage.setItem("videoId", data.id.videoId);
        sessionStorage.setItem("queryTerms", inputText.value)
        window.location.href = "/playVideo.html";
    })
}
searchBar.addEventListener('click',()=>{
    if(!inputText.value) return;
    videoContainer.innerHTML = "";
    nextPageToken = null;
    loadVideos();
});
window.addEventListener("scroll", () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      loadVideos();
    }
});
window.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" && inputText.value){
    videoContainer.innerHTML = '';
    nextPageToken = null;
    loadVideos();
    console.log("renderd");
  }
})