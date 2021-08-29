const express = require('express');
const cors = require('cors');
const multiparty = require('connect-multiparty');
require('dotenv').config()

const app = express();
const multipartyMiddleware = multiparty();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', multipartyMiddleware, function(req, res) {
  console.log(req.files);
  if (req.files) {
    const file = req.files.upfile

    if (!file.originalFilename) {
      res.json({error: 'No file uploaded'});
    }
    else {
      res.json({
        name: file.originalFilename,
        type: file.type,
        size: file.size
      });
    }
  }
  else {
    res.json({error: 'No file uploaded'})
  }
})

app.use(function(req, res) {
  res.send('Page not found')
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
