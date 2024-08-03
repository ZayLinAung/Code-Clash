const http = require('https');

const options = {
	method: 'GET',
	hostname: 'judge0-ce.p.rapidapi.com',
	port: null,
	path: '/about',
	headers: {
		'x-rapidapi-key': '66788250b4msh564b038cc76e07cp153b4ajsna4898cab423a',
		'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();