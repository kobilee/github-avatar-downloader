var request = require('request');
var secret = require('./secrets');
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
getRepoContributors("jquery", "jquery", function(data) {
  for ( var i = 0; i < data.length; i++){
    console.log(data[i].avatar_url);
  }
});

