
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()



app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))


// const knexConfig = require('./db/knexfile');
// //initialize knex
// const knex = require('knex')(knexConfig[process.env.NODE_ENV])

let id = 3
let savedData = [
    {'id':0,'Name':'N342','Cost':'377'},
    {'id':1,'Name':'M54','Cost':'342'},
    {'id':2,'Name':'O433','Cost':'124'},
]






app.get('/',(req,res) => {
    console.log('get')
    return res.send(savedData);
})

app.delete('/:id/',(req,res)=>{
    savedData = savedData.filter((product) => product.id != req.params.id)
    return res.send(savedData)
})

app.put('/',(req,res)=>{
    let index = savedData.findIndex(x => x.id === req.body.id)
    savedData[index].Name = req.body.name
    savedData[index].Cost = req.body.cost
    return res.send(savedData)
})

app.post('/',(req,res) => {
    savedData.push({id:id,Name:req.body.name,Cost:req.body.cost})
    id++

    return res.send(savedData);
})


app.listen(8000,() => {
    console.log('listening')
})