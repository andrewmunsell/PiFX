/**
 * Strobes a white 
 */
function Strobe(){
	this.name = "Strobe"

	this.config = {
		filter: {
			name: 'Filter',
			type: 'select',
			value: 'None',
			choices: [
				'None',
				'Multiply'
			]
		},

		speed: {
			name: 'Speed',
			type: 'range',
			value: 2,
			min: 2,
			max: 25,
			step: 1
		}
	}
}

/**
 * Return the pixel buffer with an animation applied
 * @param  {PixelBuffer} pixelBuffer Pixel Buffer representing the strand of pixels
 * @return {PixelBuffer}             The modified pixel buffer
 */
Strobe.prototype.requestFrame = function(frame, pixelBuffer){
	if(frame % this.config.speed.value == 0){
		switch(this.config.filter.value.toLowerCase()){
			case 'multiply':
				pixelBuffer.multiplyRGB(255, 255, 255)
				break;
			default:
				pixelBuffer.fillRGB(255, 255, 255)
				break;
		}
	} else {
		pixelBuffer.fillRGB(0, 0, 0)
	}

	return pixelBuffer
}

module.exports = Strobe