var ACTIVE_ANIMATIONS 	= [],
	ANIMATIONS 				= [];

$(document).ready(bindEvents);

var socket = io.connect('http://' + window.location.hostname);

socket.on('initialize', function(data){
	ACTIVE_ANIMATIONS = data.activeAnimations;
	ANIMATIONS = data.animations;

	renderInterface();
});

socket.on('animations', function(activeAnimations){
	ACTIVE_ANIMATIONS = activeAnimations;

	renderInterface();
});

function sync(render){
	socket.emit('animations', ACTIVE_ANIMATIONS);

	if(render !== false)
		renderInterface();
}

function renderInterface(){
	$('table.availableAnimations tbody').empty();

	for(var i = 0; i < ANIMATIONS.length; i++){
		$('table.availableAnimations tbody').append($('<tr><td>' + ANIMATIONS[i].name + '</td><td><button class="btn btn-inverse add" data-anim-index="' + i + '">Add</button></td></tr>'));
	}

	$('div.row-fluid.animations div.span3').not('div.add-animation').remove();

	for(var i = 0; i < ACTIVE_ANIMATIONS.length; i++){
		addAnimationPane(ACTIVE_ANIMATIONS[i]);
	}
}

function bindEvents(){
	$(document).on('click', 'button.btn.add[data-anim-index]', function(){
		var index = $(this).data('anim-index');
		var anim = $.extend(true, {}, ANIMATIONS[index]);

		addAnimationPane(anim);

		ACTIVE_ANIMATIONS.push(anim);

		sync();
	})
	.on('click', 'div.active-animation a.close', function(e){
		e.stopPropagation();
		e.preventDefault();

		var animIndex = $('div.active-animation').index($(this).parents('div.active-animation'));

		ACTIVE_ANIMATIONS.splice(animIndex, 1);

		$(this).parents('div.active-animation').remove();

		sync();
	})
	.on('change', 'div.active-animation input, div.active-animation select', function(e){
		e.stopPropagation();
		e.preventDefault();

		var animIndex = $('div.active-animation').index($(this).parents('div.active-animation'));
		var property = $(this).parents('div.config').data('key');

		ACTIVE_ANIMATIONS[animIndex].config[property].value = extractValues($(this).parents('div.config')[0]);

		sync(false);
	});
}

function addAnimationPane(anim){
	var panel = $('<div class="panel span3 active-animation well"></div>');

	var panelHeader = $('<div class="row-fluid"></div>');
	panelHeader.append($('<div class="span7"><h3>' + anim.name + '</h3></div>'));
	panelHeader.append($('<div class="span5"><a class="close" href="#">&times;</a></div>'));

	panel.append(panelHeader);

	var panelBody = $('<div class="row-fluid"></div>');

	for(var i in anim.config){
		if(!anim.config.hasOwnProperty(i)){
			continue;
		}

		var config = anim.config[i];

		var configElement = null;

		switch(config.type){
			case 'color':
				configElement = Config[config.type](config);
				configElement.find('input.hue').val(
					tinycolor(config.value).toHsl().h
				);
				configElement.find('input.lightness').val(
					tinycolor(config.value).toHsl().l
				);
				break;
			case 'select':
				configElement = Config[config.type](config);
				configElement.find('select').val(config.value);
				break;
			case 'range':
				configElement = Config[config.type](config);
				configElement.find('input[type="range"]').val(config.value);
				break;
		}

		$(configElement).data('key', i);

		panelBody.append(configElement);
	}

	panel.append(panelBody);

	$('div.row-fluid.animations').append(panel);
}

function extractValues(element){
	if($(element).data('type') == 'color'){
		return tinycolor({
			h: parseInt($(element).find('input.hue').val()),
			s: 100,
			l: parseFloat($(element).find('input.lightness').val())
		}).toRgb();
	} else if($(element).data('type') == 'select'){
		return $(element).find('select').val();
	} else if($(element).data('type') == 'range') {
		return $(element).find('input[type="range"]').val();
	} else {
		return null;
	}
}