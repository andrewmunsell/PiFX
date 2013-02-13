var color = require('tinycolor2')

/**
 * Throbs a color
 */
function Throb(){
	this.name = "Throb"

	this.config = {
		speed: {
			type: 'range',
			name: 'Speed',
			value: 50,
			min: 25,
			max: 250,
			step: 5
		}
	}
}

/**
 * Return the pixel buffer with an animation applied
 * @param  {PixelBuffer} pixelBuffer Pixel Buffer representing the strand of pixels
 * @return {PixelBuffer}             The modified pixel buffer
 */
Throb.prototype.requestFrame = function(frame, pixelBuffer){
	var position = frame / this.config.speed.value * Math.PI * 2
	var height = (Math.sin(position) + 1) / 2

	pixelBuffer.multiplyRGB(255 * height, 255 * height, 255 * height)

	return pixelBuffer
}

module.exports = Throb