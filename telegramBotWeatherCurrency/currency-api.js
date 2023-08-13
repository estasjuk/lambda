// const axios = require('axios');

// const instancePrivat = axios.create({
//     baseURL: 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5',
// });

// const instanceMono = axios.create({
//     baseURL: 'https://api.monobank.ua/bank/currency',
// });

// const getPrivatExchange = async () => {
//     const response = await instancePrivat.get();
//     return response.data;
// };

// const getMonoExchange = async () => {
//     const response = await instanceMono.get();
//     return response.data;
// };

// module.exports = {
//     getPrivatExchange,
//     getMonoExchange,
// };
function oddEvenNumber(num) {
    const data = num.toString();
    const arr = data.split("");
    let odd = 0;
    let even = 0;
    for (el of arr) {
        if (Number(el) % 2 === 0) {
            even++
        } else odd++
    }
     return {odd: 0, even: 0}
 }
console.log(oddEvenNumber(112233));