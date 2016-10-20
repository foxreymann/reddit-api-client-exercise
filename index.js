const https = require('https')

const config = {
  authorsUrl: 'https://www.reddit.com/r/aww.json',
  karmasUrl: 'https://www.reddit.com/user/%s/about.json'
}

getAuthors(config.authorsUrl)
.then(authors => Promise.all(authors.map(getKarma)))
.then(authors => exportAuthorsToFile())

function getAuthors(url) {
  return new Promise((resolve, reject) => {
    resolve([1,2])
  })
}

function getKarma(url) {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

function exportAuthorsToFile(url) {
  return new Promise((resolve, reject) => {
console.log('done')
    resolve()
  })
}

/*
makeRequest('https://www.reddit.com/r/aww.json')
  .then((html) => console.log(html))
  .catch((err) => console.error(err))
*/

// https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies
function makeRequest(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
    })
};
