$(document).ready(function () {
  let item, title, author, publisher, booLink, bookImg;
  let outputList = document.getElementById("list-output");
  let bookURL = "https://www.googleapis.com/books/v1/volumes?q=search+terms";
  let placeholder = '<img src="https://via.placeholder.com/150">';
  let searchData;

  //Listener for the search button

  $("#search").click(function () {
    outputList.innerHTML = "";
    searchData = $("#search-box").val();
    // Handling empty search input field
    if (searchData === "" || searchData === null) {
      displayError();
    } else {
      $.ajax({
        url: bookURL + searchData,
        dataType: "json",
        success: function (res) {
          console.log(res);
          if (res.totalItems === 0) {
            alert("Didn't catch anything...");
          } else {
            $("#title").animate({ "margin-top": "10px" }, 1000);
            $(".book-list").css("visibilty", "visible");
            displayResults(res);
          }
        },
        error: function () {
          alert("Something went wrong...");
        },
      });
    }
    $("#search-box").val("");
  });
  function displayResults(res) {
    for (let i = 0; i < 6; i += 2) {
      item = response.items[i];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      bookLink1 = item.volumeInfo.previewLink;
      bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier;
      bookImg1 = item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : placeholder;

      item2 = response.items[i + 1];
      title2 = item2.volumeInfo.title;
      author2 = item2.volumeInfo.authors;
      publisher2 = item2.volumeInfo.publisher;
      bookLink2 = item2.volumeInfo.previewLink;
      bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;
      bookImg2 = item2.volumeInfo.imageLinks
        ? item2.volumeInfo.imageLinks.thumbnail
        : placeholder;

      // send output to outputList
      outputList.innerHTML +=
        '<div class="row mt-4">' +
        formatOutput(
          bookImg1,
          title1,
          author1,
          publisher1,
          bookLink1,
          bookIsbn
        ) +
        formatOutput(
          bookImg2,
          title2,
          author2,
          publisher2,
          bookLink2,
          bookIsbn2
        ) +
        "</div>";
    }
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

  //handle error displaying empty search box

});
