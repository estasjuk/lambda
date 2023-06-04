const axios = require('axios');

const API_TOKEN_TINY_URL = 'OOeCN53du0wMU3cROtXVEyGIF3ytlWHgFbLIoIyVdamTe05m2W7cIkT0BdTR'

const getTinyUrl = async (pictureId) => {
    try {
        await axios({
            method: 'post',
            url: 'https://api.tinyurl.com/create',
            headers: {
                Authorization: `Bearer ${API_TOKEN_TINY_URL}`,
            },
            data: {
                url: `https://drive.google.com/uc?export=view&id=${pictureId}`,
            },
        }).then(res => console.log(res.data.data.tiny_url));
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getTinyUrl,
};