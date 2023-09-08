const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const routes = require('./routes');
const bodyParser = require('body-parser');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config()

//connect to DB
db.connect();

const app = express()
const port = process.env.PORT || 3001
app.use(cookieParser());
//Cors
app.use(function (req, res, next) {
    //website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Set to true if you need the wesite to include cookies...
    res.setHeader('Access-Control-Allow-Credentials', true);

    next()
});

// app.use(cors())
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
    return res.send('Hello NVP');
})


app.listen(port, () => {
    console.log('>> Server đang lắng nghe tại cổng: ', + port);
})