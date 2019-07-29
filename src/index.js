import { Search } from './search';

window.onload = function drawPage() {
  // add input bar + search button
  document.body.insertAdjacentHTML('afterbegin',
    '<section id="search" class="search">\n'
    + '<div class="search">\n'
    + '<input type="text" class="search_bar" id="search_bar" placeholder="Search...">\n'
    + '<button type="submit" id="subm_btn" onclick="Search()">Search</button>\n'
    + '</div>\n'
    + '</section>\n'
    + '<section id="videoSlider" class="videoSlider">\n'
    + '</section>\n');
};
