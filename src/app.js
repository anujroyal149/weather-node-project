const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const getGeo = require('../utils/getgeo')
const forecast = require('../utils/forecast')
const port = process.env.PORT || 3000

const app = express()

//express config paths
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebar paths
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(publicPath ))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Anuj',
    })
})
app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        res.send({
            error: 'Address must be provided.'
        })
        return
    }
    getGeo(req.query.address, (error, response)=>{
        if (error){
            res.send({
                error: error,
            })
            return
        }
        forecast(response.latitude, response.longitude, (error, data)=>{
            if (error){
                res.send({
                    error: error,
                })
                return 
            }
            res.send({
               forecast: data.summary,
               place: response.place,
               temperature: data.temperature,
               rain: data.rain,
            })
        })
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'you are not going to get any help here',
        title: 'Help',
        name:'Anuj',
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About us',
        name: 'Anuj',
        message: 'we are no. 1 weather service provider',
    })
})


app.get('/help/*', (req, res) =>{
    res.render('error', {
        title:'Weather',
        message:'Help article not found.',
        name: 'Anuj.'
    })
})

app.get('*', (req, res) =>{
    res.render('error', {
        title: 'Weather',
        message:'Page not found.',
        name:'Anuj.'
    })
})

app.listen(port, ()=>{
    console.log('Server is running')
})