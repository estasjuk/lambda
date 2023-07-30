const inputData = require('./inputData');
const { price, time, minPrice, symbolsPerHour, allowedMimetype, otherMultiplier, workDaysWithoutFriday} = inputData;

const calcPrice = (lang, mimetype, count) => {
    const basePrice = allowedMimetype.includes(mimetype)
        ? count * price[lang]
        : count * price[lang] * otherMultiplier;
    const finalPrice =
        basePrice < minPrice[lang] ? minPrice[lang] : basePrice;
    return finalPrice;
};

const calcWorkTime = (lang, mimetype, count) => {
    const baseTime = allowedMimetype.includes(mimetype)
        ? count*60 / symbolsPerHour[lang] + 30
        : (count*60 / symbolsPerHour[lang] + 30) * otherMultiplier;
    
    const finalWorkTime =
        Math.round(baseTime < time.min ? time.min : baseTime) * 60 * 1000; //in miliseconds
    return finalWorkTime;
};

const calcDeadline = workDuration => { // get workduration in miliseconds
    if(workDuration === undefined) {
        throw new Error('workDuration must be exist')
    };

    if(typeof workDuration !== 'number') {
        throw new Error('workDuration must be number')
    };

    if (!Number.isInteger(workDuration)) {
        throw new Error('workDuration must be integer')
    };

    const start = new Date();
    const startDay = start.getDay();
    const currentHours = start.getHours();
    const workTime = 9 * 60 * 60 * 1000; //miliseconds
    let deadline = 0;
    const overnight = 54000000; //miliseconds
    const restDay = 24 * 60 * 60 * 1000; //miliseconds
    const workDaysCount = Math.floor(workDuration / workTime);
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
    const deadlineDay = deadline.getDay();
    const deadlineDate = deadline.getDate();
    
    if (deadline.getHours() >= 19 || deadline.getHours() < 10) {
        deadline = deadline.getTime() + overnight;
    };

    if (deadlineDay === 6) {
        deadline.setDate(deadlineDate + 2);
    } else if (deadlineDay === 0) {
        deadline.setDate(deadlineDate + 1);
    };
    return deadline;
};

module.exports = {
    calcPrice,
    calcWorkTime,
    calcDeadline,
};
