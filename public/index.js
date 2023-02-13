console.log("Hello, I am JavaScript.");

// Get the date 
const date = document.getElementById("time");
var curr = new Date();

var options = {
    weekday : "long",
    day: "numeric",
    month:"long",
};
var today = curr.toLocaleDateString("en-US", options);
console.log(today);

date.textContent = today;

// Fetch the news
var is_root = (/^https?\:\/\/[^\/]+\/?$/).test(window.location.href);
console.log(is_root);
let query;
let pageno;
if(is_root == false){
  query = window.location.search.split("?")[1].split("&")[0].split("=")[1];
  pageno = parseInt(window.location.search.split("?")[1].split("&")[1].split("=")[1]);
}
else{
  query = "Trending"
  pageno = 1;
}
let prev = document.getElementById("prev");
let nxt = document.getElementById("nxt");
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let content = document.getElementById("content");


let totalPages;
let articlePerPages;
console.log(query, pageno);
const fetchNews = async (query, pageno) => {
    let a = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=85f71b57d99a40818965af59be1fa65c&pageSize=9&page=${pageno}`);
    let r = await a.json();
    console.log(r);
   
    totalPages = Math.ceil(r.totalResults / articlePerPages);
    if(pageno != 1) prev.href = `/?q=${query}&pageno=${pageno-1}`;
    nxt.href = `/?q=${query}&pageno=${pageno+1}`;
    one.href = `/?q=${query}&pageno=${1}`;
    two.href = `/?q=${query}&pageno=${2}`;
    three.href = `/?q=${query}&pageno=${3}`;

    let str = "";
    for(let items of r.articles){
        str = str + `<div class="card m-4 news" style="width: 18rem;">
        <img style = "margin-top: 10px;"src="${items.urlToImage}" class="card-img-top" alt="newsImage">
        <div class="card-body">
          <h5 class="card-title">${items.title}</h5>
          <p class="card-text">${items.description}</p>
          <a target = "_blank" href="${items.url}" class="btn btn-outline-warning btn-custom">Read More</a>
        </div>
      </div>`
    }
    content.innerHTML = str;
}
fetchNews(query, pageno);