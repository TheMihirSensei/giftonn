const express = require("express")
const mongoose = require("mongoose")
const v1Route = require("./routes/v1")
const app = express()
require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


mongoose.connect(process.env.MONGO_STRING, (err, result) => {

    if (err) {
        console.log("Mongodb Connection Error", err.message)
    } else {
        app.listen(process.env.PORT || 5800, () => { console.log("giftonn server running") })

    }

})


app.get("/", (req, res) => { res.status(200).json({ message: "initial giftonn routes" }) })
app.use('/v1', v1Route)