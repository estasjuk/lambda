const moment = require('moment');
const { calcPrice, calcWorkTime, calcDeadline } = require('./algorithm');

const getOrderDetails = async (req, res) => {
    const { language, mimetype, count } = req.query;

    const price = await calcPrice(language, mimetype, count);
    const workTime = await calcWorkTime(language, mimetype, count);
    const rawDeadline = await calcDeadline(workTime);
    const deadline = new Date(rawDeadline);
    //console.log(deadline.getTime());
    
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
            time: `${days} (дні): ${hours} (години): ${minutes} (хвилини)`,
            deadline: deadline.getTime(),
            deadline_date: moment(deadline).format("DD-MM-YYYY HH:mm:ss"),
            //deadline_date: format(deadline, "DD-MM-YYYY HH:mm:ss"),
        },
    });
};

module.exports = getOrderDetails;