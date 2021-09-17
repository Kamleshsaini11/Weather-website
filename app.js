const { urlencoded } = require('express')
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('weather', {
        title:'Weather',
        forecast:'',
        location:'',
        name:'kamlesh',
        defaultInputValue:''
    })    
})

app.post('/', (req, res) => {
    const address = req.body.address
    console.log(address)
    
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.render('weather',{
                title:'Weather',
                forecast:'',
                location:error,
                name:'kamlesh',
                defaultInputValue:address
            })
        } 
        forecast(longitude, latitude, (error, forecastdata) => {
            if (error){
                return res.render('weather',{
                    title:'Weather',
                    forecast:'',
                    location:error,
                    name:'kamlesh',
                    defaultInputValue:address
                })
            } 
            return res.render('weather',{
                title:'Weather',
                forecast:forecastdata,
                location:location,
                name:'kamlesh',
                defaultInputValue:address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me  ',
        name:'kamlesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name:'kamlesh'
    })    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:404,
        name:'kamlesh',
        errorMessage:'Help article not found' 
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:404,
        name:'kamlesh',
        errorMessage:'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up')
})
