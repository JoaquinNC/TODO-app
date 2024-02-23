const Item = require('../models/todoModel');


//listar
exports.getItems = (req, res) => {
  Item.find({}).sort({ completed: 1 })
    .then(items => {
      return items;
    })
    .then(items => {
        res.render('list', { newListItem: items });
    })
    .catch(err => {
        console.error("Error:", err);
        res.status(500).send("Error al buscar datos");
    });
};

//crear
exports.createItem = (req, res) => {
  const newItemName = req.body.n;

  const newItem = new Item({ name: newItemName });
  newItem.save()
    .then(() => {
        res.redirect('/list');
    })
    .catch(err => {
        console.error("Error:", err);
        res.status(500).send("Error al guardar el elemento");
    });
};

//eliminar
exports.deleteItem = (req, res) => {
  const itemId = req.body.checkbox;
  Item.findByIdAndDelete(itemId)
    .then(() => {
      console.log("Elemento eliminado correctamente");
      res.redirect('/list');
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).send("Error al eliminar el elemento");
    });
};

//completar
exports.completeItem = (req, res) => {
  const itemId = req.body.checkbox;
  Item.findById(itemId)
    .then(item => {
      item.completed = !item.completed;
      return item.save();
    })
    .then(() => {
      console.log("Estado de la tarea cambiado correctamente");
      res.redirect('/list');
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).send("Error al cambiar el estado de la tarea");
    });
};