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