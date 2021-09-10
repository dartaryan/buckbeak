const searchButton = document.getElementById("search");
const placeHolder = '<img src="https://via.placeholder.com/150">';
const outputList = document.getElementById("list-output");
const booklist = document.querySelector("#book-list");

searchButton.addEventListener("click", () => {
  let searchValue = document.querySelector("input");
  console.log(searchValue.value);
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchValue.value}`
  ).then((res) => {
    res
      .json()
      .then((data) => {
        if (data.items.length == 0) {

        } else {
          displayResults(data);
        }
      })
      .catch(() => {
        booklist.style.display = "contents";
        outputList.innerHTML = "Something went wrong...";
      });
  });
});

function nothingFound() {
  booklist.style.display = "contents";
  outputList.innerHTML = "Nothing found if nothing searched";
}


function displayResults(data) {
  outputList.innerHTML = "";
  data.items.forEach((book, index) => {
    let title = book.volumeInfo.title;
    let author = book.volumeInfo.authors;
    let description = book.volumeInfo.description
      ? book.volumeInfo.description
      : "No description for this book";
    let img = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : placeHolder;
    booklist.style.display = "contents";
    outputList.innerHTML +=
      '<div class="row mt-4">' +
      formatOutput(img, title, author, description) +
      "</div>";
  });
  booklist.classList.add("animation");
}

function formatOutput(bookImg, bookTitle, bookAuthor, bookDescription) {
  let htmlCard = `<div class="col-lg-6">
                        <div class="row no-gutters">
                        <div class="col-md-4">
                        <img src="${bookImg}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                        <h5 class=card-title">${bookTitle}</h5>
                        <p class="card-text">Author: ${bookAuthor}</p>
                        <p class="card-text">Description: ${bookDescription}</p>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        `;

  return htmlCard;
}
