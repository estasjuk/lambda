const inputData = require('./inputData');
const { price, time, minPrice, symbolsPerHour, allowedMimetype, otherMultiplier, workDaysWithoutFriday} = inputData;

const calcPrice = options => {
    const { lang, mimetype, count } = options;
    const basePrice = allowedMimetype.includes(mimetype)
        ? count * price[lang]
        : count * price[lang] * otherMultiplier;
    const finalPrice =
        basePrice < minPrice[lang] ? minPrice[lang] : basePrice;
    return finalPrice;
};

const calcWorkTime = options => {
    const { lang, mimetype, count } = options;
    const baseTime = allowedMimetype.includes(mimetype)
        ? count*60 / symbolsPerHour[lang] + 30
        : (count*60 / symbolsPerHour[lang] + 30) * otherMultiplier;
    
    const finalWorkTime =
        Math.round(baseTime < time.min ? time.min : baseTime) * 60 * 1000; //in miliseconds
    
    return finalWorkTime;
};
// calcWorkTime({"lang": "en",
// 	"mimetype": "doc",
// 	"count": 10000})

const calcDeadline = workDuration => { // get workduration in miliseconds
    const start = new Date();
    const startDay = start.getDay();
    const currentHours = start.getHours();
    const workTime = 9 * 60 * 60 * 1000; //miliseconds
    let deadline = 0;
    const overnight = 54000000;
    const restDay = 24 * 60 * 60 * 1000;
    const workDaysCount = Math.round(workDuration / workTime);
    const workWeeksCount = Math.round(workDaysCount / 5);

    if (startDay === 6) {
        start.setDate(start.getDate() + 2);
        start.setHours(10, 0, 0);
    } else if (startDay === 0 || workDaysWithoutFriday.includes(startDay) && currentHours >= 19) {
        start.setDate(start.getDate() + 1);
        start.setHours(10, 0, 0);
    } else if (startDay === 5 && currentHours >= 19) {
        start.setDate(start.getDate() + 3);
        start.setHours(10, 0, 0);
    } else if (workDaysWithoutFriday.includes(startDay) && currentHours < 10) {
        start.setHours(10, 0, 0);
    };

    deadline = new Date(start.getTime() + workDuration + overnight * workDaysCount + restDay * workWeeksCount);

    if (deadline.getHours() >= 19 || deadline.getHours() < 10) {
        deadline += overnight;
    };

    if (deadline.getDay() === 6) {
        deadline.setDate(deadline.getDate() + 2);
    } else if (deadline.getDay() === 0) {
        deadline.setDate(deadline.getDate() + 1);
    };
    return deadline;
};

module.exports = {
    calcPrice,
    calcWorkTime,
    calcDeadline,
}