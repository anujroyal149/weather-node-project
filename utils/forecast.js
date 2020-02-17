const request = require('request')
const chalk = require('chalk')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

function forecast(lat, long, callback){
    const url = "https://api.darksky.net/forecast/d80cc1ebbc5b09fe6086fecd76738f55/" + lat +',' + long+"?units=si"
    request({url: url, json:true}, (error, response)=>{
        if (error){
            callback('Unable to connect!!!', undefined)
            return
        }
        if (response.body.error) {
            callback(response.body.error, undefined)
            return
        }
        currentTemperature = response.body.currently.temperature +' degree celcius.'
        rain = 'There is  ' + response.body.currently.precipProbability + ' % chances of rain.'
        callback(undefined, {
            temperature: currentTemperature,
            rain: rain,
            dewPoint: response.body.currently.dewPoint,
            summary: response.body.daily.summary,
        })
    })
  }

  module.exports = forecast

