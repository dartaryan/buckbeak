const searchButton = document.getElementById("search");
const placeHolder = "img/no-cover.png";
const outputList = document.getElementById("list-output");
const booklist = document.querySelector("#book-list");
const errorImage = "img/no-cover.png";
searchButton.addEventListener("click", () => {
	let searchValue = document.querySelector("input");
	if(searchValue.value === "") {
		nothingFound();
	} else {
		fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue.value}`).then((res) => {
			res.json().then((data) => {
				displayResults(data);
			}).catch(() => {
				booklist.style.display = "contents";
				outputList.innerHTML = `<div class="row">
        <h3 class="header center grey-text text-darken-2">
          Something went wrong...<br />
          Maybe try a different search?
        </h3>
      </div>`;
			});
		});
	}
});

function nothingFound() {
	booklist.style.display = "contents";
	outputList.innerHTML = `<div class="col s12 m12 l12">
  <div class="card horizontal" style="background-color: rgb(197, 194, 194);">
    <div class="card-image">
      <img class="nothing-img" src="img/nothing.gif" alt="Nothing Found" />
    </div>
    <div class="card-stacked">
      <div class="card-content center">
        <h4 class="card-title grey-text text-darken-4">Nothing found if nothing searched</h4>
        <div class="card-action">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="grey-text text-darken-4">
            <h6> Maybe try typing something next time to get the best books results Buckbeak can offer </h6>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

function displayResults(data) {
	outputList.innerHTML = "";
	data.items.forEach((book) => {
		let title = book.volumeInfo.title;
		let author = book.volumeInfo.authors ? book.volumeInfo.authors : "No info about the author of this book";
		let description = book.volumeInfo.description ? book.volumeInfo.description : "No description for this book";
		let img = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : placeHolder;
		booklist.style.display = "contents";
		outputList.innerHTML += formatOutput(img, title, author, description);
	});
}

function formatOutput(bookImg, bookTitle, bookAuthor, bookDescription) {
	let htmlCard = `<div class="col s12 m12 l6">
	<div class="card horizontal" style="background-color: rgb(197, 194, 194);">
		<div class="card-image"> <img class="card-img" src="${bookImg}" alt="${bookTitle}" /> </div>
		<div class="card-stacked">
			<div class="card-content center">
				<h4 class="card-title grey-text text-darken-4">${bookTitle}</h4>
				<div class="card-action">
					<a href="https://www.google.com/search?q=${bookAuthor}" class="grey-text text-darken-4"> <h6> ${bookAuthor} </h6> </a>
				</div> <a class="grey-text text-darken-4 waves-effect waves-light btn-small yellow darken-3 activator">More info</a> </div>
		</div>
		<div class="card-reveal"> <span class="card-title">${bookTitle}<i class="right">X</i></span>
			<p>${bookDescription}</p>
		</div>
	</div>
</div>`;
	return htmlCard;
}