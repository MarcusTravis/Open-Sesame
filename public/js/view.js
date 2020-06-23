$(document).ready(function () {
	// Getting a reference to the input field where user adds a new pw
	var $newItemInput1 = $("input.new-item1");
	var $newItemInput2 = $("input.new-item2");
	var $newItemInput3 = $("input.new-item3");
	// Our new PWS will go inside the pwContainer
	var $pwContainer = $(".pw-container");
	// Adding event listeners for deleting, editing, and adding pws
	$(document).on("click", "button.delete", deletePw);
	$(document).on("click", ".pw-item1", ".pw-item2", ".pw-item3", editPw);
	$(document).on("keyup", ".pw-item1", ".pw-item2", ".pw-item3", finishEdit);
	$(document).on("blur", ".pw-item1", ".pw-item2", ".pw-item3", cancelEdit);
	$(document).on("submit", "#pw-form", insertPw);

	// Our initial pws array
	var pws = [];

	// Getting pws from database when page loads
	// getPws();

	// This function resets the pws displayed with new pws from the database
	function initializeRows() {
		$pwContainer.empty();
		var rowsToAdd = [];
		for (var i = 0; i < pws.length; i++) {
			rowsToAdd.push(createNewRow(pws[i]));
		}
		$pwContainer.prepend(rowsToAdd);
	}

	// This function grabs pws from the database and updates the view
	function getPws() {
		$.get("/api/pws", function (data) {
			pws = data;
			initializeRows();
		});
	}

	// This function deletes a pw when the user clicks the delete button
	function deletePw(event) {
		event.stopPropagation();
		var id = $(this).data("id");
		$.ajax({
			method: "DELETE",
			url: "/api/pws/" + id,
		}).then(getPws);
	}

	$(".delete-btn").on("click", function(event) {
		
		var id = $(this).data("id");
	
		// Send the DELETE request.
		$.ajax({
			method: "DELETE",
			url: "/api/pws/" + id,
		}).then(getPws);
	  });

	// This function handles showing the input box for a user to edit a pw
	function editPw() {
		var currentPw = $(this).data("pw");
		// $(this).children().hide();
		$(this).children("span").css("display", "none"); 
		$(this).children("input.edit").val(currentPw.text);
		$(this).children("input.edit").css("display", "inline");
		$(this).children("input.edit").focus();
	}
	// This function starts updating a pw in the database if a user hits the "Enter Key"
	// While in edit mode
	function finishEdit(event) {
		var updatedPws = $(this).data("pw");
		if (event.which === 13) {
			updatedPws.text = $(this).children("input").val().trim();
			$(this).blur();
			updatePw(updatedPw);
		}
	}

	// This function updates a pw in our database
	function updatePw(pw) {
		$.ajax({
			method: "PUT",
			url: "/api/pws",
			data: pw,
		}).then(getPws);
	}

	// This function is called whenever a pw item is in edit mode and loses focus
	// This cancels any edits being made
	function cancelEdit() {
		var currentPw = $(this).data("pw");
		if (currentPw) {
			$(this).children().hide();
			$(this).children("input.edit").val(currentPw.text);
			$(this).children("span").show();
			$(this).children("button").show();
		}
	}

	// This function constructs a pw-item row
	function createNewRow(pw) {
		var $newInputRow = $(
			[
				// "<li class='list-group-item pw-item'>",
        "<tr>",
        "<td class=`h3`>",
        pw.website,
        "</td>",
        "<td class=`h3`>",
        pw.username,
        "</td>",
        "<td class=`h3`>",
        pw.password,
        "</td>",
        "<td>",
        "<button class='rounded text-white bg-danger'>Delete</button>",
        "</td>",
        "<input type='website' class='edit' style='display: none;'>",
		"<input type='username' class='edit' style='display: none;'>",
		"<input type='password' class='edit' style='display: none;'>",
        "</tr>",
        // "</li>"
			].join(" ")
		);

		$newInputRow.find("button.delete").data("id", pw.id);
		$newInputRow.find("input.edit").css("display", "none");
		$newInputRow.data("pw", pw);

		return $newInputRow;
	}

	// This function inserts a new pw into our database and then updates the view
	function insertPw(event) {
		event.preventDefault();
		var pw = {
			website: $newItemInput1.val().trim(),
			username: $newItemInput2.val().trim(),
			password: $newItemInput3.val().trim(),
		};

		$.post("/api/pws", pw, getPws);
		$newItemInput1.val("");
		$newItemInput2.val("");
		$newItemInput3.val("");
	}


});
