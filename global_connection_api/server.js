const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://127.0.0.1:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('connected to the database')
})

const routes = require("./routes/routes")

const app = express();

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080']
}))

app.use(express.json())

app.use('/api', routes)

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});