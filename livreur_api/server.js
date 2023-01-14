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

const commandes = require("./routes/commandes")
const commandesSuivies = require("./routes/commandesSuivies")

app.use('/commandes', commandes)
app.use('/commandesSuivies', commandesSuivies)

const port = 5502;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});