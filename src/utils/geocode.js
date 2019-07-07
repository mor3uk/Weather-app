const request = require('request');

/**
 * Connacts to the specified adress checking possible issues
 * @param {string} adress - location adress 
 * @param {function} callback
 */
const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoibW9yM3VrIiwiYSI6ImNqeG94dWxoOTBhbmQza252enIwaWJwYjEifQ.QF6-Xqxpws2yQR8eg7ssZQ&limit=1`;

    request({
        url,
        json: true
    }, (e, { body } = 0) => {
        if (e) {
            callback('Unable to connect to the location services!', undefined);
        } else if (body.features.length == 0) {
            callback('Unable to find the location. Try another search!', undefined);
        } else {
            callback(undefined, {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                placeName: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;