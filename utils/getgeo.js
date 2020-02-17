const request = require ('request')
const chalk = require('chalk')

function getGeo(location, callback){
    const place = encodeURIComponent(location)
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +  place + ".json?access_token=pk.eyJ1IjoiYW51anJveWFsMTQ5IiwiYSI6ImNrNjgyZTJ1aDAwa2szZ29kY3V1a2E0dmQifQ.nqCC1YxVtdT-H57l7czvDw"
    request({url: url, json:true}, (error, response) => {
    if (error){
        callback('Unable to connect!!!', undefined)
        return
    }
    if (response.body.message) {
        callback(response.body.message, undefined)
        return
    }
    if (!response.body.features[0]){
        callback('Place not found, try another search', undefined)
        return
    }
    
    coo = {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        place: response.body.features[0].place_name
    }
    callback(undefined, coo)
    })
}
module.exports = getGeo