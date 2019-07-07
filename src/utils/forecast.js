const request = require('request');

/**
 * Gets weather information of specified location
 * @param {string} latitude 
 * @param {string} longtitude 
 * @param {function} callback 
 */
const forecast = (latitude, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/213be9724c41ede2ddfde53863825fda/${latitude},${longtitude}?units=si`;

    request({
        url,
        json: true
    }, (e, { body } = 0) => {
        if (e) {
            callback('Can not connect to the server!', undefined);
        } else if (body.error) {
            callback('Can not define the location!', undefined);
        } else {
            callback(undefined, `${body.currently.summary}. It is currently ${body.currently.temperature} degress out. There is ${body.currently.precipProbability}% chance of rain.`);
        }
    });
};

module.exports = forecast;