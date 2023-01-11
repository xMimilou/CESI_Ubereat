const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('./models/dbConfig')
const app = express();




/* Middleware */


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))



/* Routes */

const routes = require("./routes/connection")
const commandes = require("./routes/commandes")

app.use('/commercial', routes)
app.use('/commandes', commandes)

const port = 3001;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});