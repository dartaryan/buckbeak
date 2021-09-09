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
            // displayResults(res);
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
      item = res.items[i];

    }
  }
});
