const cron = require('node-cron');

const { addCrypto } = require('../controllers/postDbControllers')


const job = cron.schedule("*/5 * * * *", 
async function () {
    //console.log("every minute")
    await addCrypto();
},
    {
    start: true,
    timeZone: 'Europe/Kiev'
    },
);

module.exports = {
    job,
};