const User = require('../models/user');


exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(200).send('Usuario registrado');
  } catch (error) {
    res.status(500).send('Error al registrar al usuario');
  }
};

exports.authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(500).send('Usuario no registrado');
      return;
    }
    const isCorrect = await user.isCorrectPassword(password);
    if (isCorrect) {
      // Redirigir al usuario a la página list.ejs si la autenticación es exitosa
      res.redirect('/list');
    } else {
      res.status(500).send('Contraseña incorrecta');
    }
  } catch (error) {
    res.status(500).send('Error al autenticar al usuario');
  }
};



exports.showSignup = (req, res) => {
  res.render('signup');
};
exports.showLogin = (req, res) => {
  res.render('index');
};
exports.showList = (req, res) => {
  res.render('list');
};

