const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();



/* Middleware */

//app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['*']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/* Routes */

const routes = require("./routes/connection")

app.use('/user', routes)

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});