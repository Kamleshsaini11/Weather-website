const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherStackURL = `http://api.weatherstack.com/current?access_key=4a92d6bfb7ade6a15fe17283b9e81ce6&query=${latitude},${longitude}`

    request({url:weatherStackURL, json:true}, (error, {body}) => {
        if (error)
            callback('unable to connect to wether service')
        else if (body.error)
            callback('unable to find location')
        else{
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degree celcius '+'and feelslike '+body.current.feelslike+' degree celcius')
        }
    })
}

module.exports = forecast


