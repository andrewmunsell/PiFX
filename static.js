var	url		= require('url'),
	path	= require('path'),
	fs		= require('fs')

function handler(req, res){
	var uri 		= url.parse(req.url).pathname,
		filename	= path.join(process.cwd(), 'public', uri)

	fs.exists(filename, function(exists){
		if(!exists){
			res.writeHead(404)
			res.write('404 page not found.')

			res.end();

			return;
		}

		if (fs.statSync(filename).isDirectory()) filename += 'index.html'

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {        
				res.writeHead(500, {"Content-Type": "text/plain"})
				res.write(err + "\n")
				res.end()

				return
			}

			res.writeHead(200)
			res.write(file, "binary")
			res.end()
		});
	})
}	

module.exports = handler;