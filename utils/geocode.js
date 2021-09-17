const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibGFtYWsxMSIsImEiOiJja3RiZDRhcGUxdXJ1MnBuOWI4amdxYncyIn0.uDHmSbVWLW7oIuE1dRNZnQ&limit=1`

    request({url:geocodeURL, json:true}, (error, {body}) => {
        if (error)
            callback('Unable to connect weather service',undefined)
        else if (body.features.length == 0)
            callback('Unable to find location',undefined)
        else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode