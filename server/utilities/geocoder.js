const nodeGeocoder = require('node-geocoder');
const options = {
    provider: process.env.PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

const geocoder = nodeGeocoder(options);
module.exports = geocoder;