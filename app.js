const videoCardContainer = document.querySelector(".videos-container");
const options = document.querySelectorAll(".filter-options");
const inputText = document.querySelector(".input");
const searchBar = document.querySelector(".search");
let key = "[Place your youtube data v3 api key here]";
let videos_url = "https://www.googleapis.com/youtube/v3/videos?";
let channel_url = "https://www.googleapis.com/youtube/v3/channels?";

options.forEach(node => {
  if(node.innerText === 'all') return;
  node.addEventListener('click',()=>{
    inputText.value = node.innerText;
    openSearchPage();
  })
})

var nextPageToken = null;
function loadVideos() {
  let fetchUrl = videos_url +
  new URLSearchParams({
    key: key,
    part: "snippet",
    regionCode: "IN",
    chart: "mostPopular",
    maxHeight: "500",
    maxResults: 25,
    maxWidth: 500,
  });
  if(nextPageToken){
    fetchUrl += "&pageToken="+nextPageToken;
  }
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => {
      data.items.forEach((item) => {
        getChannelIcon(item);
      });
      nextPageToken = data.nextPageToken;
      console.log(data);
    })
    .catch((err) => console.log(err));
}

function getChannelIcon(data) {
  fetch(
    channel_url +
      new URLSearchParams({
        key: key,
        part: "snippet",
        id: data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((res) => {
      data.channelThumbnail = res.items[0].snippet.thumbnails.medium.url;
      makeVideoCard(data);
    });
}

function makeVideoCard(data) {
  const videoCard = document.createElement("div");
  videoCard.classList.add('video');
  videoCard.innerHTML = `
    <img class="thumbnail" src=${data.snippet.thumbnails.medium.url} alt="">
    <div class="content">
        <img class="channel-profile" src=${data.channelThumbnail} alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <span>${data.snippet.channelTitle}</span>
            </div>
        </div>
    `;
    videoCardContainer.appendChild(videoCard);
    videoCard.addEventListener('click', ()=>{
        sessionStorage.setItem("videoId", data.id);
        window.location.href = "/playVideo.html";
    })
}

loadVideos();

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    loadVideos();
  }
});
function openSearchPage(){
  if(!inputText.value) return;
  sessionStorage.setItem("queryTerms", inputText.value);
    window.location.href = "/showSearchResult.html";
}
searchBar.addEventListener('click',()=>{
  openSearchPage();
})
window.addEventListener('keydown',(e)=>{
  if(e.key === 'Enter'){
     openSearchPage();
  }
})

