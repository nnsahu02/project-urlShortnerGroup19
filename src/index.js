const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/routes')

const app = express();

app.use(express.json());

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://nnsahu2022:Sahurk012@mycluster.ne522qz.mongodb.net/group19Database", {
    useNewUrlParser: true
})
    .then(() => (console.log("mongoDb is connected.")))
    .catch(err => console.log(err))

app.use('/', router)    

app.listen((process.env.PORT || 3000), function () {
    console.log("express is running on port 3000.")
})    