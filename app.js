require('dotenv').config;

let express = require('express');
let app = express();
let user = require('./controllers/user-controller');
let home = require('./controllers/home-controller');
let kanji = require('./controllers/kanji-controller');
let sequelize = require('./db');
let bodyParser = require('body-parser');


sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use('/user', user);
app.use('/home', home);
app.use('/kanji', kanji);


app.listen(process.env.PORT, function(){
  console.log('*************** App is listening on port 3000 ***************');
})