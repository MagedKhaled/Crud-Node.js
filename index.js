
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()



app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))


const knexConfig = require('./db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV])

let id = 3
let savedData = [
    {'id':0,'Name':'N342','Cost':'377'},
    {'id':1,'Name':'M54','Cost':'342'},
    {'id':2,'Name':'O433','Cost':'124'},
]






app.get('/',(req,res) => {
    console.log('get')

    knex('products')
    .select({
        id:'id',
        name:'name',
        cost:'cost',
    })
    .then((products) => {
        return res.json(products)
    })
    .catch((err) => {
        console.log(err)
        return res.json({success:false, massage: 'An Error occurred'})
    })
})



app.delete('/:id/',(req,res)=>{
    knex('products')
    .where('id', req.params.id)
    .del()
    .then(() => {
        knex('products')
        .select({
            id:'id',
            name:'name',
            cost:'cost'
        })
        .then((products) => {
            console.log(products)
            return res.json(products)
        })
        
    })
    .catch((err) => {
        console.log(err)
        return res.json({success:false, massage: 'An Error occurred'})
    })

})

app.put('/',(req,res)=>{
    const productID = req.body.id

    const name = req.body.name ? req.body.name : '';
    const cost = req.body.cost ? req.body.cost : '';

    if (!name) {
        return res.json({success: false, message: 'Name is required'})

    }


    knex('products')
    .where('id','=',productID)
    .update({
        name: name,
        cost: cost
    })
    .then(() => {
        knex('products')
        .select({
            id:'id',
            name:'name',
            cost:'cost'
        })
        .then((products) => {
            console.log(products)
            return res.json(products)
        })
        
    })
    .catch((err) => {
        console.log(err)
        return res.json({success:false, massage: 'An Error occurred'})
    })
    
})

app.post('/',(req,res) => {
    const name = req.body.name ? req.body.name : '';
    const cost = req.body.cost ? req.body.cost : '';

    if (!name) {
        return res.json({success: false, message: 'Name is required'})

    }


    knex('products')
    .insert({name,cost})
    .then((id) => {
        knex('products')
        .select({
            id:'id',
            name:'name',
            cost:'cost'
        })
        .then((products) => {
            console.log(products)
            return res.json(products)
        })
        
    })
    .catch((err) => {
        console.log(err)
        return res.json({success:false, massage: 'An Error occurred'})
    })


})


app.listen(8000,() => {
    console.log('listening')
})


// const getData = (table = 'users',id = null) => {
//     let data = null
//     if(id){
//         data = knex(table)
//         .select({
//             id:'id',
//             name:'name',
//             email:'email'
            
//         })
//         .where({
//             id
//         })
//         .then((data) => {
//             return (data[0])
//         })
//         .catch((err) => {
//             console.error(err);
//             return ({success:false, message: 'An error occurred'})
    
//         })
        
//     }
//     else{
        
//         data = knex(table)
//         .select({
//             id:'id',
//             name:'name',
//             email:'email'
            
//         })
//         .then((data) => {

//             return data
//         })
//         .catch((err) => {
//             console.error(err);
//             return ({success:false, message: 'An error occurred'})
    
//         })
//     }
//     return data
// }


app.get('/users', (req,res) => {
    // let data = getData()
    // console.log(data)
    // return res.json(data)
    knex('users')
    .select({
        user_id:'id',
        name:'name',
        email: 'email'
    })
    .then((users) => {
        return res.json(users);
    })
    .catch((err) => {
        console.error(err);
        return res.json({success:false, massage: 'An Error occurred'})
    })
})

app.post('/users/',(req,res) => {
    console.log(req.body)
    const name = req.body.name ? req.body.name : '';
    const email = req.body.email ? req.body.email : '';

    if (!name) {
        return res.json({success: false, message: 'Name is required'})

    }

    knex('users')
    .insert({name, email})
    .then((id) => {
        knex('users')
        .select({
            user_id: 'id',
            name: 'name'
        })
        .where({id})
        .then((user)=> {
            return res.json(user[0]);
        })
    })
    .catch((err) => {
        console.error(err);
        return res.json({success:false, message: 'An error occurred'})
    })
})