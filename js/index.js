const searchButton = document.getElementById("search");
const placeHolder = '<img src="https://via.placeholder.com/150">';
const outputList = document.getElementById("list-output");
const booklist = document.querySelector("#book-list");
const errorImageUrl =
  "https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpghttps://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_960_720.jpg";
// 'https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_960_720.jpg';

searchButton.addEventListener("click", () => {
  let searchValue = document.querySelector("input");
  if (searchValue.value === "") {
    nothingFound();
  } else {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue.value}`
    ).then((res) => {
      res
        .json()
        .then((data) => {
          displayResults(data);
        })
        .catch(() => {
          booklist.style.display = "contents";
          outputList.innerHTML = "Something went wrong...";
        });
    });
  }
});

function nothingFound() {
  booklist.style.display = "contents";
  outputList.innerHTML = `<div class="bookCard">
  <div id="block_container">
    <div class="image_div">
    <img id="nothingImage" src="img/nothing.gif" alt="Nothing Found"/>
  </div>

    <div class="card-content">
      <h2 class="bookTitle">Nothing found if nothing searched</h2>
      <p>Maybe try typing something next time to get the best books results Buckbeak can offer</p>
    </div>
</div>;`;
}

function displayResults(data) {
  outputList.innerHTML = "";
  data.items.forEach((book) => {
    let title = book.volumeInfo.title;
    let author = book.volumeInfo.authors
      ? book.volumeInfo.authors
      : "No info about the author of this book";

    let description = book.volumeInfo.description
      ? book.volumeInfo.description
      : "No description for this book";
    let img = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : placeHolder;
    booklist.style.display = "contents";
    outputList.innerHTML +=
      "<div>" + formatOutput(img, title, author, description) + "</div>";
  });
  handleError();
}

function formatOutput(bookImg, bookTitle, bookAuthor, bookDescription) {
  let htmlCard = `<div class="card horizontal">
  <div id="block_container">
    <div class="image_div">
    <img class="cardImage" src="${bookImg}"/>
  </div>

    <div class="card-content">
      <h2>${bookTitle}</h2>
      <p>${bookDescription}</p>
      <div>
      <h3>${bookAuthor}</h3>
      </div>
    </div>
</div>;`;

  return htmlCard;
}

const handleError = () => {
  let images = document.querySelectorAll(".cardImage");
  images.forEach((image) => {
    image.onerror = () => {
      image.setAttribute("src", errorImageUrl);
      image.nextSibling.nodeValue = "";
      image.classList.add("brokenImage");
    };
  });
};
