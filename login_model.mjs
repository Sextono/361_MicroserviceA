import { writeFile, readFile } from 'fs/promises';

let activeTokens = [];

async function login(username, password){
    const loginCombo = username + ' ' + password;
    try {
        const fileContents = await readFile('loginInfo.json', 'utf8');
        const data = JSON.parse(fileContents);
        if(data.includes(loginCombo)){
            console.log('Login successful');
            return true;
        }
        else {
            console.log("Login failed");
            return false;
        }
    } catch (err) {
        console.error('Error reading file:', err);
        return false;
    }
}

async function containsUsername(username){
    try {
        let fileContents = await readFile('loginInfo.json', 'utf8');
        const data = fileContents.trim() === '' ? [] : JSON.parse(fileContents);
        if(data.some(entry => entry.startsWith(username + ' '))){
            return true;
        }
        else {
            return false;
        }
    } catch (err) {
        console.error('Error reading file:', err);
        return false;
    }
}

async function createAccount(username, password){
    const loginCombo = username + ' ' + password;
    if(!(await containsUsername(username))){
        try {
            const fileContents = await readFile('loginInfo.json', 'utf8');
            const data = fileContents.trim() === '' ? [] : JSON.parse(fileContents);
            data.push(loginCombo)
            await writeFile('loginInfo.json', JSON.stringify(data));
            console.log('Data written to loginInfo.json');
        } catch (err) {
            if (err.code === 'ENOENT') { //file doesn't exist error
                await writeFile('loginInfo.json', JSON.stringify([loginCombo]), 'utf8');
                console.log('File created, account created');
                } 
            else {
                console.error('Error appending file:', err);
                return false;
            }
            return false;
        }
        return true;
    }
    else {
        console.log("Account already exists");
        return false;
    }
}

async function token(length){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    activeTokens.push(result);
    return result;
};

export {login, createAccount, token, activeTokens}