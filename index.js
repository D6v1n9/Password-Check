
import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended:true}));

function passwordCheck(req,res,next) {
    // console.log(req.body);  just to check the field of object 
    const password = req.body["password"];
    if(password === "ILoveProgramming") {
        userIsAuthorised = true ;
    }
    next();
}

app.use(passwordCheck);

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/public/index.html");
})

app.post("/check", (req,res) => {
    if(userIsAuthorised === true) {
        res.sendFile(__dirname+"/public/secret.html");
    }
    else {
        res.redirect("/");
        // res.sendFile(__dirname+"/public/index.html");
    }
})

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})
