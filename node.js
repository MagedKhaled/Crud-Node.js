
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()



app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))

let savedData = [
    {'id':0,'Name':'N342','Cost':'377'},
    {'id':1,'Name':'M54','Cost':'342'},
    {'id':2,'Name':'O433','Cost':'124'},
]






app.get('/',(req,res) => {
    console.log(savedData)
    return res.send(savedData);
})

app.delete('/:id/',(req,res)=>{
    console.log(req.params.id)
    console.log(savedData)
    // savedData.find(x => x.id == req.params.id)
    savedData = savedData.filter((product) => product.id != req.params.id)
    return res.send(savedData)
})

app.put('/',(req,res)=>{
    console.log('put')
    console.log(req.body)
    let index = savedData.findIndex(x => x.id === req.body.id)
    console.log(savedData)
    console.log(index)
    savedData[index].Name = req.body.name
    savedData[index].Cost = req.body.cost
    console.log(savedData)
    return res.send(savedData)
})

app.post('/',(req,res) => {
    console.log('post')
    console.log(req.body)
    console.log(savedData)
    savedData.push({id:savedData.length,Name:req.body.name,Cost:req.body.cost})

    return res.send(savedData);
})


app.listen(8000,() => {
    console.log('listening')
})