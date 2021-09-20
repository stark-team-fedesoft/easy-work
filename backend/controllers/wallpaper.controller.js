const fetch = require('cross-fetch');

globalThis.fetch = fetch;

const BASE_URL = "https://api.pexels.com/v1";
const token    = "563492ad6f917000010000012f15cc6eee124575bd2acb920524f83c";

const getWallpapers = async(req, res) => {
    if( !req.params.query ) return res.status(400).send('enter query');
    
    const images = await fetch(`${ BASE_URL }/search?query=${ req.params.query }`, {
        headers:{
            authorization: token,
        }
    })
        .then(res => res.json());

    return res.status(200).send({ data: images.photos });
}

module.exports = {
    getWallpapers,
}
