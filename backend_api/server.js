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
    origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083', '*', 'http://localhost:5173', 'http://localhost:5174']
}))



/* Routes */

const routes = require("./routes/auth")
const commandes = require("./routes/commandes")
const administration = require("./routes/admin")

app.use('/auth', routes)
app.use('/commandes', commandes)
app.use('/admin', administration)
// app.use('/', (req, res) => {
//     res.send('Hello World!')
// });
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});