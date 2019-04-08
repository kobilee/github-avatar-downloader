var request = require('request');
var secret = require('./secrets');
var fs = require('fs')
var query = process.argv.slice(2);
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      secret : secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    console.log(res.statusCode );
    if ( err ) {
      console.log( err );
      return;
    }

    if ( res.statusCode === 200 ) {
      var data = JSON.parse( body );
      cb( data );
    }

  });
}

function downloadImageByURL(url, filePath) {
  // ...
  console.log( "Downloading file ");
  request.get( url ).pipe( fs.createWriteStream( filePath ) );
}


if (query.length > 2) {
  getRepoContributors(query[0], query[1], function(data) {
    for ( var i = 0; i < data.length; i++){
      url = data[i].avatar_url;
      filePath = "avatars/" + data[i].login + ".jpeg";
      downloadImageByURL(url, filePath);
    }
  });
} else {
  console.log("please enter <owner> and <repo>");
}







