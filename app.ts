import express from "express";
import dotenv from 'dotenv';
import router from "./src/routes/routes";

dotenv.config();

const app = express();

// For parsing the json body in POST request
app.use(express.json());

// For serving static files for swagger docs
app.use(express.static("public"));


app.use('/', router);

const PORT = process.env.port || 3000;


app.listen(PORT, () => {

    console.log('App Listening on ' + PORT);
});