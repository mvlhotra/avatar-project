const myArgs = process.argv.slice(2);
const request = require('request');
const token = require('./secrets.js');
const fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

const callBack = function(err, result) {
	console.log('Errors:', err);
	let myResult = JSON.parse(result.body);
	console.log('Result:');
	myResult.forEach(function(contributor) {
		downloadImageByURL(contributor.avatar_url, contributor.login);
	});
};

const folder = function makeNewDirectory(dirPath) {
	if (!fs.existsSync(`${dirPath}`)) {
		fs.mkdir(`${dirPath}`, function(err) {
			if (err) {
				throw err;
			}
		});
	}
};

function downloadImageByURL(url, filePath) {
	folder('./avatars');
	request
		.get(url)
		.on('error', function(err) {
			throw err;
		})
		.on('response', function(response) {
			console.log('Downloading...');
		})
		.pipe(fs.createWriteStream(`./avatars/${filePath}.png`))
		.on('end', function() {
			console.log('Download complete!');
		});
}

const repos = function getRepoContributors(repoOwner, repoName, cb) {
	const options = {
		url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
		headers: {
			'User-Agent': 'request',
			Authorization: token.GITHUB_TOKEN,
		},
	};
	request(options, function(err, body) {
		cb(err, body);
	});
};

repos(myArgs[0], myArgs[1], callBack);
