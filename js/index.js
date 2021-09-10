const searchButton = document.getElementById("search");
const placeHolder = '<img src="https://via.placeholder.com/150">';

searchButton.addEventListener("click", () => {
  let searchValue = document.querySelector("input");
  console.log(searchValue.value);
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchValue.value}`
  ).then((res) => {
    res.json().then((data) => {
      displayResults(data);
    });
  });
});

function displayResults(data) {
  console.log("displayResults");
  data.forEach((book, index) => {
    let title = book.volumeInfo.title;
    let author = book.volumeInfo.authors;
    let publisher = book.volumeInfo.publisher;
    let link = book.volumeInfo.previewLink;
    let isb = book.volumeInfo.industryIdentifiers[1].identifier;
    let img = book.volumeInfo.imageLinks
      ? item.volumeInfo.imageLinks.thumbnail
      : placeHolder;



    formatOutput(bookImg, title);
  });
}

function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
  let viewerURL = "book.html?isbn=" + bookIsbn;
  let htmlCard = `<div class="col-lg-6">
                        <div class="row no-gutters">
                        <div class="col-md-4">
                        <img src="${bookImg}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                        <h5 class=card-title">${title}</h5>
                        <p class="card-text">Author: ${author}</p>
                        <p class="card-text">Publisher: ${publisher}</p>
                        <a target="_blank" href="${viewerURL}" class="btn btn-secondary">Read me</a>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        `;
  return htmlCard;
}
