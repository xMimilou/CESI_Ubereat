const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
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

const routes = require("./routes/connection")

app.use('/api', routes)

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});