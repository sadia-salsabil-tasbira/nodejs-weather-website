const path = require('path')
const express = require ('express')
const hbs = require ('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Tasbira'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Tasbira'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        message: 'In case of emergency email to tasbira9@gmail.com!',
        title: 'Help',
        name: 'Tasbira'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
                return res.send({ error})
        }

        forecast(latitude, longitude , (error, forecastData) => {
                if(error){
                        return res.send({ error})
                }
                res.send({
                    address,
                    location,
                    forecast: forecastData
                })
                })
        }     
    )
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            Error: 'You must provide search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'ERROR!',
        message: 'Help article not found.',
        name: 'Tasbira'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'ERROR!',
        message: 'Page not found.',
        name: 'Tasbira'
    })
})

app.listen(port, () => console.log('Server is up on port ' + port))