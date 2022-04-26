const express = require("express");
const cors = require("cors");


const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions))

// parse request dalam bentuk JSON
app.use(express.json())

// parse request untuk type content application/x-www-form-urlencoded
app.use(express.urlencoded({ extended : true}));

// simple route

app.get('/',(req, res)=>{
    res.json({message : 'Hello World!'})
})

require("./app/routes/tutorial.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});