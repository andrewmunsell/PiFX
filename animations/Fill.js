/**
 * Fill simply wipes the entire strand with a specific color
 */
function Fill(){
	this.name = "Color Fill"

	this.config = {
		color: {
			type: 'color',
			value: {
				r: 255,
				g: 255,
				b: 255
			}
		}
	}
}

/**
 * Return the pixel buffer with an animation applied
 * @param  {PixelBuffer} pixelBuffer Pixel Buffer representing the strand of pixels
 * @return {PixelBuffer}             The modified pixel buffer
 */
Fill.prototype.requestFrame = function(frame, pixelBuffer){
	pixelBuffer.fillRGB(this.config.color.value.r,
								this.config.color.value.g, 
								this.config.color.value.b)

	return pixelBuffer
}

module.exports = Fill