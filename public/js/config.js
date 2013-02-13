function Config(){

}

Config.color = function(conf){
	var element = $('<div class="config color" data-type="color"></div>');

	element.append($('<span class="spectrum"></span>'));
	element.append($('<input type="range" min="0" max="360" step="1" class="hue" />'));

	element.append($('<p>Brightness</p>'));
	element.append($('<input type="range" min="0" max="1" step="0.01" class="lightness" />'));

	return element;
}

Config.select = function(conf){
	var element = $('<div class="config select" data-type="select"></div>');

	element.append($('<label></label>').text(conf.name));

	var select = $('<select></select>');

	for(var i = 0; i < conf.choices.length; i++){
		select.append($('<option></option>').text(conf.choices[i]));
	}

	element.append(select);

	return element;
}

Config.range = function(conf){
	var element = $('<div class="config range" data-type="range"></div>');

	if(typeof(conf.name) != 'undefined'){
		element.append($('<label></label>').text(conf.name));
	}

	var min = typeof(conf.min) != 'undefined' ? conf.min : 0;
	var max = typeof(conf.max) != 'undefined' ? conf.max : 1;
	var step = typeof(conf.step) != 'undefined' ? conf.step : 1;

	element.append($('<input type="range" min="' + min + '" max="' + max + '" step="' + step + '" />'));

	return element;
}