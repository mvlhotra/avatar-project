const myArgs = process.argv.slice(2);
console.log(myArgs);

// create avatars folder in the current directory
// avatar folder should have images corresponding to the avatars of the contributors of the repo
// each image should be named: "fname.png"

/*

{
    ***"login": "pbakaus",
    "id": 43004,
    "node_id": "MDQ6VXNlcjQzMDA0",
    ***"avatar_url": "https://avatars1.githubusercontent.com/u/43004?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/pbakaus",
    "html_url": "https://github.com/pbakaus",
    "followers_url": "https://api.github.com/users/pbakaus/followers",
    "following_url": "https://api.github.com/users/pbakaus/following{/other_user}",
    "gists_url": "https://api.github.com/users/pbakaus/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/pbakaus/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/pbakaus/subscriptions",
    "organizations_url": "https://api.github.com/users/pbakaus/orgs",
    "repos_url": "https://api.github.com/users/pbakaus/repos",
    "events_url": "https://api.github.com/users/pbakaus/events{/privacy}",
    "received_events_url": "https://api.github.com/users/pbakaus/received_events",
    "type": "User",
    "site_admin": false,
    "contributions": 9
  }

*/