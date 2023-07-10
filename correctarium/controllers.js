const moment = require('moment');
const { calcPrice, calcWorkTime, calcDeadline } = require('./algorithm');

const getOrderDetails = async (req, res) => {
    const { lang, mimetype, count }= req.query;

    const price = await calcPrice(lang, mimetype, count);
    const workTime = await calcWorkTime(lang, mimetype, count);
    const deadline = await calcDeadline(workTime);
    
    let remain = workTime;
    const days = Math.floor(remain / (1000 * 60 * 60 * 24))
    remain = remain % (1000 * 60 * 60 * 24)
    const hours = Math.floor(remain / (1000 * 60 * 60))
    remain = remain % (1000 * 60 * 60)
    const minutes = Math.floor(remain / (1000 * 60))
    remain = remain % (1000 * 60)
    
    res.json({
        status: 'success',
        code: 200,
        data: {
            price: price.toFixed(2),
            time: `${days} days ${hours} hours ${minutes} minutes`,
            deadline: `${Math.round(deadline / 1000)} seconds`,
            deadline_date: moment(deadline).format("DD-MM-YYYY h:mm:ss"),
        },
    });
};

module.exports = getOrderDetails;