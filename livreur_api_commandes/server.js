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
    origin: ['http://localhost:5173', 'http://localhost:5174']
}))



/* Routes */

const commandes = require("./routes/commandes")


app.use('/commandes', commandes)


const port = 5502;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});