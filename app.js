const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./todoRoutes');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/tareasDB");

const itemSchema={
    name:String,
};

const Item=mongoose.model("Item",itemSchema);
const item1=new Item({name:"Bienvenido a tu lista de tareas"});
const item2=new Item({name:"realiza una tarea nueva"});
const item3=new Item({name:"completa una tarea"});

const d=[item1,item2,item3];

var i = "";
app.get('/', (req, res) => {
    Item.find({})
        .then(f => {
            if (f.length === 0) {
                Item.insertMany(d)
                    .then(() => {
                        console.log("Se insertaron los datos correctamente");
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send("Error al insertar datos");
                    });
            } else {
                res.render('list', { newListItem: f });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error al buscar datos");
        });
});

app.post('/', function (req, res) {
    i=req.body.n
    const item = new Item({ name: i });
    item.save();
    res.redirect('/');
});

app.post('/delete', function (req, res) {
    Item.findByIdAndDelete(req.body.checkbox)
        .exec()
        .then(result => {
            console.log("Se eliminó correctamente");
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error al eliminar el item");
        });
});



app.use('/todos', todoRoutes);

app.listen(3000, function (){
    console.log('Server is running on port 3000')
});