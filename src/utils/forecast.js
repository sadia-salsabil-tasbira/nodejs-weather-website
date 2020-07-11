const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5663bae02e64e2da507e014708c6dc10&query=' + latitude +',' + longitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather server!', undefined)
        } else if(body.error){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined,
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
                    ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is ' + 
                    body.current.humidity + '%. Localtime~ '+ body.location.localtime + ". " 
            )

        }
    })
}

module.exports = forecast