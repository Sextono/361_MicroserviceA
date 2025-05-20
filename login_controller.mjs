import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as loginStuff from './login_model.mjs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/login', asyncHandler(async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const exists = await loginStuff.login(username, password);
    if(exists){
        const token = await loginStuff.token(12);
        res.status(200);
        res.json(token);
    }
    else{
        res.status(401);
        res.json({"Error": "Invalid username or password"});
    }
}))

app.post('/validate', asyncHandler(async(req,res) => {
    const token = req.body.token;
    if (loginStuff.activeTokens.includes(token)){
        res.status(200);
        res.send();
    }
    else{
        res.status(400);
        res.json("Invalid");
    }
    
}))

app.post('/create', asyncHandler(async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(await loginStuff.createAccount(username, password)){
        res.status(201);
        res.send();
    }
    else{
        res.status(400);
        res.json({"Error": "Account could not be created"});
    }
}))

app.post('/logout', asyncHandler(async(req, res) => {
    const token = req.body.token;
    if(loginStuff.activeTokens.includes(token)){
        const index = loginStuff.activeTokens.indexOf(token);
        loginStuff.activeTokens.splice(index, 1);
        res.status(200);
        res.send();
    }
    else {
        res.status(400);
        res.send();
    }
}))