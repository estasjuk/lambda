const { readFileSync } = require('fs');

//transform input data:
const arrayOfIpLocations = readFileSync('C:/Users/Stasyuk.Olena/Desktop/lambda/geoPosition/ipLocations.CSV', 'utf8').trim().split("\r\n")
const formattedArrayOfIpLocations = arrayOfIpLocations.map(item => item.split(";"));
const arrayOfObjects = formattedArrayOfIpLocations.map(item => {
    return {
        firstIp: Number(item[0]),
        lastIp: Number(item[1]),
        code: item[2],
        country: item[3],
    }
    }
);

//transform IP-adress:
const formatIp = ip => {
  const parts = ip.split(".");
  const res = parts.reduce((acc, part, index) => {
    return acc + Number(part) * Math.pow(256, 3 - index) //converts IP-address to decimal number
  }, 0)
  return res;
};

const searchIp = ip => {
  return arrayOfObjects.find(item => item.firstIp <= ip && item.lastIp >= ip)
};

module.exports = {
    formatIp,
    searchIp,
}

// Для перевода из нормальной формы в десятичное число необходимо следовать алгоритму:
// 1. Число из первого октета (самого левого) нужно умножить на 16777216 (256^3).
// 2. Число из второго октета нужно умножить на 65536 (256^2).
// 3. Число из третьего октета нужно умножить на 256.
// 4. Нужно сложить все полученные числа, а также четвёртый октет (формально четвёртый октет нужно умножить на 256^0, то есть на единицу).