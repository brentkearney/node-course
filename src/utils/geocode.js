const request = require('postman-request')

const geocode = (address, callback) => {
    const mapbox_api_key="pk.eyJ1Ijoibm9kZXN0dWRlbnQiLCJhIjoiY2t2YmtsdmF5MGV3bzJvcWlubTE1YXIwNSJ9.atzze5yVFf_80ai87XFwDQ"
    const url_args = encodeURIComponent(address) + '.json?access_token=' + mapbox_api_key
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + url_args

    request({ url, json: true }, (error, { body }) => {
        if (error) { 
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find given location', undefined)
        } else {
            const data = body.features[0]
            const [longitude, latitude] = data['center']
            callback(undefined, {
                latitude,
                longitude,
                location: data.place_name
            })
        }
    })
}

module.exports = geocode