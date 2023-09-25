const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'rawData.json');
const vacations = JSON.parse(fs.readFileSync(dirPath, 'utf-8'));

let newUser = {};
const jsonWithoutJunkData = vacations.map(item => newUser = { 
    userId: item.user._id,
    username: item.user.name,
    vacationDates: [{
                    startDate: item.startDate,
                    endDate: item.endDate,
                }],
})

const formatUserVacations = (data) => {  //formats file with user duplicates to file without user duplicates and wit array of vacation data
    let formattedJson = [];
    for (item of data) {
        const index = formattedJson.findIndex(user => user.userId === item.userId);
        if (index > 0) {
            formattedJson[index].vacationDates.push(...item.vacationDates);
        }
        else {
            formattedJson.push(item);
        }
    }
    return formattedJson;
};
const finalJson = formatUserVacations(jsonWithoutJunkData);
const dirPath2 = path.join(__dirname, 'formattedData.json');
let finalJsonData = JSON.stringify(finalJson, null, 2);
fs.writeFileSync(dirPath2, finalJsonData)

formatUserVacations(jsonWithoutJunkData);