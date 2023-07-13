import express from 'express'
import bodyParser from 'body-parser'
import { getDate } from './date.js';

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const items = []
const workItems = [] 

app.get('/', (req, res) => {
    let day = getDate();
    res.render("list", {listTitle : day, newItem : items})
});

app.post('/', (req, res) => {
    let item = req.body.newItem
    if(req.body.list === 'Work') {
        workItems.push(item)
        res.redirect("/work")
    }
    else {
        items.push(item)
        res.redirect("/")
    }
})

app.get('/work', (req, res) => {
    res.render("list", {listTitle : "Work List", newItem : workItems})
})

app.listen(3000, ()=>{
    console.log('in');
})