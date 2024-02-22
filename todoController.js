const Todo = require('./todoModel');

exports.createTodo = async (req, res) => {
  try{
    const {title, completed} = req.body;
    const newTodo = new Todo({
      title,
      completed
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);

  } catch(error){
    console.error('Error al crear el TODO: ', error);
    res.status(500).json({message: 'Error al crear el TODO'});
  }
};
