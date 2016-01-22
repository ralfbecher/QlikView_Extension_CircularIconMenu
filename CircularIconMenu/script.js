/*
Created by Ralf Becher - ralf.becher@web.de - (c) 2015 irregular.bi, Leipzig, Germany
Tested on QlikView 11.2

irregular.bi takes no responsibility for any code.
Use at your own risk. 

*/
(function ($) {
	//own context, avoiding conflicts with other libraries, $=jQuery
	var _extension = 'CircularIconMenu';
    var _path = 'Extensions/' + _extension + '/';
	var _pathLong = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only&name=' + _path;
	// detect WebView mode (QlikView Desktop)
	var _webview = window.location.host === 'qlikview';
	var _files = [];
	// create array with all need libraries
    _files.push(_path + 'js/jQuery.WCircleMenu-min.js');

	// load all libraries as array, don't use nested Qva.LoadScript() calls
	Qv.LoadExtensionScripts(_files, function () {

		var imgUrl = (_webview ? _path : _pathLong) + "img/";

		Qva.AddExtension(_extension, function () {
			var _this = this;
			var _id = _this.Layout.ObjectId.replace("\\", "_");
			var menuIcons = _this.Layout.Text0.text.toString().split(","),
				objectIds = _this.Layout.Text1.text.toString().split(",");
			var menuSize = Math.min(menuIcons.length,objectIds.length);
			var variableName = _this.Layout.Text2.text.toString();
			var openOnStart = ((_this.Layout.Text3.text.toString() * 1) >0);
			var iconSize = (_this.Layout.Text4.text.toString() * 1);
			var iconDistance = (_this.Layout.Text5.text.toString() * 1);
			var iconStart = (_this.Layout.Text6.text.toString() * 1);
			var iconInterval = (_this.Layout.Text7.text.toString() * 1);
			
			var wrapper = $('<div />')
				.attr({ id: _id })
				.css({ "border-radius": "50%", "position": "relative", "width": iconSize+"px", "height": iconSize+"px", "margin": ((_this.GetHeight()-iconSize)/2)+"px auto" })
				.appendTo($(_this.Element).empty());

			wrapper.append($('<div />')
				.attr({ class: "wcircle-icon" })
				.html($('<div />')
				.css({ "width": iconSize+"px", "height": iconSize+"px", "text-align": "center", "background-image": "url(" + imgUrl + "plus.png)", "background-size": "100%", "background-repeat":"no-repeat" })
				));
			
			var menuList = $('<div />')
				.attr({ class: "wcircle-menu" })
				.css({ "display": "none", "width": iconSize+"px", "height": iconSize+"px" });
			
			for (var i = 0; i < menuSize; i++) {
				menuList.append($('<div />')
					.attr({ class: "wcircle-menu-item" })
					.data("sheetid", objectIds[i])
					.css({ "border-radius": "50%" , "width": iconSize+"px", "height": iconSize+"px", "background-image": "url(" + imgUrl + menuIcons[i] + ")", "background-size": "100%", "background-repeat": "no-repeat" })
				)
			}
			
			menuList.appendTo(wrapper);

			//$( document ).ready(function() {
				$('#' + _id).WCircleMenu({
					height: iconSize+"px",
					width: iconSize+"px",
					angle_start: iconStart,
					delay: 50,
					distance: iconDistance,
					angle_interval: iconInterval,
					easingFuncShow: "easeOutBack",
					easingFuncHide: "easeInBack",
					step: 15,
					openCallback: false,
					closeCallback: false,
					itemRotation: 360,
					iconRotation: 180
				});

				$('#' + _id + ' .wcircle-menu-item').on('click',function(){		
					//console.log($(this).text());
					if (!(variableName == "")) 
						Qv.GetCurrentDocument().SetVariable(variableName,$(this).data("sheetid"));
				});

				if (openOnStart) {
					console.log("OpenOnStart");
					$('#' + _id + ' .wcircle-icon').WCircleMenu('open');
				}
				// $('#openWCM').on('click',function(){
				// $('#menu_icon').WCircleMenu('open');
				// });

				// $('#closeWCM').on('click',function(){
				// $('#menu_icon').WCircleMenu('close');
				// });
			//});
		});

    });
})(jQuery);
