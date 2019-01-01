const express = require('express');
var fs = require('fs');
const app = express()
const port = 3000

//test route
app.get('/', (req, res) => res.send('Hello World!'));

//get the state GeoJson
app.get('/states', (req, res) => {
    var states = JSON.parse(fs.readFileSync('./data/states.json', 'utf8'));
    res.send(states);
});

//get the county GeoJson for a state
app.get('/counties/:stateId', (req, res) => {

    //read the counties data file
    var counties = JSON.parse(fs.readFileSync('./data/counties.json', 'utf8'));

    //filter the counties data file by state Id
    var filtered = counties.features.filter(el => el.properties.STATEFP == req.params.stateId);

    //send the filtered result
    res.send(filtered);
});

//start the server
app.listen(port, () => console.log(`USA-GeoJson server listening on port ${port}!`))