//requires modules
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');
const connectDb = require('./server/database/databaseConnection');
//config
dotenv.config({ path: 'config.env' })
const PORT = process.env.SERVER_PORT || 8080;

connectDb();
app.use(bodyparser.urlencoded({ extended: true }));

//set views
app.set('view engine', 'ejs');
//assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }));
//router

app.use('/', require('./server/routes/router'));

app.use('/users', require('./server/routes/usersRouter'));




//start listening
app.listen(PORT, (req, res) => {
    console.log(`server started on  : http://localhost:${PORT}`);

});