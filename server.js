const express = require('express'); 
const bodyparser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
// ya I now this is old version but still

const pg = knex({
        client: 'pg',
        connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'psqlpass', 
        database: 'viewsdb'
    }
});

const  app = express();


app.use(cors())
app.use(bodyparser.json())

app.get('/' , (req , res) => 
{
    pg('mytable').orderBy('id', 'desc').then(data => { res.send(data) })
    // pg.select('*').from('mytable').then(data=>{res.send(data)}) normal data but for desc former is better
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
app.listen(process.env.Port || '3000', ()=>{console.log("Done!")})

