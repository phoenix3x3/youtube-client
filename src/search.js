let uploadedVideo = 0;
let uploadVideoList = [];
let previosVal;
let currentSlidPos = 0;
let eventSlideBtn = false;
let videoPageCount;
if (window.innerWidth > 1300) {
  videoPageCount = 4;
} else if (window.innerWidth > 500) {
  videoPageCount = 2;
} else videoPageCount = 1;
const KEY = 'AIzaSyD3LjCOCBmLV6eoBMNvLnC-8FhMhv_7pkg';

function keywordCheck() {
  const KEYWORD = document.querySelector('#search_bar').value;
  if (KEYWORD === previosVal) return false;
  if (typeof previosVal !== 'undefined') {
    document.querySelector('#videoSlider').innerHTML = '';
  }
  previosVal = KEYWORD;
  uploadVideoList = [];
  uploadedVideo = 0;
  currentSlidPos = 0;
  document.querySelector('.videoSlider').style = '';
  if (window.innerWidth > 1300) {
    videoPageCount = 4;
  } else if (window.innerWidth > 500) {
    videoPageCount = 2;
  } else videoPageCount = 1;
  document.querySelector('.videoSlider').style.setProperty('--n', videoPageCount);
  document.querySelector('.videoSlider').style.setProperty('--i', 0);
  return true;
}

function createURL(Params) {
  const KEYWORD = document.querySelector('#search_bar').value;
  let URL;
  switch (Params) {
    case 'std': {
      if (uploadedVideo + 15 === 45) uploadedVideo -= 1;
      URL = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&type=video&part=snippet&maxResults=${uploadedVideo + 15}&q=${KEYWORD}`;
      break;
    }
    case 'stat': {
      const videoId = [];
      for (let index = uploadedVideo; index < uploadedVideo + 15; index += 1) {
        videoId[index] = uploadVideoList[index].id;
      }
      const videoIdString = videoId.join();
      URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoIdString}&key=${KEY}&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`;
      break;
    }
    default: {
      Error(`URL parameter is set incorrectly: ${Params}.`);
      break;
    }
  }
  return URL;
}


function ReqLoad(URLParam) {
  const URL = createURL(URLParam);
  return new Promise(
    ((resolve, reject) => {
      // start XHR request
      const request = new XMLHttpRequest();
      request.open('GET', URL);
      request.responseType = 'json';
      // successful
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(`Your request is failed, pleasre try to correct your search personal request, error code: ${request.statusText}`));
        }
      };
      request.onerror = () => {
        reject(Error('There was network error, please check your enternet connection'));
      };
      // send the request
      request.send();
    }),
  );
}

function transcriptReaquest() {
  keywordCheck();
  ReqLoad('std').then(
    (response) => {
      const REQUEST_RES = response.items;
      for (let index = uploadedVideo; index < uploadedVideo + 15; index += 1) {
        const video = {};
        video.title = REQUEST_RES[index].snippet.title;
        video.clip_preview = REQUEST_RES[index].snippet.thumbnails.medium.url;
        video.description = REQUEST_RES[index].snippet.description;
        video.auther = REQUEST_RES[index].snippet.channelTitle;
        video.publicateDate = REQUEST_RES[index].snippet.publishedAt;
        video.id = REQUEST_RES[index].id.videoId;
        video.rate = '';
        uploadVideoList[index] = video;
      }
      return uploadVideoList;
    },
  )
    .then(() => {
      ReqLoad('stat').then(
        (responseText) => {
          const STAT_REQ = responseText.items;
          for (let index = uploadedVideo; index < uploadedVideo + 15; index += 1) {
            uploadVideoList[index].rate = STAT_REQ[index - uploadedVideo].statistics.viewCount;
          }
          uploadedVideo += 15;
          renderContent();
        },
      );
    });
}

function addSwithers() {
  const LIST = document.querySelector('#videoSlider');
  const inputNum = document.querySelector('.videoSlider').children.length;
  if (document.querySelector('#switcher')) {
    document.querySelector('#switcher').remove();
  }
  let navPanel = '<section class="navBtns" id="switcher">';
  for (let i = 0; i < inputNum; i += 1) {
    navPanel += `<input type="radio" id="card-${i + 1}">`;
  }
  navPanel += '<div class="menu">';
  for (let i = 0; i < inputNum; i += 1) {
    navPanel += `<label for="card-${i + 1}" id="label_${i + 1}" onclick="moveToSlide(${i})">${i + 1}</label>`;
  }
  navPanel += '</div>';
  navPanel += '</section>';
  LIST.insertAdjacentHTML('afterend', navPanel);
}

function moveToSlide(position = 0) {
  document.querySelector('.videoSlider').style.setProperty('--i', position);
  currentSlidPos = position;
  eventSlideBtn = true;
}
window.moveToSlide = moveToSlide;

function sliderSet() {
  const slider = document.querySelector('.videoSlider');
  const N = slider.children.length;
  let i = currentSlidPos;
  let x0 = null;

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }
  function lock(e) {
    x0 = unify(e).clientX;
  }
  function move(e) {
    const n = slider.children.length;
    if (x0 || x0 === 0) {
      const dx = unify(e).clientX - x0;
      let s = Math.sign(dx);
      if (eventSlideBtn) {
        s -= currentSlidPos;
        eventSlideBtn = false;
      }
      if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
        slider.style.setProperty('--i', i -= s);
        if ((i === n - 2) && (uploadedVideo + 15 < 50)) {
          currentSlidPos = i;
          transcriptReaquest();
        }
        currentSlidPos = i;
      }
      x0 = null;
    }
  }

  slider.style.setProperty('--n', N);

  slider.addEventListener('mousedown', lock, false);
  slider.addEventListener('touchstart', lock, false);

  slider.addEventListener('touchmove', (e) => { e.preventDefault(); }, false);

  slider.addEventListener('mouseup', move, false);
  slider.addEventListener('touchend', move, false);
}

function renderContent() {
  const LIST = document.querySelector('#videoSlider');
  let card = '';
  uploadVideoList.forEach((element, index) => {
    if (index % videoPageCount === 0) {
      card += '<div class="cardPage">';
    }
    card += `
    <div class="videoCard">
      <div class="preview">
        <img src="${element.clip_preview}" alt="preview" width="290">
      </div>
      <div class="title">${element.title}</div>
      <div class="auther">${element.auther}</div>
      <div class="release">${element.publicateDate}</div>
      <div class="rate">${element.rate}</div>
      <div class="description">${element.description}</div>
    </div>`;
    if ((index + 1) % videoPageCount === 0) {
      card += '</div>';
    }
  });
  LIST.innerHTML = card;
  sliderSet();
  addSwithers();
}

function Search() {
  transcriptReaquest();
}
window.Search = Search;

export default Search;
