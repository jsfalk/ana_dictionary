var headings = ["Lemma", "Type", "Definition"]

var dictionary = [
	["slm", "noun", "peace"],
	["\u02bfwr", "verb", "blind"],
	["snt", "noun", "year"],
	["bn", "noun", "son"],
	["\u02belh", "deity", "\u02belh"],
	["Bl", "deity", "Bl"],
	["D\u015br", "deity", "D\u015br"],
	["\u1e0e\u015br", "deity", "\u1e0e\u015br"],
	["R\u1e2bm", "deity", "R\u1e2bm"],
	["R\u1e0dw", "deity", "R\u1e0dw"],
	["R\u1e0dy", "deity", "R\u1e0dy"],
	["Lt", "deity", "Lt"],
	["Y\u1e6f\u02bf", "deity", "Y\u1e6f\u02bf"],
];

var alphabet_roman = "\u02be\u02bfbd\u1e0f\u1e0dfg\u0121h\u1e2b\u1e25klmnqrs\u015b\u0161\u1e63t\u1e6f\u1e6dwyz\u1e93";

var alphabet_arabic = "\u02bebt\u1e6fg\u1e25\u1e2bd\u1e0frzs\u015b\u0161\u1e63\u1e0d\u1e6d\u1e93\u02bf\u0121fqklmnhwy";

function compare(str1, str2, alphabet) {
	str1 = str1.toLowerCase();
	str2 = str2.toLowerCase();
	var i = 0;
	while((i < str1.length) && (i < str2.length)) {
		var ch1 = alphabet.indexOf(str1[i]);
		var ch2 = alphabet.indexOf(str2[i]);
		if(ch1 < ch2) {
			return -1;
		} else if(ch1 > ch2) {
			return 1;
		} else {
			i += 1;
		}
	}
	if(str1.length == str2.length) {
		return 0;
	} else if(str1.length < str2.length) {
		return -1;
	} else {
		return 1;
	}
}

function search_dictionary(search_term) {
	search_term = search_term.toLowerCase();
	type = $("#search_POS").val();
	results = [];
	for(var i = 0; i < dictionary.length; i++) {
		lemma = dictionary[i][0];
		if(type === "all" || type === dictionary[i][1]) {
			if (search_term === "" || lemma.substring(0, search_term.length).toLowerCase() === search_term) {
				results.push(dictionary[i]);
			}
		}
	}
	return results;
}

function create_body(search_results) {
	for(var i = 0; i < search_results.length; i++) {
		$("#results").append("<tr><td>" + search_results[i][0] + "</td><td>" + search_results[i][1] + "</td><td>" + search_results[i][2] + "</td></tr>");
	}
}

function update_results(search_term) {
	search_results = search_dictionary(search_term);
	if(search_results.length > 0) {
		$("#results").show();
		$("#no_results").hide();
		$("#results tbody").remove();
		create_body(search_results);
	}
	else {
		$("#results").hide();
		$("#no_results").show();
		$("#results").append("<tbody><tr><td>No results</td></tr></tbody>");
	}
}

function convert_text(text) {
	text = text.replace("S/", "\u015a"); text = text.replace("s/", "\u015b"); text = text.replace("S^", "\u0160"); text = text.replace("s^", "\u0161"); text = text.replace("G.", "\u0120"); text = text.replace("g.", "\u0121"); text = text.replace("D_", "\u1e0e"); text = text.replace("d_", "\u1e0f"); text = text.replace("T_", "\u1e6e"); text = text.replace("t_", "\u1e6f"); text = text.replace("H_", "\u1e2a"); text = text.replace("h_", "\u1e2b"); text = text.replace("D.", "\u1e0c"); text = text.replace("d.", "\u1e0d"); text = text.replace("H.", "\u1e24"); text = text.replace("h.", "\u1e25"); text = text.replace("S.", "\u1e62"); text = text.replace("s.", "\u1e63"); text = text.replace("T.", "\u1e6c"); text = text.replace("t.", "\u1e6d"); text = text.replace("Z.", "\u1e92"); text = text.replace("z.", "\u1e93"); text = text.replace("'", "\u02be"); text = text.replace("`", "\u02bf");
	return text;
}

function update_text(item) {
	item.val(convert_text(item.val()));
}

function sort_dictionary(order) {
	var alphabet_order = alphabet_roman;
	if(order === "wehr") {
		alphabet_order = alphabet_arabic;
	}
	dictionary = dictionary.sort(function(entry1, entry2) { return compare(entry1[0], entry2[0], alphabet_order); });
}

function show_help(bool) {
	if(bool) {
		$("#show_help").hide();
		$("#hide_help").show();
		$("#help").show();
	} else {
		$("#show_help").show();
		$("#hide_help").hide();
		$("#help").hide();
	}
}

$(document).ready(function() {
	$("#no_results").hide();
	show_help(false);
	sort_dictionary("wehr");
	update_results("");
	$("#search_term").on("input", function(){update_text($(this)); update_results($(this).val());});
	$("#search_POS").on("change", function(){update_results($("#search_term").val());});
	$("#alphabet_order").on("change", function(){sort_dictionary($(this).val()); update_results($("#search_term").val());});
	$("#show_help").on("click", function(){show_help(true);});
	$("#hide_help").on("click", function(){show_help(false);});
});
