let router = require('express').Router();

let mongoose = require('mongoose')

let {Schema} = mongoose;

let env = require('dotenv').config();

let url =`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.l162asa.mongodb.net/myDatabase`;
async function main(){
await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connected to MongoDB')
})
}

main().catch(err => console.log(err));

const mySchema = new Schema({
    firstname: String,
    lastname: String,
    age : Number
})

const persons = mongoose.model('Person', mySchema);

router.post('/',async (req, res) => {
    let person = new persons(req.body);
     let result = await person.save().then(()=>{ res.status(200).send("success");}).catch(err => console.log(err));
})

router.get('/', async(req, res) => {
  let person = await persons.find({})
    res.status(200).json(person)
});

router.delete('/', async(req, res) => {
    let person = await persons.deleteOne({_id: req.body._id}).then(()=>{
        res.status(200).send("success");
    }).catch(err => res.status.send(err))
})
router.put('/', async(req, res) => {
    let person = await persons.updateOne({_id: req.body._id},{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age : req.body.age
    }).then(()=>{
        res.status(200).send("success");
    }).catch(err => res.status.send(err))
})


module.exports = router;