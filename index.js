'use strict'

const https = require('https'),
      fs = require('fs'),
      timer = new Timer()


const config = {
  authorsUrl: 'https://www.reddit.com/r/aww.json',
  karmasUrl: 'https://www.reddit.com/user/%s/about.json',
  fileLoc: 'authors.json'
}

function Timer() {
  this.startTime = +(new Date())
}

Timer.prototype.start = function() {
  this.startTime = +(new Date())
}

Timer.prototype.stop = function() {
  return +(new Date) - this.startTime
}

timer.start()
getAuthors(config.authorsUrl)
.then(authors => Promise.all(authors.map(getKarma)))
.then(authors => exportAuthorsToFile(authors))

function getAuthors(url) {
  return new Promise((resolve, reject) => {
    makeRequest(config.authorsUrl)
    .then((res) => resolve(extractAuthors(JSON.parse(res))))
    .catch((err) => console.error(err))
  })
}

function extractAuthors(json) {
  let authors = []
  for(let children of json.data.children) {
    authors.push({ author: children.data.author })
  }
  return authors
}


function getKarma(author) {
  return new Promise((resolve, reject) => {
    makeRequest(config.karmasUrl.replace('%s', author.author))
    .then((res) => resolve(extractKarmas(JSON.parse(res), author)))
    .catch((err) => console.error(err))
  })
}

function extractKarmas(json, author) {
  author.link_karma = json.data.link_karma
  author.comment_karma = json.data.link_karma
  return author
}

function exportAuthorsToFile(authors) {
  let exectionTime = '// Execution time: ' + timer.stop() / 1000 + ' seconds\n',
      fileText = exectionTime + JSON.stringify(authors)

  fs.writeFile(config.fileLoc, fileText, (err) => {
    if (err) throw err;
  });
}

// https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies
function makeRequest(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const request = https.get(url, (response) => {
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
