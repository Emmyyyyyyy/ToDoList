const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const ejs = require("ejs")

const app = express()

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const uri = "mongodb+srv://username:password@fruitdb.yt62hgc.mongodb.net/wikiDB?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const articlesSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("article", articlesSchema)

app.route("/articles")
.get(async (req, res)=>{
    const article = await Article.find();
    res.send(article)
    console.log(article);
})
.post(async (req, res) =>{
    console.log(req.body.title);
    console.log(req.body.content);
    const title = req.body.title;
    const content = req.body.content;
    const newArticle = new Article({
        title: title,
        content: content
    })
    // await newArticle.save().then(res.send("Saved!"));
})
.delete(async (req, res) => {
    await Article.deleteMany().then(res.send("Done!"));
})

app.route("/articles/:articleTitle")
.get(async (req, res) => {
    await Article.findOne({
        title: req.params.articleTitle
    }).then(article => {
        res.send(article)
    }).catch(err => console.log(err))
})
.put(async (req ,res)=>{
    await Article.updateOne(
        {
            title: req.params.articleTitle
        },
        {
            title: req.body.title,
            content: req.body.content
        },
        {overWrite: true} 
    ).then(res.send("Updated!"))
})
.patch(async (req ,res)=>{
    await Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body},
    ).then(res.send("Updated!"))
})
.delete(async (req, res)=>{
    await Article.deleteOne({title :req.params.articleTitle}).then(res.send("Deleted!"))
})

app.listen(3000, ()=>{
    console.log('start');
})