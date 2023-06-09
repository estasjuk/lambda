const axios = require("axios");

const endpoints = [
"https://jsonbase.com/lambdajson_type1/793",
"https://jsonbase.com/lambdajson_type1/955",
"https://jsonbase.com/lambdajson_type1/231",
"https://jsonbase.com/lambdajson_type1/931",
"https://jsonbase.com/lambdajson_type1/93",
"https://jsonbase.com/lambdajson_type2/342",
"https://jsonbase.com/lambdajson_type2/770",
"https://jsonbase.com/lambdajson_type2/491",
"https://jsonbase.com/lambdajson_type2/281",
"https://jsonbase.com/lambdajson_type2/718",
"https://jsonbase.com/lambdajson_type3/310",
"https://jsonbase.com/lambdajson_type3/806",
"https://jsonbase.com/lambdajson_type3/469",
"https://jsonbase.com/lambdajson_type3/258",
"https://jsonbase.com/lambdajson_type3/516",
"https://jsonbase.com/lambdajson_type4/79",
"https://jsonbase.com/lambdajson_type4/706",
"https://jsonbase.com/lambdajson_type4/521",
"https://jsonbase.com/lambdajson_type4/350",
"https://jsonbase.com/lambdajson_type4/64"
];
let values = [];

const handleEndpoints = async (endpoints) => {
    for (let i = 0; i < endpoints.length; i += 1) {
        const instance = axios.create({
            baseURL: endpoints[i],
        });
        const { data } = await instance.get();
        getFiniteValue(data);
        console.log(`${endpoints[i]}: isDone: ${values[i]}`)
    }
    console.log("True values: ", values.filter(item => item === true).length);
    console.log("False values: ", values.filter(item => item === false).length);
};

const getFiniteValue = (obj) => {
        for(let key in obj) {
            if (typeof obj[key] === 'object') {
                getFiniteValue(obj[key]);
            } else {  
                if (key === 'isDone') {
                    values.push(obj[key]);
                    return values;
                }
            } 
    }
};

handleEndpoints(endpoints);