const searchButton = document.getElementById("search");
const placeHolder = '<img src="https://via.placeholder.com/150">';
const outputList = document.getElementById("list-output");
const booklist = document.querySelector("#book-list");

searchButton.addEventListener("click", () => {
  let searchValue = document.querySelector("input");
  console.log(searchValue.value);
  if (searchValue.value === "") {
    console.log("inside if");
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
  outputList.innerHTML =   `<div class="bookCard">
  <div id="block_container">
    <div class="image_div">
    <img id="nothingImage" src="img/nothing.gif" alt="Nothing Found"/>
  </div>

    <div class="card-content">
      <h2 class="bookTitle">Nothing found if nothing searched</h2>
      <p>Try typing something again to get some books from Buckbeak</p>
    </div>
</div>;`;




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
      "<div>" + formatOutput(img, title, author, description) + "</div>";
  });
  booklist.classList.add("animation");
}

function formatOutput(bookImg, bookTitle, bookAuthor, bookDescription) {
  let htmlCard = `<div class="bookCard">
  <div id="block_container">
    <div class="image_div">
    <img class="cardImage" src="${bookImg}"/>
  </div>

    <div class="card-content">
      <h2 class="bookTitle">${bookTitle}</h2>
      <p>${bookDescription}</p>
      <div>
      <h3 class="bookAuthor">${bookAuthor}</h3>
      </div>
    </div>
</div>;`;

  return htmlCard;
}


