const express = require('express'); 
const bodyparser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
// ya I now this is old version but still

const pg = knex({
        client: 'pg',
        connection: {
        connectionString :process.env.DATABASE_URL,
        ssl:true
    }
});

const  app = express();


app.use(cors())
app.use(bodyparser.json())

app.get('/' , (req , res) => 
{
    pg('mytable').orderBy('id', 'desc').then(data => { res.send(data) })
    // pg.select('*').from('mytable').then(data=>{res.send(data)}) normal data but for desc former is better
    res.send("its working")
})

app.post('/add' , (req,res) =>
{
    const {name ,email ,views} = req.body //getting data from frontend
    pg('mytable').insert({
        name:name,
        email:email,
        views:views
    }).catch(err => {res.status(400).json('unable to submit')})
    
})
app.listen(process.env.PORT || '3000', () => { console.log("Done!", process.env.PORT)})

