/* =============================================================================
 *
 *														Github Avatar Generator
 *						Created by: Nik Malhotra for Lighthouse Labs on 02/11/19
 *
 * 																	Purpose:
 * 						User specifies a repository owner and repository name.
 * 			Images are exported to an avatar folder in the user's current dir.
 *
 * =============================================================================
 */

// variable init and introduction
const myArgs = process.argv.slice(2);
const request = require('request');
const token = require('./secrets.js');
const fs = require('fs');

// helpers

// 		retrieve and parse the data retrieved from JSON.
const callBack = function(err, result) {
	let myResult = JSON.parse(result.body);
	if (myResult.message === 'Not Found') {
		throw err;
	}
	myResult.forEach(function(contributor) {
		downloadImageByURL(contributor.avatar_url, contributor.login);
	});
};

// 			create a new folder directory

const folder = function makeNewDirectory(dirPath) {
	if (!fs.existsSync(`${dirPath}`)) {
		fs.mkdir(`${dirPath}`, function(err) {
			if (err) {
				throw err;
			}
		});
	}
};

// main tasks

// 		image downloader
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
//		retrieve repo object
const repos = function getRepoContributors(repoOwner, repoName, cb) {
	const options = {
		url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
		headers: {
			'User-Agent': 'request',
			Authorization: token.GITHUB_TOKEN,
		},
	};
	request(options, function(err, body) {
		cb('Error retrieving repo. Try again.', body);
	});
};

// main function execution
console.log('Welcome to the GitHub Avatar Downloader!');
repos(myArgs[0], myArgs[1], callBack);
