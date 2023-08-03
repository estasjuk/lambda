const cron = require('node-cron');

const { addCrypto } = require('../controllers/postDbControllers')


const job = cron.schedule("*/60 * * * *", 
async function () {
    //console.log("every minute")
    await addCrypto();
},
    {
    start: false,
    timeZone: 'Europe/Kiev'
    },
);

module.exports = {
    job,
};