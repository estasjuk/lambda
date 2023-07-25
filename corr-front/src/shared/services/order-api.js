import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/api',
});

export const getOrderCalculation = async (language, mimetype, count) => {
    const { data } = await instance.get('/order', {
        params: {
            language,
            mimetype,
            count,
        },
    });
    //console.log(data);
    return data;
};