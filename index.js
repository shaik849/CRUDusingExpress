let express = require('express');

let app = express();

let router = require('./routes/router');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())
app.use("",router)



app.listen(3000,() => console.log('3000'))