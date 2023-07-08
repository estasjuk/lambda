const inputData = {
    price: {
        ru: 0.05,
        ua: 0.05,
        en: 0.12,
    },
    minPrice: {
        ru: 50,
        ua: 50,
        en: 120,
    },
    symbolsPerHour: {
        ru: 1333,
        ua: 1333,
        en: 333,
    },
    time: {
        min: 60,
        startTimeInMinutes: 600,
        endTimeInMinutes: 1140,
        workingTimeInMinutes: 540,
    },
    allowedMimetype: ['none', '.doc', '.docx', '.rtf'],
    otherMultiplier: 1.2,
    workDaysWithoutFriday: [1,2,3,4],
};

module.exports = inputData;