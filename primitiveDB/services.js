const path = require('path');
const fs = require('fs/promises');

const db = path.join(__dirname, 'users.txt');

const userList = async () => {
    try {
        const data = await fs.readFile(db, 'utf-8'); 
        return [...JSON.parse(data.toString())];
    }
    catch(error) {
        console.log(error.message);
    }
};

const addNewUser = async({name, age, gender}) => {
    try{
    const users = await userList();
    const newUser = {
            name,
            gender,
            age,
    };
        if (newUser.name !== '') {
            users.push(newUser);
            await fs.writeFile(db, JSON.stringify(users, null, 2));
        }
        else throw new Error();
    }
    catch (error) {
        console.error(error.message);
    }
};

const findUserByName = async (name) => {
    try {
        const users = await userList();
        const result = users.filter((user) => 
            user.name.toLowerCase().startsWith(name)
        );
        if (result.length) {
            console.log(result);
        }
        else console.log('User not found')
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = {
    userList,
    addNewUser,
    findUserByName,
}