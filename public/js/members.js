$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});
