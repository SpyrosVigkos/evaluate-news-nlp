const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const app = express()

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())


app.use(express.static('dist'))

console.log(__dirname)

//API form MeaningCloud
const textApi = API_KEY;
let baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
let lang = '&lang=en';

console.log(`Your API key is ${process.env.API_KEY}`);


app.get('/', function (req, res) {
     res.sendFile('dist/index.html');
   // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/analyse', async(req, res) => {
    try {
        const analyse = await axios.post(`${baseURL}?key=${textApi}${lang}&txt=${req.body.formText}&model=general`);

        const { data } = analyse;

        const { score_tag } = data;
        const { agreement } = data;
        const { subjectivity } = data;
        const { confidence } = data;
        const { irony } = data;

        sentiment = {
            score_tag,
            agreement,
            subjectivity,
            confidence,
            irony,
        };

        res.send(sentiment);
        console.log(data)

    } catch (error) {
        console.log(`${error}`);
    }
});

app.get("/all", (req, res) => {
    res.send(sentiment);
    console.log(`returning => ${sentiment}`);
});

app.get("/all", (req, res) => {
    res.send(sentiment);
    console.log(`returning => ${sentiment}`);
});


// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})




// app.post('/api', function (req, res) {
//     console.log(req.body)
//     res.send({})
// })


// app.get('/test', function (req, res) {


//     res.send(mockAPIResponse)
// })
