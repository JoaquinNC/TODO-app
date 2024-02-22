const Item = require('./todoModel');

exports.getItems = (req, res) => {
  Item.find({})
    .then(items => {
        if (items.length === 0) {
            // Insertar datos si no hay ninguno
            const defaultItems = [
                { name: "Esta es una tarea de ejemplo" },
            ];
            return Item.insertMany(defaultItems);
        } else {
            return items;
        }
    })
    .then(items => {
        res.render('list', { newListItem: items });
    })
    .catch(err => {
        console.error("Error:", err);
        res.status(500).send("Error al buscar datos");
    });
};

exports.createItem = (req, res) => {
  const newItemName = req.body.n;

  const newItem = new Item({ name: newItemName });
  newItem.save()
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.error("Error:", err);
        res.status(500).send("Error al guardar el elemento");
    });
};

exports.deleteItem = (req, res) => {
  const itemId = req.body.checkbox;
  Item.findByIdAndDelete(itemId)
    .then(() => {
      console.log("Elemento eliminado correctamente");
      res.redirect('/');
    })
    .catch(err => {
      console.error("Error:", err);
      res.status(500).send("Error al eliminar el elemento");
    });
};
