import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
// import { getDate } from './date.js';

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

// const items = []
// const workItems = [] 
const uri = "mongodb+srv://emmy:amy1952545@fruitdb.yt62hgc.mongodb.net/todolistDB?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

// Function to insert a new item into the database
// async function connectAndInsert() {
//   try {
//     // Create a new item and save it to the database
//     // const newItem = await Item.create({ name: "Cook" });
//     const allItems = await Item.find()
//     // console.log("New item created:", newItem);
//     console.log("allItems: " + allItems);
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// Call the function to insert the new item
// connectAndInsert();

    // const personSchema = new mongoose.Schema({
    //   name: String,
    //   age: Number,
    // });

    // const Person = mongoose.model("person", personSchema);

    // const newPerson = new Person({
    //   name: "Jinny",
    //   age: 22,
    // });

    // const savedPerson = await newPerson.save();

    // console.log("Person saved:", savedPerson);
    // console.log("Person ID:", savedPerson._id);


app.get('/', async (req, res) => {
    // let day = getDate();
    const allItems = await Item.find()
    res.render("list", {listTitle : "today", newItem : allItems})
});

app.post('/', async (req, res) => {
    let item = req.body.newItem
    if(req.body.list === 'Work') {
        workItems.push(item)
        res.redirect("/work")
    }
    else {
        await Item.create({ name: item })
        // items.push(item)
        res.redirect("/")
    }
})

app.post('/delete', async (req, res) => {
    // console.log(req.body.checkbox);
    const id = req.body.checkbox;
    await Item.findByIdAndRemove(id)
    res.redirect('/')
})

app.get('/work', (req, res) => {
    res.render("list", {listTitle : "Work List", newItem : workItems})
})

app.listen(3000, ()=>{
    console.log('in');
})