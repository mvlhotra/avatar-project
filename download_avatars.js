const myArgs = process.argv.slice(2);
var request = require('request');
var token = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

var errors = function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
};

var repos = function getRepoContributors(repoOwner,repoName,cb){
  var options = {
    url : `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers : {
      'User-Agent' : 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body){
    cb(err, body);
  });
};


repos('jquery','jquery',errors);
// create avatars folder in the current directory
// avatar folder should have images corresponding to the avatars of the contributors of the repo
// each image should be named: "fname.png"

