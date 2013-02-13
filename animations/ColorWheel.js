var color = require('tinycolor2')

/**
 * Rotates a color through the color wheel
 */
function ColorWheel(){
	this.name = "Color Wheel"

	this.config = {
		speed: {
			type: 'range',
			name: 'Speed',
			value: 250,
			min: 25,
			max: 1000,
			step: 25
		},

		saturation: {
			type: 'range',
			name: 'Color Saturation',
			value: 0.7,
			min: 0,
			max: 1,
			step: 0.05			
		},

		lightness: {
			type: 'range',
			name: 'Lightness',
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.01			
		}
	}
}

/**
 * Return the pixel buffer with an animation applied
 * @param  {PixelBuffer} pixelBuffer Pixel Buffer representing the strand of pixels
 * @return {PixelBuffer}             The modified pixel buffer
 */
ColorWheel.prototype.requestFrame = function(frame, pixelBuffer){
	var origin = frame / this.config.speed.value * 300
	var pixels = pixelBuffer.buffer.length / 3

	for(var i = 0; i < pixels; i++){
		var hue = origin + i / pixels * 360
		
		while(hue > 360)
			hue -= 360

		pixelBuffer.setHSL(i, hue, this.config.saturation.value, this.config.lightness.value)
	}

	return pixelBuffer
}

module.exports = ColorWheel