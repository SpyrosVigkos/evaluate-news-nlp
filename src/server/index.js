const dotenv = require('dotenv');
dotenv.config();
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())

//Initialize the project to distribution folder
app.use(express.static('dist'))

console.log(__dirname)

//API form MeaningCloud
const textApi = process.env.API_KEY;
let baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
let lang = '&lang=en';

console.log(`Your API key is ${process.env.API_KEY}`);


app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

//Empty object as Endpoint
let sentiment = {}; 

app.post('/analyse', async(req, res) => {
    try {

        // API call and store all data that comes form analysis of the test
        const analyse = await axios.post(`${baseURL}?key=${textApi}${lang}&txt=${req.body.formText}&model=general`);
        const {data} = analyse;
        res.send(data);

        sentiment = {
            score_tag : data.score_tag,
            agreement : data.agreement,
            subjectivity : data.subjectivity,
            confidence : data.confidence,
            irony : data.irony
        }

    } catch (error) {
        console.log(`${error}`);
    }
});

app.get("/all", (req, res) => {
    res.send(sentiment);
    console.log(`returning => ${sentiment}`);
});

// Define what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})