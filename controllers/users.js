const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/usuario"); //mayuscula para crear instancias del modelo

//GET
const userGet = async (req = request, res = response) => {
  //const { q, nombre = "no name", apikey, page = 1, limit } = req.query;

  const query = { estado: true };
  const { limite = 5, desde = 0 } = req.query;

  //Promesas
  // const usuarios = await User.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await User.countDocuments(query);
  //------------------------------

  //Coleccion de promesas, que las ejecuta simultaneamente, menos tiempo de espera
  const [total, usuarios] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

//POST
const userPost = async (req = request, res = response) => {
  //const { google, ...resto } = req.body; // para sacar un argumento y el resto por aparte
  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol }); //Solo tomara las entidades definidas en el modelo

  //verificar si correo existe

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //guardar en bd

  await user.save(); //guardando el registro
  res.json({
    user,
  });
};
const userPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO VALIDAR CONTRA BASE DE DATOS

  if (password) {
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await User.findByIdAndUpdate(id, resto);
  res.json(usuario);
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  //borrado fisico, NO RECOMENDADO
  // const usuario = await User.findByIdAndDelete(id);

  //CAMBIO DE ESTADO ACTIVO A FALSE
  const usuario = await User.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
