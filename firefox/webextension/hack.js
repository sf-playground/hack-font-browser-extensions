exports.main = function() {
	var data = require("self").data;
	require("page-mod").PageMod({
		include: "*",
		contentScriptWhen: "end",
		contentScript: "onMessage = function onMessage(message) {" +
							"    var style = document.createElement('style');" +
							"    style.type = 'text/css';" +
							"    style.appendChild(document.createTextNode(message));" +
							"    document.getElementsByTagName('head')[0].appendChild(style);" +
							"};",
		onAttach: function(worker) {
			worker.postMessage(data.load("hack.css"));
		}
	});
}
