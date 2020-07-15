const express = require('express');
const cors = require('cors');

const { apiPort } = require('../config.json');

const app = express();
const whitelist = ['http://localhost:3000'];

app.use(express.static('../public')); // no directory listing
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = `The CORS policy for this origin doesn't
        allow access from the particular origin.`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
// app.use('/', (request, response) => {
//   response.send(`<ol>
//   <li>This is a simple static asset server from the /history/public folder</li>
// </ol>`);
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// eslint-disable-next-line no-console
app.listen(apiPort, () => console.log(`Listening on port ${apiPort}!`));
