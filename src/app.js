const path = require('path')
const express = require('express')
const hbs =require('hbs');
const geocode = require('./utils/geocode');
const forecats = require('./utils/forecast');
const app = express();

//Define Path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

hbs.registerPartials(partialPath);

//Seting hbs template and views engine
app.set('views',viewPath);
app.set('view engine','hbs');

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : "Vivek Sharma"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name : "Vivek Sharma"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({'error':'You must provide an address'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if (error) {
            return res.send({ error })
        }
        forecats(latitude,longitude,(error,foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: foreCastData,
                location: location,
                address :  req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vivek Sharma',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
