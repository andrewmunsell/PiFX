var fs		= require('fs'),
	path	= require('path')

function AnimationLoader(){

}

AnimationLoader.load = function(){
	var filepath = path.join(process.cwd(), 'animations')

	var files = fs.readdirSync(filepath)

	var animationFiles = []

	for(var i = 0; i < files.length; i++){
		if(files[i].indexOf('.js') > -1){
			var animation = require('./animations/' + files[i].replace('.js', ''))

			animationFiles.push(animation)
		}
	}

	return animationFiles
}

module.exports = AnimationLoader