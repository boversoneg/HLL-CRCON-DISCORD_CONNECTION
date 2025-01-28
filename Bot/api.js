const { request } = require('undici');

async function gatherApiInformations(url, options) {
    try {
        const response = await request(url, options);

        return response.body.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    gatherApiInformations,
};