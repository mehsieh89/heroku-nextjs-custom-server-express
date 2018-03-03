const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dir: '.', dev })
const bodyParser = require('body-parser');
const db = require('./databaseIndex.js');
const axios = require('axios');
const config = require('./config/index.js');
const handle = app.getRequestHandler()

const YOUTUBE_API_KEY = "&key=" + config.YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/"
const YOUTUBE_SEARCH_URL_1 = "search?part=snippet&q=";
const YOUTUBE_SEARCH_URL_2 = ("&type=video&order=viewCount" + YOUTUBE_API_KEY);
const YOUTUBE_INFO_URL = "videos?part=statistics&id=";
const YOUTUBE_COMMENTS_URL = "commentThreads?key=";
const YOUTUBE_COMMENTS_URL_2 = "&textFormat=plainText&part=snippet&maxResults=10&videoId=";


app.prepare()
.then(() => {
  const server = express()
  server.use(bodyParser.json());

  server.post('/search', (req, res) => {
    console.log('hit server');
    console.log(req.body.value);
    axios.get(YOUTUBE_BASE_URL + YOUTUBE_SEARCH_URL_1 + req.body.value + YOUTUBE_SEARCH_URL_2)
    .then((data) => {
      res.send(data.data.items);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
  })

  server.post('/videoInfo', (req, res) => {
    axios.get(YOUTUBE_BASE_URL+ YOUTUBE_INFO_URL + req.body.id + YOUTUBE_API_KEY)
    .then((data) => {
      let count = {
        likes: data.data.items[0].statistics.likeCount,
        dislikes: data.data.items[0].statistics.dislikeCount
      }
      res.send(count);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
  })

  server.post('/videoComments', (req, res) => {
    axios.get(YOUTUBE_BASE_URL + YOUTUBE_COMMENTS_URL + config.YOUTUBE_API_KEY + YOUTUBE_COMMENTS_URL_2 + req.body.id)
    .then((data) => {
      let comments = data.data.items.map(function(item) {
        let options = {
          user: item.snippet.topLevelComment.snippet.authorDisplayName,
          text: item.snippet.topLevelComment.snippet.textDisplay
        }
        return options;
      });
      res.send(comments);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
  })

  server.post('/databaseAdd', (req, res) => {
    let videoName = new Ebutuoy ({
      name: req.body.name
    })
    videoName.save()
    res.end();
  })

  server.get('/retrieveVideos', (req, res) => {
    Ebutuoy.find({}, function(err, data) {
      if (err) throw err;
      res.send(data);
      res.end()
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
