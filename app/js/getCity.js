$(function () {
	$("#City").autocomplete({
		source: function (request, response) {
			jQuery.getJSON(
				"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
				function (data) {
					response(data);
				}
			);
		},
		minLength: 3,
		select: function (event, ui) {
			var selectedObj = ui.item;
			$("#City").val(selectedObj.value);
			// getcitydetails(selectedObj.value);
			return false;
		},
		open: function () {
			$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
			$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	});
	$("#City").autocomplete("option", "delay", 100);
});