const inputData = require('./inputData');

const { price, minPrice, symbolsPerHour, allowedMimetype, otherMultiplier} = inputData;

const calcPrice = (options) => {
    const { lang, mimetype, count } = options;
    const basePrice = allowedMimetype.includes(mimetype)
        ? count * price[lang]
        : count * price[lang] * otherMultiplier;

    const finalPrice =
        basePrice < minPrice[lang] ? minPrice[lang] : basePrice;
    return finalPrice;
};

const calcTime = (options) => { 
    const { lang, mimetype, count } = options;
    
    const baseTime = allowedMimetype.includes(mimetype)
        ? count / symbolsPerHour[lang] + 30
        : (count / symbolsPerHour[lang] + 30) * otherMultiplier;
    
    const finalTime =
        baseTime < time.min ? time.min : finalTime;
    return finalTime;
}