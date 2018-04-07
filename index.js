const express = require('express'),
    path = require('path'),
    app = express();

app.set('port', (process.env.PORT || 4000));

app.use(express.static('public'));

app.listen(app.get('port'), (err) => {
  if (err)
    console.log(err);
  else
    console.log('Running on port: ' + app.get('port'));
});
