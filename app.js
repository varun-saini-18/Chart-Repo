const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

function jsonData() {
    const data=require('./record.json')
    return data;
}

app.get('/jsondata', (request, response) => {
    const result = jsonData();
    response.json({data : result})
})


app.listen(process.env.PORT, () => console.log('app is running' +process.env.PORT ));