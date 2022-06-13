const express = require('express');
const { registerPartials } = require('hbs');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
const app = express();
const punkAPI = new PunkAPIWrapper();

// Set Hbs as dynamic view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// Use public as static file
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials = (__dirname + '/views/partials')
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) =>{
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers', {beersFromApi});
  })
  .catch(error => console.log(error));
} )

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromApi => {
    console.log('beer from the database', {responseFromApi})
    res.render('random-beer',  {responseFromApi} )
  })
  .catch(error => console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
